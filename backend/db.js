var mongoose = require('mongoose');

var config = require('./config');
var utils = require('./utils');

var Zebe = require('./models/zebe');


function init() {
  if (utils.is_prod()) {
    console.log('Connecting to prod db');
    // MONGODB_URI already contains username, pass, and db
    mongoose.connect(process.env.MONGODB_URI);
  } else {
    console.log('Connecting to dev db');
    mongoose.connect(config.mongodb_server_dev + config.db_name);
  }

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

function populate_test_data() {
  var test = new Zebe({
    kerberos: 'testuser',
    name: 'Rick Rick',
    current: true,
    president: false,
    midnight_maker: false,
    house_chair: false,
    workweek_chair: false,
    dev: false,
    rush_chair: false,
    social_chair: false,
    tech_chair: false,
  });
  test.save(function(err) {
    if (err) console.log(err);
  });
}

module.exports = {
  init: init,
  populate_test_data: populate_test_data,
};