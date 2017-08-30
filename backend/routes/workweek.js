var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var Workweek = require('../models/workweek');
var Semester = require('../models/semester');

// /workweek/user GET
router.get('/user', function(req, res, next) {
	Workweek.WorkweekShiftAssignment.find({ zebe: req.user.kerberos }, function(err, assignments) {
		if (err) return next(err);
		return res.json(assignments);
	});
});

// /workweek/user/tickets GET
router.get('/user/tickets', function(req, res, next) {
	if (req.user.isDeveloper()) {
		Workweek.WorkweekTicket.find({ zebe_taker: req.user.kerberos }, function(err, tickets) {
			if (err) return next(err);
			return res.json(tickets);
		});
	} else {
		res.sendStatus(403);
	}
});

// /workweek/tickets GET
router.get('/tickets', function(req, res, next) {
	if (req.user.isDeveloper()) {
		Workweek.WorkweekTicket.find({}, function(err, tickets) {
			if (err) return next(err);
			return res.json(tickets);
		});
	} else {
		res.sendStatus(403);
	}
});

// /workweek/shift GET
router.get('/shift', function(req, res, next) {
	Workweek.WorkweekShiftAssignment.find({ date: { $gte: moment().toDate() } }, function(err, shifts) {
		if (err) return next(err);
		shifts.sort( {date: 1}, function(err, sorted_shifts) { //sort shifts in ascending date order
			if (err) return next(err);
			cursor.nextObject(function(err, shift) { //grab first object to get first date
				if (err) return next(err);
				if (shift) {
					Workweek.WorkweekShiftAssignment.find({ date: shift.date }, function(err, next_shifts) {
						if(err) return next(err);
						return res.json(next_shifts);
					});
				} else { //no future shifts
					return res.json(sorted_shifts);
				}
			});
		});
	});
});

// /workweek/shift/create POST
router.post('/shift/create', function(req, res, next) {
	if(req.user.isWorkweekChair()){
		Workweek.WorkweekShiftAssignment.create(req.body, function(err) {
			if (err) return next(err);
			return res.json(arguments);
		});
	} else {
		res.sendStatus(403);
	}
});

// /workweek/shift/update/<string:id> PUT
router.put('/shift/update/:id', function(req, res, next) {
	if(req.user.isWorkweekChair()){
		Workweek.WorkweekShiftAssignment.findOneAndUpdate({ id: req.params.id }, req.body, function(err, new_shift) {
			if (err) return next(err);
			return res.json(new_shift);
		});
	} else {
		return res.sendStatus(403);
	}	
});

// /workweek/accounts GET
router.get('/accounts', function(req, res, next) {
	Semester.getCurrent(function(err, cur) {
		if (err) return next(err);
		Workweek.WorkweekAccounts.find({ semester: cur.name }, function(err, accounts) {
			if (err) return next(err);
			return res.json(accounts);
		});
	}
});

// /workweek/accounts POST
router.post('/accounts/create', function(req, res, next) {
	if(req.user.isWorkweekChair()){
		Workweek.WorkweekAccounts.create(req.body, function(err) {
			if (err) return next(err);
			return res.json(arguments);
		});
	} else {
		return res.sendStatus(403);
	}
});

// /workweek/accounts/update/<string:id> PUT
router.put('/accounts/update/:id', function(req, res, next) {
	if(req.user.isWorkweekChair()) {
		Workweek.WorkweekAccounts.findOneAndUpdate({ id: req.params.id }, req.body, function(err, new_account) {
			if (err) return next(err);
			return res.json(new_account);
		});
	} else {
		return res.sendStatus(403);
	}
});

// /workweek/incomplete GET
router.get('/incomplete', function(req, res, next) {
	Workweek.WorkweekShiftAssignment.find(
		{
			date: { $lte: moment().toDate() },
			completed: false
		},
		function(err, shifts) {
			if (err) return next(err);
			return res.json(shifts);
		}
	);
});

// /workweek/incomplete/tickets GET
router.get('/incomplete/tickets', function(req, res, next) {
	Workweek.WorkweekTicket.find({ completed: false }, function(err, tickets) {
		if (err) return next(err);
		return res.json(tickets);
	});
});