#!/usr/bin/python
import datetime
import os
import json
import jwt

from flask import Flask, abort, jsonify, request, make_response, redirect
from secret import crypto_key

app = Flask(__name__)

def get_kerberos():
    email = os.environ.get("SSL_CLIENT_S_DN_Email")
    kerberos = ""

    if email is not None:
        i = email.find("@")
        kerberos = email[:i]
    return kerberos

def generate_token(kerberos, ip_addr):
    payload = {
        "kerberos": kerberos,
        "ip": str(ip_addr),
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
    }
    return jwt.encode(payload, crypto_key, algorithm='HS256')


CORS_HEADER = {
    'Access-Control-Allow-Origin': '*',
}

@app.route('/')
def get_token():
    ip = request.remote_addr
    kerberos = get_kerberos()
    if len(kerberos) < 1:
        abort(401)
    token = generate_token(kerberos, ip).decode('utf-8')
    url = "https://zbt.scripts.mit.edu/todo"
    resp = make_response(redirect(url, 302))
    resp.headers['Location'] = url
    resp.set_cookie("zbtodo-token",value=token)
    return resp


# For testing and development use only
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5555)
