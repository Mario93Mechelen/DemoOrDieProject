var express = require('express');
var router = express.Router();

var status = "75% Demo!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";

/* GET voting in progress page. */
router.get('/', function(req, res, next) {
    res.render('endvoting', {name: name, status: status, groups: groups, time: time });
});

module.exports = router;