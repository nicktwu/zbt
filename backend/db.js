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
    mongoose.connect(config.mongodb_server_dev + config.db_name_dev);
  }

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

function populate_test_data() {
  var test = new Zebe({
    kerberos: 'testuser',
    name: 'Rick Rick',
    current: true,
    president: true,
    midnight_maker: true,
    house_chair: true,
    workweek_chair: true,
    dev: true,
    rush_chair: true,
    social_chair: true,
    tech_chair: true,
  });
  test.save(function(err) {
    if (err) console.log(err);
  });
}

module.exports = {
  init: init,
  populate_test_data: populate_test_data,
};
