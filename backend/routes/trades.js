var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var Trades = require('../models/trades');
var Midnights = require('../models/midnights');
var House = require('../models/house');

// /trades/user/midnight GET
router.get('/user/midnight', function(req, res, next) {
	Trades.MidnightTrade.find( { kerberos: req.user.kerberos }, function(err, trades) {
		if (err) return next(err);
		return res.json(trades);
	});
});

// /trades/user/workday_for_midnight GET
router.get('/user/workday_for_midnight', function(req, res, next) {
	Trades.WorkdayForMidnightTrade.find( { kerberos: req.user.kerberos }, function(err, trades) {
		if (err) return next(err);
		return res.json(trades);
	});
});

// /trades/user/workday GET
router.get('/user/Workday', function(req, res, next) {
	Trades.WorkdayForWorkdayTrade.find( { kerberos: req.user.kerberos }, function(err, trades) {
		if (err) return next(err);
		return res.json(trades);
	});
});

// /trades/midnight GET
router.get('/midnight', function(req, res, next) {
	//Grab all current midnights
	var today = new Date();
	var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
	Midnights.Midnight.find({ date: { $gte: yesterday } }, function(err,cur_midnights) {
		if (err) return next(err);
		//Grab incomplete midnight trades for current midnights
    Trades.MidnightTrade.find( {
      completed: {$ne: true},
      midnight_id: { $in: cur_midnights.map(function(x) {return x._id;})}
		}, function(err, cur_trades) {
			if (err) return next(err);
			return res.json(cur_trades);
		});
	});
});

// /trades/midnight POST
router.post('/midnight', function(req, res, next) {
	//Make sure user has this midnight
	Midnights.Midnight.find( {
		id: req.body.id,
		zebe: req.user.kerberos
	}, function(err, midnight) {
		if (err) return next(err);
		if (midnight) { //midnight must exist
			Trades.MidnightTrade.create(req.body, function(err) {
				if (err) return next(err);
				return res.json(_.slice(arguments,1));
			});
		} else {
			return res.sendStatus(403);
		}
	});
});

// /trades/midnight/execute/<string:id> PUT
router.put('/midnight/execute/:id', function(req, res, next) {
	Trades.MidnightTrade.findOneAndUpdate( 
		{ midnight_id: req.params.id, completed: { $ne: true } }, 
		{ 
			zebe_taker: req.user.kerberos, 
			completed: true
		},
		function(err, new_trade) {
			if (err) return next(err);
			if (new_trade) {
				Midnights.Midnight.findOneAndUpdate(
					{ id: new_trade.midnight_id },
					{ zebe: req.user.kerberos },
					function(err, new_midnight) {
						if (err) return next(err);
						return res.json(new_trade);
					}
				);
			}
		}
	);
});

// /trades/workday_for_midnight GET
router.get('/workday_for_midnight', function(req, res, next) {
	var today = new Date();
	//Grab all current workdays
	House.WorkdayAssignment.find({ date: { $gte: today } }, function(err, cur_workdays) {
		if (err) return next(err);
		Trades.WorkdayForMidnightTrade.find(
			{ 
				completed: false,
				workday_id: { $in: cur_workdays.map(function(x) {x.id;}) } 
			}, 
			function(err, cur_trades) {
				if (err) return next(err);
				return res.json(cur_trades);
			}
		);
	});
});

// /trades/workday_for_midnight POST
router.post('/workday_for_midnight', function(req, res, next) {
	//Make sure user has this workday
	House.WorkdayAssignment.find( 
		{
			id: req.body.id,
			zebe: req.user.kerberos,
		}, 
		function(err, workday) {
			if (err) return next(err);
			if (workday) { //workday must exist
				Trades.WorkdayForMidnightTrade.create(req.body, function(err) {
					if (err) return next(err);
					return res.json(_.slice(arguments,1));
				});
			} else {
				return res.sendStatus(403);
			}
		}
	);
});

// /trades/workday_for_midnight/execute/<string:id> PUT
router.put('/workday_for_midnight/execute/:id', function(req, res, next) {
	Trades.WorkdayForMidnightTrade.findOneAndUpdate(
		{ id: req.params.id, completed: false }, 
		{ 
			zebe_taker: req.user.kerberos,
			completed: true
		},
		function(err, new_trade) {
			if (err) return next(err);
			if (new_trade) { //original trade must exist and have been updated
				House.WorkdayAssignment.findOneAndUpdate(
					{ id: new_trade.workday_id },
					{ zebe: req.user.kerberos },
					function(err, new_workday) {
						if (err) return next(err);
						return res.json(new_trade);
					}
				);
			}
		}
	);
});

// /trades/workday GET
router.get('/workday', function(req, res, next) {
	var today = new Date();
	//Grab all current workdays
	House.WorkdayAssignment.find({ date: { $gte: today } }, function(err, cur_workdays) {
		if (err) return next(err);
		Trades.WorkdayForWorkdayTrade.find({ 
			completed: false,
			workday_offered_id: { $in: cur_workdays.map(function(x) {x.id;}) },
			workday_taken_id: { $in: cur_workdays.map(function(x) {x.id;}) } 
		}, function(err, cur_trades) {
			if (err) return next(err);
			return res.json(cur_trades);
		});
	});
});

// /trades/workday POST
router.post('/workday', function(req, res, next) {
	//Make sure user has this workday
	House.WorkdayAssignment.find( {
		id: req.body.id,
		zebe: req.user.kerberos
	}, function(err, workday) {
		if (err) return next(err);
		if (workday) { //workday must exist
			Trades.WorkdayForWorkdayTrade.create(req.body, function(err) {
				if (err) return next(err);
				return res.json(_.slice(arguments,1));
			})
		} else {
			return res.sendStatus(403);
		}
	});
});

// /trades/workday/execute/<string:id> PUT
router.put('/workday/execute/:id', function(req, res, next) {
	Trades.WorkdayForWorkdayTrade.find({ id: req.params.id, completed: false }, function(err, trade) {
		if (err) return next(err);
		if (trade) { //trade must exist
			//make sure user has workday taken
			House.WorkdayAssignment.find({ 
				id: trade.workday_taken_id, 
				zebe: req.user.kerberos
			}, function(err, workday_taken) {
				if (err) return next(err);
				if(workday_taken){ //workday taken must exist, user must be assigned it
					//execute trade
					_.assign(trade, { zebe_taker: req.user.kerberos }, { completed: true });
					trade.save(function(err, new_trade) {
						if (err) return next(err);
						//assign user to workday offered
						House.WorkdayAssignment.find({
							id: new_trade.workday_offered_id,
							zebe: new_trade.zebe_offering
						}, function(err, workday_offered) {
							if (err) return next(err);
							if (workday) { //workday_offered must exist, be assigned to zebe_offering
								_.assign(workday_offered, { zebe: req.user.kerberos });
								workday_offered.save(function(err, new_workday_offered) {
									if (err) return next(err);
									//assign original zebe to workday taken
									_.assign(workday_taken, { zebe: new_trade.zebe_offering });
									workday_taken.save(function(err, new_workday_taken) {
										if (err) return next(err);
										return res.json(new_trade);
									});
								});
							}
						});
					});
				}
			});
		}
	});
});

module.exports = router;
