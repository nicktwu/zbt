var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var House = require('../models/house');

router.get('/user', function(req, res, next) {
  House.WorkdayAssignment.find({ kerberos: req.user.kerberos }, function(err, ass) {
    if (err) return next(err);
    return res.json(ass);
  });
});

router.get('/workday/:date_unixtime', function(req, res, next) {
  var day = moment.unix(+req.params.date_unixtime).startOf('day');
  var after = moment(day).add(1, 'days');
  House.WorkdayAssignment.find({
    date: {
      $gte: today.toDate(),
      $lt: after.toDate(),
    },
  }, function(err, ass) {
    if (err) return next(err);
    return res.json(ass);
  });
});

router.post('/workday/create', function(req, res, next) {
  if (req.user.isHouseChair()) {
    House.WorkdayAssignment.create(req.body, function(err) {
      if (err) return next(err);
      // return created workday assignments
      return res.json(_.slice(arguments, 1));
    });
  } else {
    return res.sendStatus(403);
  }
});

router.put('/workday/update/:id', function(req, res, next) {
  if (req.user.isHouseChair()) {
    House.WorkdayAssignment.findById(req.params.id, function(err, ass) {
      if (err) return next(err);
      _.assign(ass, req.body);
      req.save(function(err, new_ass) {
        if (err) return next(err);
        return res.json(new_ass);
      });
    });
  } else {
    return res.sendStatus(403);
  }
});

router.get('/accounts', function(req, res, next) {
  House.HouseAccount.find({}, function(err, accounts) {
    if (err) return next(err);
    return res.json(accounts);
  });
});


router.post('/accounts/create', function(req, res, next) {
  if (req.user.isHouseChair()) {
    House.HouseAccount.create(req.body, function(err) {
      if (err) return next(err);
      // return created house accounts
      return res.json(_.slice(arguments, 1));
    });
  } else {
    return res.sendStatus(403);
  }
});

router.put('/workday/update/:id', function(req, res, next) {
  if (req.user.isHouseChair()) {
    House.HouseAccount.findById(req.params.id, function(err, acct) {
      if (err) return next(err);
      _.assign(acct, req.body);
      acct.save(function(err, new_acct) {
        if (err) return next(err);
        return res.json(new_acct);
      });
    });
  } else {
    return res.sendStatus(403);
  }
});

router.get('/incomplete', function(req, res, next) {
  House.WorkdayAssignment.find({
    date: {
      $lt: moment(),
    },
    completed: false,
  }, function(err, ass) {
    if (err) return next(err);
    return res.json(ass);
  });
});

module.exports = router;
