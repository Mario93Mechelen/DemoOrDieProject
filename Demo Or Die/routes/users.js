var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.redirect('/login');
});

router.post('/', function(req,res,next){
	console.log('something');
});

module.exports = router;
