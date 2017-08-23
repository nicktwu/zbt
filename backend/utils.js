module.exports.is_prod = function() {
  return process.env.HEROKU;
};
