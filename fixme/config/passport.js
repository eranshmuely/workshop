const passport = require('passport');
const request = require('request');
const InstagramStrategy = require('passport-instagram').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const OpenIDStrategy = require('passport-openid').Strategy;
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const PredixStrategy = require('passport-predix-oauth').Strategy;
const User = require('../models/User');
const jwtDecode = require('jwt-decode');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('uaa', new OAuth2Strategy({
    authorizationURL: 'https://training-uaa-vancouver.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/authorize',
    tokenURL: 'https://training-uaa-vancouver.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
    clientID: 'tfg',
    clientSecret: 'qaz123',
    callbackURL: "http://localhost:3000/auth/uaa/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    decoded = jwtDecode(accessToken);
    findOrCreateUser(decoded.email, {name: decoded.user_name}, (err, user)=>{
      if (err) {
        return cb(err, user);
      }
      user.tokens = [accessToken];
      user.save();
      return cb(err, user);
    });
  }
));

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid email or password.' });
    });
  });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};


const findOrCreateUser = (email, profile, callback) => {

  User.findOne({email}, (err, user)=>{
      if (err) {
        return callback(err);
      }

      if (user) {
        return callback(null, user);
      }

      User.create({email, profile}, callback);

  });

}
