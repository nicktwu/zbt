import hmac
import hashlib
import base64
import json
import binascii

import datetime
from flask import request, abort
from secret import crypto_key
from models import Zebe


def token_required(handler):
    def wrapped_handler(*args, **kwargs):
        ip = str(request.remote_addr)
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            abort(401)

        parts = auth_header.split(" ")
        if len(parts) != 2 or parts[0] != "Bearer":
            abort(401)
        auth_token = parts[1]
        if not verify_token(auth_token, ip, crypto_key):
            abort(401)

        request.kerberos = get_kerberos(auth_token)
        zebe = Zebe.query.filter(Zebe.kerberos==request.kerberos).first()
        request.zebe = zebe
        return handler(*args, **kwargs)

    return wrapped_handler


def verify_token(auth_token, ip_addr, key):
    segments = auth_token.split(".")
    decoded = []

    for segment in segments:
        encoded = segment
        if isinstance(encoded, unicode):
            encoded = encoded.encode('ascii')
        rem = len(encoded) % 4
        if rem > 0:
            encoded += b'=' * (4 - rem)
        decoded.append(base64.urlsafe_b64decode(encoded))

    if len(segments) != 3:
        return False

    now = datetime.datetime.utcnow()
    payload = json.loads(decoded[1])
    if "ip" not in payload or payload.get("ip") != ip_addr:
        return False
    if "iat" not in payload or now < get_date(payload.get("iat")):
        return False
    if "exp" not in payload or now > get_date(payload.get("exp")):
        return False

    signature = hmac.new(key, segments[0]+"."+segments[1], digestmod=hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, binascii.hexlify(decoded[2])):
        return False

    return True


def get_date(datestring):
    return datetime.datetime.strptime(datestring, "%Y-%m-%d %H:%M:%S.%f")


def get_kerberos(auth_token):
    segments = auth_token.split(".")
    encoded = segments[1]
    if isinstance(encoded, unicode):
        encoded = encoded.encode('ascii')
    rem = len(encoded) % 4
    if rem > 0:
        encoded += b'=' * (4 - rem)
    decoded = base64.urlsafe_b64decode(encoded)
    payload = json.loads(decoded)
    return payload.get("kerberos")
