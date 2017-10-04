var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var auth = require('./auth');
var db = require('./db');
var user = require('./routes/user');
var semester = require('./routes/semester');
var house = require('./routes/house');
var social = require('./routes/social');
var trades = require('./routes/trades');
var midnights = require('./routes/midnights');
var utils = require('./utils');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Zebe = require('./models/zebe');
// var profile = require('./routes/profile');
// ^ missing dependency (?)

db.init();

var app = express();

if (utils.is_prod()) {
  console.log("RUNNING IN PRODUCTION MODE...");
} else {
  console.log("RUNNING IN DEVELOPMENT MODE...");
  app.use(logger("dev"));
}

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (!utils.is_prod()) {
  app.get('/populate_test_data', function(req, res) {
    db.populate_test_data();
    res.send('ok');
  });
}

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post("/login", function(req, res) {
  Zebe.findOne({kerberos: req.body.username}, function(err, zebe) {
    if (err) return next(err);
    if (!zebe) return res.sendStatus(401);
    return bcrypt.compare(req.body.password, zebe.password, function(err, match) {
      if (match) {
        return res.json({token: jwt.sign({kerberos: zebe.kerberos, iat: Date.now(), exp: Date.now() + 30*60*1000 /*30 minutes*/}, process.env.SECRET_KEY)})
      } else {
        return res.sendStatus(401);
      }
    });
  })
});


app.use(auth.RequireLoggedIn);

// ****************************
// PUT SECURE ROUTES AFTER THIS
// ****************************

app.use('/api/v1/user', user);
app.use('/api/v1/semester', semester);
app.use('/api/v1/house', house);
app.use('/api/v1/social', social);
app.use('/api/v1/midnights', midnights);
app.use('/api/v1/trades', trades);

module.exports = app;
