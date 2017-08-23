var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var midnightSchema = new Schema({
  date: Date,
  zebe: String,
  task: String,
  note: String,
  feedback: String,
  potential: Number,
  awarded: Number,
  reviewed: Boolean,
});

var midnightAccountSchema = new Schema({
  semester: String,
  zebe: String,
  balance: Number,
  requirement: Number,
});

var midnightTypeSchema = new Schema({
  name: String,
  value: Number,
  desc: String,
});

var midnightPrefsSchema = new Schema({
  zebe: String,
  daysPreferred: [String], // Days that this zebe prefers to work, ex: ['Monday', 'Thursday']
  tasksPreferred: [String], // Tasks that this zebe prefers to do, ex: ['Dinings', 'Waitings', 'Commons']
});
  
var Midnight = mongoose.model('Midnight', midnightSchema);
var MidnightAccount = mongoose.model('MidnightAccount', midnightAccountSchema);
var MidnightType = mongoose.model('MidnightType', midnightTypeSchema);
var MidnightPrefs = mongoose.model('MidnightPrefs', midnightPrefsSchema);

module.exports = {
  Midnight: Midnight,
  MidnightAccount: MidnightAccount,
  MidnightType: MidnightType,
  MidnightPrefs: MidnightPrefs,
};
