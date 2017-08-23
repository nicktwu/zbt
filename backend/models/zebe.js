var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zebeSchema = new Schema({
  kerberos: { type: String, index: { unique: true } },
  name: String,
  password: String,
  current: Boolean,
  president: Boolean,
  midnight_maker: Boolean,
  house_chair: Boolean,
  workweek_chair: Boolean,
  dev: Boolean,
  rush_chair: Boolean,
  social_chair: Boolean,
  tech_chair: Boolean,
});

zebeSchema.methods.isPresident = function() {
  return this.president === true;
};

zebeSchema.methods.isRushChair = function() {
  return this.rush_chair === true;
};


var Zebe = mongoose.model('Zebe', zebeSchema);

module.exports = Zebe;