const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const config = require('./config');

const localLogin = new LocalStrategy({
  usernameField: 'username'
}, async (username, password, done) => {
  let user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

const jwtLogin = new JwtStrategy({
  jwtFromRequest: function(req) {
    var token = null;
    if(req && req.cookies)
      token = req.cookies['jwt'];
    return token;
  },
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  
  if(!payload)
    return done(null, false);

  let user = await User.findById(payload._id);
  if (!user) {
    return done(null, false);
  }
  user = user.toObject();
  delete user.hashedPassword;
  done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
