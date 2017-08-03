#!/usr/bin/python
import base64
import datetime
import hashlib
import hmac
import json
import os

from flask import Flask, abort, jsonify, request
from secret import crypto_key

app = Flask(__name__)

def get_kerberos():
    email = os.environ.get("SSL_CLIENT_S_DN_Email")
    kerberos = ""

    if email is not None:
        i = email.find("@")
        kerberos = email[:i]
    return kerberos


def encode(value):
    return base64.urlsafe_b64encode(value).replace(b'=', b'')


def force_bytes(value):
    if isinstance(value, unicode):
        return value.encode('utf-8')
    elif isinstance(value, str):
        return value
    else:
        raise TypeError('Expected a string value')


def generate_token(kerberos, ip_addr):

    payload = force_bytes(json.dumps({
        "kerberos": kerberos,
        "ip":str(ip_addr),
        "iat": str(datetime.datetime.utcnow()),
        "exp": str(datetime.datetime.utcnow() + datetime.timedelta(minutes=30)),
    }))
    header = {"alg": "HS256", "typ": "JWT"}
    json_header = force_bytes(json.dumps(header, separators=(',', ':')))

    encoded_header = encode(json_header)
    encoded_payload = encode(payload)

    signing_input = bytes(str(encoded_header) + "." + str(encoded_payload))

    signature = hmac.new(crypto_key, signing_input, hashlib.sha256).hexdigest()
    print signature

    token = bytes(str(signing_input) + "." + str(encode(signature)))
    return token

CORS_HEADER = {
    'Access-Control-Allow-Origin': '*',
}

@app.route('/')
def get_token():
    ip = request.remote_addr
    kerberos = get_kerberos()
    if len(kerberos) < 1:
        abort(401)
    token = generate_token(kerberos, ip)
    return jsonify({"token": token}), 200, CORS_HEADER


# For testing and development use only
if __name__ == '__main__':
    app.run(port=5555)