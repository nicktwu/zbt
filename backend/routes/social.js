var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');

var Social = require('../models/social');

router.get('/events', function(req, res, next) {
  Social.SocialEvent.find({}, function(err, evts) {
    if (err) return next(err);
    return res.json(evts);
  });
});

router.get('/jobs/:id', function(req, res, next) {
  Social.PartyJob.find({social_event: req.params.id}, function(err, jobs) {
    if (err) return next(err);
    return res.json(jobs);
  });
});

router.post('/jobs/create', function(req, res, next) {
  if (req.user.isSocialChair() || req.user.isRiskManager()) {
    Social.PartyJob.create(req.body, function(err) {
      if (err) return next(err);
      // return created party jobs
      return res.json(_.slice(arguments, 1));
    });
  } else {
    return res.sendStatus(403);
  }
});

router.put('/jobs/update/:id', function(req, res, next) {
  if (req.user.isSocialChair() || req.user.isRiskManager()) {
    Social.PartyJob.findById(req.params.id, function(err, job) {
      if (err) return next(err);
      _.assign(job, req.body);
      job.save(function(err, new_job) {
        if (err) return next(err);
        return res.json(new_job);
      });
    });
  } else {
    return res.sendStatus(403);
  }
});

router.get('/accounts', function(req, res, next) {
  Semester.getCurrent(function(err, cur_sem) {
    if (err) return next(err);
    Social.SocialAccount.find({semester: cur_sem.name}, function(err, accounts) {
      if (err) return next(err);
      return res.json(accounts);
    });
  });
});


router.post('/accounts/create', function(req, res, next) {
  if (req.user.isSocialChair() || req.user.isRiskManager()) {
    Social.SocialAccount.create(req.body, function(err) {
      if (err) return next(err);
      // return created social accounts
      return res.json(_.slice(arguments, 1));
    });
  } else {
    return res.sendStatus(403);
  }
});

router.put('/accounts/update/:id', function(req, res, next) {
  if (req.user.isSocialChair() || req.user.isRiskManager()) {
    Social.SocialAccount.findById(req.params.id, function(err, acct) {
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

module.exports = router;
