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
            if(err){
				console.log(err)
			}
		var name = user.name;
		var photo = user.profilepic;
		var courses = user.courses;
		var modifiedCourses = "";
		var date = user.date;
        var demo = user.demo;
        var die = user.die;
        var total = demo + die;
        var demoPercentage = demo / total * 100;
        var diePercentage = die / total *100;
        demoPercentage = Math.round(demoPercentage);
		diePercentage = Math.round(diePercentage);
        
        if (demo == 0 && die == 0) {
            demoPercentage = 50;
            diePercentage = 50;
            var message = "You have not been on stage yet";
        } else {
            if (demoPercentage >= diePercentage) {
                var message = demoPercentage + "% demo";
            } else {
                var message = diePercentage + "% die";
            }
            
        }        
        
        
		if (date==""){
			date="No data";
        }
        if(courses!=null){
		for(i=0; i<courses.length; i++){
			if(i>0){
				modifiedCourses = modifiedCourses.concat(", "+courses[i]);
			}else{
			modifiedCourses = modifiedCourses.concat(courses[i]);}
		}
		}
    	var qs = photo.substring(0, photo.indexOf('?'));
		res.render('profile', {name: name, photo:qs,courses:modifiedCourses,groups: groups, date: date, demo: demoPercentage, die: diePercentage, message: message })
	});
	
	if(req.user.courses=="" && req.user.role=="Student"){
		res.redirect('/groups');
	}
});

router.post('/:id', function(req, res, next){
	res.send('success');
});

module.exports = router;
