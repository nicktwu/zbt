var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var auth = require('./auth');
var db = require('./db');
var users = require('./routes/users');
var utils = require('./utils');

if (utils.is_prod()) {
  console.log("RUNNING IN PRODUCTION MODE...");
} else {
  console.log("RUNNING IN DEVELOPMENT MODE...");
}

db.init();

var app = express();

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

app.use(auth.RequireLoggedIn);

// PUT SECURE ROUTES AFTER THIS

app.use('/api/v1/users', users);

module.exports = app;
