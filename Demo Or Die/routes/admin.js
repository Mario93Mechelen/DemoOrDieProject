var express = require('express');
var router = express.Router();

var demotitle = "Demo Or Die!";


/* GET login page. */
router.get('/users', function(req, res, next) {
    res.render('users');
});

router.get('/endvoting', function(req, res, next){
	res.render('endvoting');
});



module.exports = router;
