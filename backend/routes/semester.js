var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Semester = require('../models/semester');

// get current semester
router.get('/', function(req, res, next) {
  Semester.getCurrent(function(err, cur) {
    if (err) return next(err);
    return res.json(cur);
  });
});

// create new semesters
// Invariant: at most one semester can be current
router.post('/', function(req, res, next) {
	if !(req.user.isPresident() || req.user.isTechChair()) return res.sendStatus(403);
	// check if there exists a current semester
	Semester.getCurrent(function(err, cur) {
		if (err) return next(err); // more than one current semester
		if (cur) {
			// can only create if it isn't being set to current semester
			if (req.body.current) return res.sendStatus(403);
			Semester.create(req.body, function(err) {
				if (err) return next(err);
				return res.json(_.slice(arguments,1));
			});
		} else { // Can create the semester regardless of its value for current
			Semester.create(req.body, function(err) {
				if (err) return next(err);
				return res.json(_.slice(arguments,1));
			});
		}
	});
});

// update current semester
// Invariant: at most one semester can be designated as current
router.put('/update_current/:id', function(req, res, next){
	Semester.getCurrent(function(err,cur) {
		if (err) return next(err); // more than one current semester
		if (curr == null) {
			// change id to be current
			Semester.update({ id: req.params.id }, {current: true}, function(err, raw) {
				if (err) return next(err); // can't find selected semester
				return res.json(raw);
			});
		} else {
			Semester.update({ id: cur.id }, {current: false}, function(err, raw){
				if (err) return next(err); // somehow can't find current semester it just returned
				Semester.update({ id: req.params.id }, {current: true}, function(err, raw) {
					if (err) return next(err); // can't find selected semester
					return res.json(raw);
				});
			});
		}
	});
});



module.exports = router;
