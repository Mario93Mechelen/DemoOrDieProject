var express = require('express');
var router = express.Router();

var demotitle = "Demo Or Die!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', {demotitle: demotitle});
});

router.get('/profile', function(req, res, next) {
	res.render('profile', {name: name, demotitle: demotitle, groups: groups, time: time })
});

module.exports = router;
