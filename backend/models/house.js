var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workdayAssignmentSchema = new Schema({
  zebe: String,
  date: Date,
  completed: Boolean,
});

var houseAccountSchema = new Schema({
  semester: String,
  zebe: String,
  balance: Number,
  requirement: Number,
});


var WorkdayAssignment = mongoose.model('WorkdayAssignment', workdayAssignmentSchema);
var HouseAccount = mongoose.model('HouseAccount', houseAccountSchema);

module.exports = {
  WorkdayAssignment: WorkdayAssignment,
  HouseAccount: HouseAccount,
};