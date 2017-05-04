var express = require('express');
var router = express.Router();
const Account = require('../models/account');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');

var demotitle = "Demo Or Die!";
var status = "75% Demo!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";

/* GET login page. */
router.get('/users', function(req, res, next) {
    res.render('users');
});

router.post('/users', function(req, res, next){
    console.log(req.body);
   /* var partName = req.body.partName;
    if (partName == "") { */
        /*var course = req.body.option;
        if (course=='All'){
        Account.find({role:'Student'}, function(err,result){
            res.send(result);
        });	
        }else{
        Account.find({courses:course}, function(err,result){
            res.send(result);
        });
        }*/
   /* } else {
        res.send(req.body.option, req.body.partName);
    }*/
});

router.get('/profile/:id', function(req, res, next){
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
		res.render('profile', {name: name, photo:qs,courses:modifiedCourses, status: status, groups: groups, time: time });
	});
});

router.get('/endvoting', function(req, res, next){
	res.render('endvoting');
	console.log(amount);
});



module.exports = router;
