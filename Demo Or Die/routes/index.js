var express = require('express');
var router = express.Router();

var demotitle = "Demo Or Die!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {demotitle: demotitle});
});


module.exports = router;
