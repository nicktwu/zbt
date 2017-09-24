var mongoose = require('mongoose');

var config = require('./config');
var utils = require('./utils');

var Zebe = require('./models/zebe');
var Midnight = require('./models/midnights').Midnight;


function init() {
  if (utils.is_prod()) {
    console.log('Connecting to prod db');
    // MONGODB_URI already contains username, pass, and db
    mongoose.connect(process.env.MONGODB_URI, {useMongoClient:true});
  } else {
    console.log('Connecting to dev db');
    mongoose.connect(process.env.MONGODB_URI, {useMongoClient:true});
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


  test_assignments.forEach(function (assignment) {
    var type = assignment[0];
    var day = assignment[1];
    var zebe = assignment[2];

    var now = new Date();
    var midnight = new Midnight({
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + day),
      zebe: zebe,
      task: type,
      potential: 15,
      awarded: 0,
      reviewed: false,
    });

    midnight.save();
  });
}

module.exports = {
  init: init,
  populate_test_data: populate_test_data,
};

var test_assignments = [
  ['Dishes', 2, 'amok4470'],
  ['Waitings1', 0, 'bhwang'],
  ['Waitings1', 2, 'juesato'],
  ['Commons', 4, 'justyu'],
  ['Kitchens2', 4, 'aramos08'],
  ['Kitchens2', 3, 'emazuh'],
  ['Kitchens1', 2, null],
  ['Cluster', 2, 'amok4470'],
  ['Dinings', 5, 'nwu'],
  ['Bathrooms1', 2, 'bsaavedr'],
  ['Cluster', 3, 'bsaavedr'],
  ['Bathrooms1', 1, 'tomotomo'],
  ['Kitchens1', 3, 'scen'],
  ['Waitings2', 5, 'bhwang'],
  ['Kitchens2', 1, 'jongwook'],
  ['Commons', 3, 'bsaavedr'],
  ['Dinings', 4, null],
  ['Dinings', 0, 'mbahner'],
  ['Commons', 2, 'juesato'],
  ['Kitchens2', 5, 'bhwang'],
  ['Dishes', 3, 'tomotomo'],
  ['Kitchens2', 2, 'daviwang'],
  ['Kitchens1', 4, 'aramos08'],
  ['Bathrooms1', 3, 'tbarr'],
  ['Kitchens1', 0, 'testuser'],
  ['Waitings1', 5, 'mbahner'],
  ['Kitchens1', 5, 'harisb'],
  ['Cluster', 0, 'mbahner'],
  ['Waitings1', 1, 'emazuh'],
  ['Dinings', 3, null],
  ['Dishes', 1, 'bzeng'],
  ['Cluster', 5, 'nwu'],
  ['Dinings', 2, 'hokun'],
  ['Kitchens2', 0, 'juesato'],
  ['Dishes', 5, 'nwu'],
  ['Waitings2', 1, 'jongwook'],
  ['Commons', 0, 'testuser'],
  ['Bathrooms2', 0, 'scen'],
  ['Bathrooms1', 0, 'amok4470'],
  ['Dinings', 1, 'emazuh'],
  ['Dishes', 4, 'hokun'],
  ['Bathrooms1', 5, 'nwu'],
  ['Waitings1', 3, 'tomotomo'],
  ['Dishes', 0, 'echentw'],
  ['Cluster', 4, 'yoon17j'],
  ['Waitings2', 3, 'bzeng'],
  ['Bathrooms1', 4, 'aramos08'],
  ['Commons', 5, 'daviwang'],
  ['Kitchens1', 1, 'liangjy'],
  ['Waitings2', 0, 'emazuh'],
  ['Waitings2', 2, 'juesato'],
  ['Cluster', 1, 'bsaavedr'],
  ['Commons', 1, 'bzeng'],
  ['Bathrooms2', 3, 'hokun']
];
