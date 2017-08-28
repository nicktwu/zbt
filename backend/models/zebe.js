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
  risk_manager: Boolean,
});

zebeSchema.methods.isPresident = function() {
  return this.president === true;
};

zebeSchema.methods.isRushChair = function() {
  return this.rush_chair === true;
};

zebeSchema.methods.isHouseChair = function() {
  return this.house_chair === true;
};

zebeSchema.methods.isMidnightMaker = function() {
  return this.midnight_maker === true;
};

zebeSchema.methods.isTechChair = function() {
  return this.tech_chair === true;
};

zebeSchema.methods.isWorkweekChair = function() {
  return this.workweek_chair === true;
};

zebeSchema.methods.isSocialChair = function() {
  return this.social_chair === true;
};

zebeSchema.methods.isRiskManager = function() {
  return this.risk_manager === true;
};

zebeSchema.methods.isDeveloper = function() {
  return this.dev === true;
};

var Zebe = mongoose.model('Zebe', zebeSchema);

module.exports = Zebe;