var express = require('express');
var router = express.Router();
const Account = require('../models/account');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');

var status = "75% Demo!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";

/* GET profile page. */

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	
	Account.findOne({_id: id}, function(err,user){
		var name = user.name;
		var photo = user.profilepic;
		var courses = user.courses;
		var modifiedCourses = "";
		for(i=0; i<courses.length; i++){
			if(i>0){
				modifiedCourses = modifiedCourses.concat(", "+courses[i]);
			}else{
			modifiedCourses = modifiedCourses.concat(courses[i]);}
		}
    	var qs = photo.substring(0, photo.indexOf('?'));
		res.render('profile', {name: name, photo:qs,courses:modifiedCourses, status: status, groups: groups, time: time })
	});
	
	if(req.user.courses=="" && req.user.role=="Student"){
		res.redirect('/groups');
	}
});

router.post('/:id', function(req, res, next){
	res.send('success');
});

module.exports = router;
