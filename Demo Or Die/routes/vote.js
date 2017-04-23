var express = require('express');
var router = express.Router();

var demotitle = "Demo Or Die!";


/* GET login page. */
router.get('/', function(req, res, next) {
    res.send('vote page');
});



module.exports = router;
