from flask import Blueprint, request, jsonify, abort
from models import WorkweekTicket
from database import db
from authentication import token_required

workweek_page = Blueprint('workweek_page', __name__)

ALL_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
}

CORS_HEADER = {
    'Access-Control-Allow-Origin': '*',
}


@token_required
@workweek_page.route('/')
def all_tickets():
    tickets = WorkweekTicket.query.all()
    return jsonify(
        {'tickets': [ticket.to_dict() for ticket in tickets], 'authorized': request.zebe.dev }), 200, CORS_HEADER


@token_required
@workweek_page.route('/take/<int:id>')
def take_ticket(id):
    if not request.zebe.dev:
        return jsonify({'authorized': False}), 200, CORS_HEADER
    else:
        ticket = WorkweekTicket.query.get_or_404(id)
        if ticket.taker is not None:
            ticket.taker = request.kerberos
        db.session.commit()
    tickets = WorkweekTicket.query.all()
    return jsonify(
        {'tickets': [ticket.to_dict() for ticket in tickets], 'authorized': request.zebe.dev}), 200, CORS_HEADER


@token_required
@workweek_page.route('/admin')
def admin_info():
    if not request.zebe.workweek:
        return jsonify({'authorized': False}), 200, CORS_HEADER
    tickets = WorkweekTicket.query.all()
    return jsonify({'authorized': True, 'tickets': [ticket.to_dict() for ticket in tickets]}), 200, CORS_HEADER


@token_required
@workweek_page.route('/admin/ticket/create', methods=["POST", "OPTIONS"])
def create_ticket():
    if not request.zebe.workweek:
        abort(401)
    if request.method == "OPTIONS":
        return jsonify({'status': 'ok'}), 200, ALL_HEADERS
    if not request.json or 'description' not in request.json or 'hours' not in request.json:
        abort(400)
    ticket = WorkweekTicket(request.json['description'], request.json['hours'], None, False)
    db.session.add(ticket)
    db.session.commit()
    return jsonify({'status': 'ok'}), 201, ALL_HEADERS


@token_required
@workweek_page.route('/admin/ticket/edit', methods=["POST", "OPTIONS"])
def edit_ticket():
    if not request.zebe.workweek:
        abort(401)
    if request.method == "OPTIONS":
        return jsonify({'status': 'ok'}), 200, ALL_HEADERS
    if not request.json or 'id' not in request.json or 'description' not in request.json or 'hours' not in request.json:
        abort(400)
    ticket = WorkweekTicket.query.get_or_404(request.json['id'])
    ticket.description = request.json['description']
    ticket.completed = request.json.get('completed', False)
    ticket.hours = request.json['hours']
    db.session.commit()
    return jsonify({'status': 'ok'}), 201, ALL_HEADERS
