var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partyJobSchema = new Schema({
  social_event: Schema.Types.ObjectId, // id of corresponding event
  date_and_time: Date, // includes time
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

var socialEventSchema = new Schema({
  name: String,
  start_time: Date,
});

var PartyJob = mongoose.model('PartyJob', partyJobSchema);
var SocialAccount = mongoose.model('SocialAccount', socialAccountSchema);
var PartyJobType = mongoose.model('PartyJobType', partyJobTypeSchema);
var SocialEvent = mongoose.model('SocialEvent', socialEventSchema);

module.exports = {
  PartyJob: PartyJob,
  SocialAccount: SocialAccount,
  PartyJobType: PartyJobType,
  SocialEvent: SocialEvent,
};