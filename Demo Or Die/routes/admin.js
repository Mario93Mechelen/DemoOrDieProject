var express = require('express');
var router = express.Router();
const Account = require('../models/account');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');
var amount = 0;

var demotitle = "Demo Or Die!";


/* GET login page. */
router.get('/users', function(req, res, next) {
    res.render('users');
});

router.post('/users', function(req, res, next){
var course = req.body.option;
if (course=='All'){
Account.find({role:'Student'}, function(err,result){
	res.send(result);
});	
}else{
Account.find({courses:course}, function(err,result){
	res.send(result);
});
}
});

router.get('/endvoting', function(req, res, next){
	res.render('endvoting');
	console.log(amount);
});



module.exports = router;
