var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Zebe = require('../models/zebe');

// Retrieve current user.
router.get('/', function(req, res, next) {
  res.json(req.user);
});

router.get('/:kerberos', function(req, res, next) {
  Zebe.findOne({ kerberos: req.params.kerberos }, function(err, zebes) {
    if (err) return next(err);
    return res.json(zebes);
  });
});

router.post('/create', function(req, res, next) {
  if (req.user.isPresident() || req.user.isRushChair() || req.user.isRushChair() ) {
    Zebe.create(req.body, function(err) {
      console.log(req.body);
      if (err) return next(err);
      // return created zebes
      return res.json(_.slice(arguments, 1));
    });
  } else {
    return res.sendStatus(403);
  }
});

router.put('/update/:kerberos', function(req, res, next) {
  if (req.user.isPresident() || req.user.isRushChair() || req.user.isRushChair()) {
    Zebe.update({kerberos: req.params.kerberos}, req.body, function (err, raw) {
      if (err) next(err);
      return res.json(raw);
    });
  } else {
    return res.sendStatus(403);
  }
});

router.delete('/remove/:kerberos', function(req, res, next) {
  if (req.user.isPresident() || req.user.isRushChair() || req.user.isRushChair() ) {
  Zebe.remove({kerberos: req.params.kerberos}, function(err) {
    if (err) next(err);
    return res.json({removed: true})
  })
  } else {
    return res.sendStatus(403);
  }
});

router.get('/current', function(req, res, next) {
  Zebe.find({ current: true }, function(err, zebes) {
    if (err) return next(err);
    return res.json(zebes);
  });
});

module.exports = router;
