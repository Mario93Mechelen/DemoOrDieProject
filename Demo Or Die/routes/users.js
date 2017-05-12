var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users')
});

router.post('/', function(req,res,next){
	console.log('something');
});

module.exports = router;
