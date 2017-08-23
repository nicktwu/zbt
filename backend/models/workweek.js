var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workweekShiftAssignmentSchema = new Schema({
  zebe: String,
  date: Date,
  start: Date,
  end: Date,
  completed: Boolean,
});

var workweekAccountSchema = new Schema({
  semester: String,
  zebe: String,
  balance: Number,
  requirement: Number,
});

var workweekTicketSchema = new Schema({
  zebe_taker: String,
  desc: String,
  hours: Number,
  completed: Boolean,
});

var WorkweekShiftAssignment = mongoose.model('WorkweekShiftAssignment', workweekShiftAssignmentSchema);
var WorkweekAccount = mongoose.model('WorkweekAccount', workweekAccountSchema);
var WorkweekTicketSchema = mongoose.model('WorkweekTicket', workweekTicketSchema);

module.exports = {
  WorkweekShiftAssignment: WorkweekShiftAssignment,
  WorkweekAccount: WorkweekAccount,
  WorkweekTicketSchema: WorkweekTicketSchema,
};