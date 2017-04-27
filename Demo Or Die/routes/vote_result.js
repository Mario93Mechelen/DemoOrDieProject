var express = require('express');
var router = express.Router();

var name = "Nog een naam";
var status = "You voted demo";


/* GET vote_result page. */
router.get('/', function(req, res, next) {
    res.render('vote_result', {name: name, status: status});
});

module.exports = router;