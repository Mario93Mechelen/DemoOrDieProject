var express = require('express');
var router = express.Router();
const Account = require('../models/account');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');

var name = "Nog een naam";
var status = "Vote Now!";


/* GET login page. */
router.get('/profile/:id', function(req, res, next) {
	var id = req.params.id;
	
	Account.findOne({_id: id}, function(err,user){
        
            if(err){
				console.log(err)
			}
        
            var name = user.name;
            var photo = user.profilepic;
            var courses = user.courses;
            var demo = user.demo;
            var die = user.die;
            var vote = user.vote;
            var modifiedCourses = "";
        
            if(courses!=null){
                
                for(i=0; i<courses.length; i++){
                    if(i>0){
                        modifiedCourses = modifiedCourses.concat(", "+courses[i]);
                    } else {
                        modifiedCourses = modifiedCourses.concat(courses[i]);
                    }
                }
            }
            var qs = photo.substring(0, photo.indexOf('?'));
            res.render('vote_now', {name: name, photo:qs, status: status, id:id, demo:demo, die:die})
	});
    
    console.log(req.user._id);
    
    Account.findOne({_id: req.user._id}, function(err, user){
            if(err){
				console.log(err)
			}
            var vote = user.vote;
            if (vote == true) {
               res.redirect('vote_result/'+req.params.id);
            }
    });
});

module.exports = router;


