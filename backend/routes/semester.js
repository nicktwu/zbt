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

router.get('/create', function(req, res, next) {
  // TODO
  res.sendStatus(501); // 501 not implemented
});

module.exports = router;
