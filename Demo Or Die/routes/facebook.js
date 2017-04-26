var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/account');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '304106220026376',
    clientSecret: '0367bff7aab6c6941dc30c79d16ea8c5',
    callbackURL: "http://localhost:3001/auth/facebook/callback",
	profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({name:profile.displayName}, function(err, user) {
     	if (err) { 
		  console.log(err)	
		}
		if (!err && user!== null){
		done(null, user);
		}else{
			user = new Account({
			name:profile.displayName,
			profilepic: profile.photos ? profile.photos[0].value : 'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/15871574_10211706818095211_5225596982032469818_n.jpg?oh=a87f334aeb3544f44b5b8d6860189aba&oe=59C293C6'
		});
		user.save(function(err){
			if(err){
				console.log(err);
			}else{
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
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/login' }));

module.exports = router;