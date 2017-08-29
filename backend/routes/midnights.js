var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var Semester = require('../models/semester');
var Midnights = require('../models/midnights');

// /midnights/accounts GET
router.get('/accounts', function(req, res, next) {
  Semester.getCurrent( function(err, cur) {
    if (err) return next(err); // more than one current semester
    Midnights.MidnightAccount.find({ semester: cur.name }, function(err, accounts) {
      if (err) return next(err); // no accounts??
      return res.json(accounts);
    });
  });
});

// /midnights/accounts POST
router.post('/accounts/create', function(req, res, next){
  if (req.user.isMidnightMaker()) {
    Midnights.MidnightAccount.create(req.body, function(err) {
      if (err) return next(err);
      return res.json(arguments);
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/accounts/<int:id> PUT
router.put('/accounts/update/:id', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.MidnightAccount.findOneAndUpdate({ id: req.params.id }, req.body, function(err, new_account) {
      if (err) return next(err);
      return res.json(new_account);
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/types GET
router.get('/types', function(req, res, next) {
  Midnights.MidnightType.find({}, function(err, types) {
    if (err) return next(err);
    return res.json(types);
  });
});

// /midnights/types/create POST
router.post('/types/create', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.MidnightType.create(req.body, function(err) {
      if (err) return next(err);
      return res.json(arguments);
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/types/update/<int:id> PUT
router.put('/types/update/:id', function(req, res, next){
  if (req.user.isMidnightMaker()) {
    Midnights.MidnightType.findOneAndUpdate({ id: req.params.id }, req.body, function(err, new_type) {
      if (err) return next(err);
      return res.json(new_type);
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/weeklist GET
router.get('/weeklist', function(req, res, next) {
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(),today.getDate() - today.getDay()); //sets to midnight sunday, all sunday midnights included
  var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7); //sets to midnight Sunday, all saturday midnights are included
  Midnights.Midnight.find( { date: { $gte: firstDay, $lte: lastDay } }, function(err, assignments) {
    if (err) return next(err);
    return res.json(assignments);
  });
});

// /midnights/assign POST
router.post('/assign', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.Midnight.create(req.body, function(err) {
      if (err) return next(err);
      return res.json(arguments)
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/update_assignment/<int:id> PUT
router.put('/update_assignment/:id', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.Midnight.findOneAndUpdate({ id: req.params.id }, req.body, function(err, new_assignment) {
      if (err) return next(err);
      return res.json(new_assignment);
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/unreviewed GET
router.get('/unreviewed', function(req, res, next) {
  //check for midnights that have either no "reviewed" attribute or are explicitly not reviewed
  Midnights.Midnight.find( { $or: [ { reviewed: { $exists: false } }, { reviewed: false } ] } , function(err, assignments) {
    if (err) return next(err);
    return res.json(assignments);
  });
});

// /midnights/reviewed GET
router.get('/reviewed', function(req, res, next) {
  Midnights.Midnight.find( {reviewed: true }, function(err, assignments) {
    if (err) return next(err);
    return res.json(assignments);
  });
});


module.exports = router;