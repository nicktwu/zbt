from flask import Blueprint, request, jsonify, abort
from models import MidnightTrade, Midnight
from datetime import date as python_date
from authentication import token_required

trading_page = Blueprint('trading_page', __name__)

ALL_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
}

CORS_HEADER = {
    'Access-Control-Allow-Origin': '*',
}


@token_required
@trading_page.route('/')
def market_home():
    outstanding = MidnightTrade.query.join(Midnight) \
        .filter(MidnightTrade.completed.is_(False)).filter(Midnight.date >= python_date.today()).all()
    return jsonify({'trades': [trade.to_dict() for trade in outstanding]}), 200, CORS_HEADER
