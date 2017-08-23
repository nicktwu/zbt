var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partyJobSchema = new Schema({
  date: Date,
  shift: Date,
  zebe_taker: String,
  task: String,
  note: String,
  potential: Number,
  awarded: Number,
  reviewed: Boolean,
});

var socialAccountSchema = new Schema({
  semester: String,
  zebe: String,
  balance: Number,
  requirement: Number,
});

var partyJobTypeSchema = new Schema({
  name: String,
  desc: String,
  value: Number,
});

var PartyJobSchema = mongoose.model('PartyJobSchema', partyJobSchema);
var SocialAccountSchema = mongoose.model('SocialAccountSchema', socialAccountSchema);
var PartyJobType = mongoose.model('PartyJobType', partyJobTypeSchema);

module.exports = {
  PartyJobSchema: PartyJobSchema,
  SocialAccountSchema: SocialAccountSchema,
  PartyJobType: PartyJobType,
};