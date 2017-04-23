var express = require('express');
var router = express.Router();

var demotitle = "Demo Or Die!";


/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {demotitle: demotitle});
});



module.exports = router;
