const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var flash = require('connect-flash');
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const Account = require('../models/account');

passport.use(new FacebookStrategy({
    clientID: '457359077938042',
    clientSecret: '8bbf426ed099bcaa0841220cccdc7ad8',
	profileFields: ["id", "displayName", "gender", "first_name", "picture.type(large)", "last_name"],
    callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    Account.findOne({ name: profile.displayName }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new Account({
          name: profile.displayName,
          profilepic:  "https://graph.facebook.com/" + profile.id + "/picture" + "?type=normal" + "&access_token=" + accessToken,
			courses:"",
			role:""
        });
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ..." + user);
            done(null, user);
          }
        });
      }
    });
   }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res){
      Account.findOne({ role: req.user.role }, function(err, user){
          if(err) {
            console.log(err);  // handle errors!
          }
          if (!err && user.role !== "") {
            res.redirect('/profile');
          } else {
            res.redirect('/roles')
          }
      });  
});

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash(). 
  req.flash('info', req.user);
});

module.exports = router;
