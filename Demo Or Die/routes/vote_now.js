var express = require('express');
var router = express.Router();

var name = "Nog een naam";
var status = "Vote Now!";


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('vote_now', {name: name, status: status});
});

module.exports = router;


