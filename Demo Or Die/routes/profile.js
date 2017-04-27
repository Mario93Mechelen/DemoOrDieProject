var express = require('express');
var router = express.Router();

var status = "75% Demo!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";

/* GET profile page. */

router.get('/', function(req, res, next) {
    res.render('profile', {name: name, status: status, groups: groups, time: time })
});

module.exports = router;
