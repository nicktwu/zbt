var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var _ = require('lodash');
var utils = require('./utils');

var Zebe = require('./models/zebe');

var jwt_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

console.log(process.env.SECRET_KEY);

var jwt_strategy = new JwtStrategy(jwt_opts, function(payload, done) {
  if (_.has(payload, 'kerberos')) {
    console.log(payload);
    if (payload.kerberos === "nwu") {
      var nwu = new Zebe({
        kerberos: 'nwu',
        name: 'Nicholas Wu',
        current: true,
        president: true,
        midnight_maker: true,
        house_chair: true,
        workweek_chair: true,
        dev: true,
        rush_chair: true,
        social_chair: true,
        tech_chair: true
      });
      return done(null, nwu);
    }

    Zebe.findOne({ kerberos: payload.kerberos }, function(err, zebe) {
      if (err) return done(err);
      if (!zebe) return done(null, false);
      return done(null, zebe);
    });
  } else {
    done('no kerberos in jwt', false);
  }
});

passport.use(jwt_strategy);

module.exports.RequireLoggedIn = passport.authenticate(
  'jwt',
  {session: false}
);