var express = require('express');
var router = express.Router();
const Account = require('../models/account');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');


/* GET groups page. */
router.get('/', function(req, res, next) {
	var username = req.user.name;
    res.render('groups');
});

router.post('/', function(req,res){
	var groups = req.body.group;
	Account.update({name:req.user.name}, {$set:{courses:groups}}, function(err, result) {
    if (err)
        console.log(err);
});
	res.redirect('/profile');
})

module.exports = router;
