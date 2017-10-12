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

// see all semesters
router.get('/all', function(req, res, next) {
  Semester.find({}, function(err, semesters) {
    if (err) return next(err);
    return res.json(semesters);
  });
});

// create new semesters
// Invariant: at most one semester can be current
router.post('/', function(req, res, next) {
	console.log("attempt to create semester");
	if (req.user.isPresident() || req.user.isTechChair()){
		// check if there exists a current semester
		Semester.getCurrent(function(err, cur) {
			if (err) return next(err); // more than one current semester
			if (cur) {
				console.log("current semester exists");
				// can only create if it isn't being set to current semester
				if (req.body.current) return res.sendStatus(403);
				Semester.create(req.body, function(err) {
					if (err) return next(err);
					return res.json(_.slice(arguments,1));
				});
			} else { // Can create the semester regardless of its value for current
				console.log("no current semester");
				Semester.create(req.body, function(err) {
					if (err) return next(err);
					return res.json(arguments);
				});
			}
		});
	} else {
		return res.sendStatus(403);
	}
});

// update current semester
// Invariant: at most one semester can be designated as current
router.put('/update_current/:id', function(req, res, next){
	if (req.user.isPresident() || req.user.isTechChair()){
		Semester.getCurrent(function(err,cur) {
			if (err) return next(err); // more than one current semester
			if (cur === null) {
				// change id to be current
        Semester.findByIdAndUpdate(req.params.id, {current: true}, function(err, new_sem) {
					if (err) return next(err);
					if (new_sem) {
						return res.json(new_sem);
					} else {
						res.sendStatus(404); //can't find semester by ID
					}
				});
			} else {
			  Semester.findByIdAndUpdate(cur.id, {current: false}, function(err, old) {
          if (err) return next(err);
          Semester.findByIdAndUpdate(req.params.id, {current: true}, function(err, new_sem) {
            if (err) return next(err);
            if (new_sem) {
              return res.json(new_sem);
            } else {
              res.sendStatus(404); //can't find semester by ID
            }
          } )
        });
			}
		});
	} else {
		res.sendStatus(403);
	}
});

module.exports = router;
