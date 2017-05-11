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
	if(role=='Teacher'){
	var password = req.body.password;
 
  
	  if(password=='docent'){
		  Account.update({name:req.user.name}, {$set:{role:role}}, function(err, result) {
    if (err)
        console.log(err);
		  });
	res.redirect('/admin/users');
	  }
	  else{
		  res.redirect('/roles');
	  }
	

  }
	else{
	Account.update({name:req.user.name}, {$set:{role:role}}, function(err, result) {
    if (err)
        console.log(err);
});
	res.redirect('/groups');
}
});

module.exports = router;
