var express = require('express');
var router = express.Router();
const Account = require('../models/account');
const mongoose = require('mongoose');

var status = "75% Demo!";
var name = "Some Name";
var groups = "Some groups";
var time = "Some time";

/* GET voting in progress page. */
router.get('/', function(req, res, next) {
    res.render('endvoting', {name: name, status: status, groups: groups, time: time });
});

router.post('/', function(req, res, next) {
    Account.find({role:'Student'}, function(err,result){
        res.send(result);
    });	
    Account.update({role:'Student'},{$set:{vote:false}},{multi:true}, function(err, result){
				if(err){
					console.log(err);
				}
			});
});

module.exports = router;