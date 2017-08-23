var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var semesterSchema = new Schema({
  name: { type: String, index: { unique: true }}, // e.g Fall 2017
  start: Date,
  end: Date,
  current: Boolean,
});

semesterSchema.statics.getCurrent = function(callback) {
  this.find({current: true}, function(err, sems) {
    if (sems.length === 0) return callback(null, null);
    if (sems.length > 1) return callback(new Error('more than 1 current semester'), null);
    return callback(null, sems[0]);
  });
};

var Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;