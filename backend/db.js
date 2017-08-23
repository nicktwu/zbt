var mongoose = require('mongoose');

var config = require('./config');
var utils = require('./utils');

var Zebe = require('./models/zebe');


function init() {
  if (utils.is_prod()) {
    console.log('Connecting to prod db');
    throw 'Prod db connections not implemented';
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
  });
  test.save(function(err) {
    if (err) throw err;
  });
}

module.exports = {
  init: init,
  populate_test_data: populate_test_data,
};