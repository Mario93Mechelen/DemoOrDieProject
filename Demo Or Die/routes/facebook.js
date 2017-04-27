var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var router = express.Router();
const Account = require('../models/account');
const mongoose = require('mongoose');

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '457359077938042',
    clientSecret: '8bbf426ed099bcaa0841220cccdc7ad8',
    profileFields: ["id", "displayName", "gender", "first_name", "picture.type(large)", "last_name"],
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    /*Account.findOne({ name: profile.displayName }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }*/
	console.log(profile);
    cb(null, profile);
	    Account.findOne({ name: profile.displayName }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        cb(null, user);
      } else {
        user = new Account({
          name: profile.displayName,
          profilepic:  profile.photos ? profile.photos[0].value : 'http://media-cache-ec0.pinimg.com/736x/f8/18/6b/f8186b8f1b13ddb159119147d6430831.jpg'
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ..." + user);
            cb(null, user);
          }
        });
      }
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
router.use(require('morgan')('combined'));
router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());


// Define routes.
router.get('/',
  passport.authenticate('facebook'));

router.get('/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

module.exports = router;