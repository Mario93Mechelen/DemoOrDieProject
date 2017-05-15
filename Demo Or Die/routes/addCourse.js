var express = require('express');
var router = express.Router();
const Account = require('../models/account');
const Courses = require('../models/courses');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');

/* GET login page. */
router.get('/', function(req, res, next) {
	Courses.find(function(err, course){
	if(err)
		console.log(err)
		
	res.render('addcourse', {courses:course});
	})
});

router.post('/', function(req, res, next){
	if(req.body.deletecourse!=undefined){
		var course = req.body.deletecourse;
        Courses.remove({course:course}, function(err,course){
			if(err)	
				console.log(err)	
		})
		res.send('success');
	}else{
	var course = req.body.course;
	course = new Courses({
            course: course
        });
        course.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("savingcourse ..." + course);
          }
        });
		res.redirect('/addcourse');
	}
});

module.exports = router;
