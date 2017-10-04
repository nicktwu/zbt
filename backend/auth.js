var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var _ = require('lodash');
var Zebe = require('./models/zebe');

var jwt_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

var jwt_strategy = new JwtStrategy(jwt_opts, function(payload, done) {
  if (_.has(payload, 'kerberos')) {
    Zebe.findOne({ kerberos: payload.kerberos }, function(err, zebe) {
      if (err) return done(err);
      if (!zebe) return done(null, false);
      return done(null, zebe);
    });
  } else {
    done('no kerberos in jwt', false);
  }
});

var local_strategy = new LocalStrategy(function(username, password, done) {
  Zebe.findOne({kerberos: username}, function(err, zebe) {
    if (err) return done(err);
    if (!zebe) return done(null, false);
    bcrypt.compare(password, zebe.password, function(err, match) {
      if (match) {
        return done(null, zebe)
      } else {
        return done(null, false);
      }
    });
    return done(null, zebe)
  })
});

passport.use('jwt', jwt_strategy);
passport.use('local', local_strategy);

module.exports.RequireLoggedIn = passport.authenticate(
  'jwt',
  {session: false}
);

module.exports.ManualLogIn = passport.authenticate('local', {session: false});

