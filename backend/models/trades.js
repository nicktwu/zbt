var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var midnightTradeSchema = new Schema({
  midnight_id: Schema.Types.ObjectId,
  zebe_offering: String,
  offered: Number,
  completed: Boolean,
  zebe_taker: String,
});

var workdayForMidnightTradeSchema = new Schema({
  workday_id: Schema.Types.ObjectId,
  zebe_offering: String,
  points: Number,
  completed: Boolean,
  zebe_taker: String,
});

var workdayForWorkdayTradeSchema = new Schema({
  workday_offered_id: Schema.Types.ObjectId,
  zebe_offering: String,
  date: Date,
  completed: Boolean,
  workday_taken_id: Schema.Types.ObjectId,
  zebe_taker: String,
});


var MidnightTrade = mongoose.model('MidnightTrade', midnightTradeSchema);
var WorkdayForMidnightTrade = mongoose.model('WorkdayForMidnightTrade', workdayForMidnightTradeSchema);
var WorkdayForWorkdayTrade = mongoose.model('WorkdayForWorkdayTrade', workdayForWorkdayTradeSchema);

module.exports = {
  MidnightTrade: MidnightTrade,
  WorkdayForMidnightTrade: WorkdayForMidnightTrade,
  WorkdayForWorkdayTrade: WorkdayForWorkdayTrade,
};