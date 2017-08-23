var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var semesterSchema = new Schema({
  name: { type: String, index: { unique: true }}, // e.g Fall 2017
  start: Date,
  end: Date,
});

var Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;