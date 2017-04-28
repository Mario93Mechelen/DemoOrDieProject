var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

var status = "75% Demo!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";

/* GET profile page. */

router.get('/', function(req, res, next) {
	var name = req.user.name;
	var photo = req.user.profilepic;
	if(req.user.courses==""){
		res.redirect('/groups');
	}
    res.render('profile', {name: name, photo:photo, status: status, groups: groups, time: time })
});

module.exports = router;
