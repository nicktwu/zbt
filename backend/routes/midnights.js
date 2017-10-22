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
    Midnights.MidnightAccount.findByIdAndUpdate(req.params.id, {zebe: req.body.zebe, balance: req.body.balance, requirement: req.body.requirement}, function(err, new_account) {
      if (err) return next(err);
      return res.json(new_account);
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/accounts/remove/:id DELETE
router.delete('/accounts/remove/:id', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.MidnightAccount.findByIdAndRemove(req.params.id, function(err) {
      if (err) return next(err);
      return res.json({removed: true});
    })
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
    Midnights.MidnightType.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, new_type) {
      if (err) return next(err);
      return res.json(new_type);
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/types/remove/id DELETE
router.delete('/types/remove/:id', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.MidnightType.remove({ _id: req.params.id }, function(err) {
      if (err) return next(err);
      return res.json({removed: true});
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

// /midnights/unreviewed GET
router.get('/unreviewed', function(req, res, next) {
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(),today.getDate());
  //check for midnights that have either no "reviewed" attribute or are explicitly not reviewed
  Midnights.Midnight.find( {
    $and: [{
      $or: [ { reviewed: { $exists: false } }, { reviewed: false } ]
    }, {
      date: { $lte: firstDay }
    }]
  } , function(err, assignments) {
    if (err) return next(err);
    return res.json(assignments);
  });
});

// /midnights/reviewed GET
router.get('/reviewed', function(req, res, next) {
  var today = new Date();
  var lastDay = new Date(today.getFullYear(), today.getMonth(),today.getDate());
  var firstDay = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate() - 7);
  Midnights.Midnight.find( {
    $and: [{reviewed: true},{ date: { $gte: firstDay, $lte: lastDay } }]
  }, function(err, assignments) {
    if (err) return next(err);
    return res.json(assignments);
  });
});

// /midnights/bulk_create POST
router.post('/bulk_create', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    var ms = req.body.midnights;
    console.log(req);
    Midnights.Midnight.insertMany(ms, function(err, docs) {
      if (err) return next(err);
      return res.json({stored: docs.length});
    })
  } else {
    res.sendStatus(403);
  }
});


// /midnights/update_assignment/<int:id> PUT
router.put('/update_assignment/:id', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.Midnight.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, new_assignment) {
      if (err) return next(err);
      return res.json(new_assignment);
    });
  } else {
    res.sendStatus(403);
  }
});

router.put('/award', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.Midnight.findOneAndUpdate({
      $and: [
        {_id: req.body._id},
        { $or: [ { reviewed: { $exists: false } }, { reviewed: false } ] }
      ]
    }, {
      awarded: req.body.awarded,
      reviewed: true
    }, function(err, resp) {
      if (err) return next(err);
      Midnights.MidnightAccount.findOneAndUpdate({zebe: resp.zebe}, {$inc : {balance: req.body.awarded}}, function(err, acc) {
        if (err) return next(err);
        return res.json(acc);
      })
    })
  } else {
    res.sendStatus(403);
  }
});


// /midnights/remove/:id DELETE
router.delete('/remove/:id', function(req, res, next) {
  if (req.user.isMidnightMaker()) {
    Midnights.Midnight.remove({ _id: req.params.id }, function(err) {
      if (err) return next(err);
      return res.json({removed: true});
    });
  } else {
    res.sendStatus(403);
  }
});

// /midnights/:id GET
router.get('/:id', function(req, res, next) {
  Midnights.Midnight.findById(req.params.id, function(err, midnight) {
    if (err) return next(err);
    return res.json(midnight);
  });
});



module.exports = router;
