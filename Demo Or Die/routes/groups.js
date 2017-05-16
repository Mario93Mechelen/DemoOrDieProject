var express = require('express');
var router = express.Router();
const Account = require('../models/account');
const Courses = require('../models/courses');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');


/* GET groups page. */
router.get('/', function(req, res, next) {
	var username = req.user.name;
	Courses.find(function(err,course){
            if(err){
				console.log(err)
			}
		    res.render('groups', {courses:course});
	})
});

router.post('/', function(req,res){
	var groups = req.body.group;
	Account.update({name:req.user.name}, {$set:{courses:groups}}, function(err, result) {
    if (err)
        console.log(err);
});
	res.redirect('/profile/'+req.user._id);
})

module.exports = router;
