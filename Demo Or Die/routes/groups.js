var express = require('express');
var router = express.Router();


/* GET groups page. */
router.get('/', function(req, res, next) {
    res.render('groups');
});

module.exports = router;
