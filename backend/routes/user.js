var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Zebe = require('../models/zebe.js');

// Retrieve current user.
router.get('/', function(req, res, next) {
  res.json(req.user);
});

router.post('/', function(req, res, next) {
  if (true ||req.user.isPresident() || req.user.isRushChair()) {
    Zebe.create(req.body, function(err) {
      if (err) return next(err);
      // return created zebes
      return res.send(_.slice(arguments, 1));
    });
  } else {
    return res.sendStatus(403);
  }
});

router.put('/update/:kerberos', function(req, res, next) {
  Zebe.update({ kerberos: req.params.kerberos }, req.body, function(err, raw) {
    if (err) next(err);
    return res.send(raw);
  });
});

router.get('/current', function(req, res, next) {
  Zebe.find({ current: true }, function(err, zebes) {
    if (err) return next(err);
    return res.send(zebes);
  });
});

module.exports = router;
