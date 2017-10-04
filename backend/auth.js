var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var _ = require('lodash');
var Zebe = require('./models/zebe');

var jwt_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

var jwt_strategy = new JwtStrategy(jwt_opts, function(payload, done) {
  if (_.has(payload, 'kerberos')) {
    Zebe.findOne({ kerberos: payload.kerberos }, "+password", function(err, zebe) {
      if (err) return done(err);
      if (!zebe) return done(null, false);
      if (zebe.password) {
        zebe.password = "redacted";
      }
      return done(null, zebe);
    });
  } else {
    done('no kerberos in jwt', false);
  }
});

passport.use('jwt', jwt_strategy);

module.exports.RequireLoggedIn = passport.authenticate(
  'jwt',
  {session: false}
);

