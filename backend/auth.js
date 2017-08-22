var secrets = require('./secrets');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var jwt_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secrets.crypto_key,
};

var jwt_strategy = new JwtStrategy(jwt_opts, function(payload, done) {
  console.log(payload);
});

passport.use(jwt_strategy);

module.exports.RequireLoggedIn = passport.authenticate(
  'jwt',
  {session: false}
);