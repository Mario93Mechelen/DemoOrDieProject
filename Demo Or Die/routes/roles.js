var express = require('express');
var router = express.Router();
const Account = require('../models/account');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');


/* GET groups page. */
router.get('/', function(req, res, next) {
    res.render('roles');
});

router.post('/', function(req,res){
	var role = req.body.role;
	if(role=='admin'){
	var prompt = require('prompt');
 
  // 
  // Start the prompt 
  // 
  prompt.start();
 
  // 
  // Get two properties from the user: username and email 
  // 
  prompt.get(['password'], function (err, result) {
    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('  password: ' + result.password);
	  if(result.password=='docent'){
		  Account.update({name:req.user.name}, {$set:{role:role}}, function(err, result) {
    if (err)
        console.log(err);
});
	res.redirect('/admin');
	  }
	  })

  });
	}
	else{
	Account.update({name:req.user.name}, {$set:{role:role}}, function(err, result) {
    if (err)
        console.log(err);
});
	res.redirect('/profile');
}


module.exports = router;
