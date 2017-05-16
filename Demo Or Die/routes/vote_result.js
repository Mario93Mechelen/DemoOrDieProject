var express = require('express');
var router = express.Router();
const Account = require('../models/account');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');


/* GET vote_result page. */
router.get('/:id/:vote', function(req, res, next) {
	var id = req.params.id;
	var personalID = req.user._id;
	var vote = req.params.vote;
	var status = "You voted "+vote;
	var userid = req.user._id;
	console.log(userid);
	Account.findOne({_id: id}, function(err,user){
            if(err){
				console.log(err)
			}
		var name = user.name;
		var photo = user.profilepic;
		var courses = user.courses;
		if(courses!=null){
		var modifiedCourses = "";
		for(i=0; i<courses.length; i++){
			if(i>0){
				modifiedCourses = modifiedCourses.concat(", "+courses[i]);
			}else{
			modifiedCourses = modifiedCourses.concat(courses[i]);}
		}
		}
    	var qs = photo.substring(0, photo.indexOf('?'));
		res.render('vote_result', {name: name, status: status, photo:qs, vote:vote, id:personalID});
	});
	Account.update({_id:userid}, {$set:{vote:true}}, function(err, result) {
	if(err)
		console.log(err);
	});
});


module.exports = router;