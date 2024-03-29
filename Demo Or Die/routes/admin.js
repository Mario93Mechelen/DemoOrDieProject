var express = require('express');
var router = express.Router();
const Account = require('../models/account');
const Courses = require('../models/courses');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
var flash = require('connect-flash');

/* GET login page. */
// studenten worden omgeleid naar profielpagina, leraar krijgt alle leerlingen te zien die nog niet onstage waren
router.get('/users', function(req, res, next) {
    
	if(req.user.role=='Student'){
		res.redirect('/profile/'+req.user.id);
	}
    
    console.log('hier moet je alle users steeds controleren of resetten');
	Account.count({onStage:false, role:'Student'}, function(err,result){
		if(err)
			console.log(err);
		if(result==0){
			Account.update({role:'Student'},{$set:{onStage:false}},{multi:true}, function(err, result){
				if(err){
					console.log(err);
				}
			})
		}
	});
    
	Courses.find(function(err,course){
		if(err)
			console.log(err);
		res.render('users', {courses:course});	
	})
    
});

// tonen van juiste users in het overzicht op basis van geselecteerde course en input van (deel van) de naam
router.post('/users', function(req, res, next){ 
        var partName = req.body.partName;
        var course = req.body.option;
    
		if( partName==undefined || partName==""){
            console.log(partName);
            if (course=='All'){
                
                Account.find({role:'Student'}, function(err,result){
                    if(err){
                        console.log(err)
                    }
                    res.send(result);
                });	
                
            } else {
                
                Account.find({courses:course}, function(err,result){
                    if(err){
                        console.log(err)
                    }			
                    res.send(result);
                });
            }
		} else {
            
            var firstletter = partName.charAt(0);
            var uppercaseletter = firstletter.toUpperCase();
            var cutName = partName.substr(1,partName.length-1);
            var newName = uppercaseletter.concat(cutName);

            if (course=='All'){
                Account.find({role:'Student',name:{$in:[new RegExp(".*"+partName+".*"),new RegExp(".*"+newName+".*")]}}, function(err,result){
                    if(err){
                        console.log(err)
                    }
                    res.send(result);
                });	
                
            } else {
                
                Account.find({courses:course,name:{$in:[new RegExp(".*"+partName+".*"),new RegExp(".*"+newName+".*")]}}, function(err,result){
                    if(err){
                        console.log(err)
                    }
                    res.send(result);
                });
                
            }
		}
   	
});

// profielpagina van bepaald id ophalen op basis van user data
router.get('/profile/:id', function(req, res, next){
	if(req.user.role=='Student'){
		res.redirect('/profile/'+req.user.id);
	}
	var id = req.params.id;
	
	Account.findOne({_id: id}, function(err,user){
        
        if(err){
            console.log(err)
        }
        
		var name = user.name;
		var photo = user.profilepic;
		var courses = user.courses;
		var date = user.date;
        var demo = user.demo;
        var die = user.die;
        var total = demo + die;
        var demoPercentage = demo / total * 100;
        var diePercentage = die / total *100;
        demoPercentage = Math.round(demoPercentage);
		diePercentage = Math.round(diePercentage);
        
        if (demo == 0 && die == 0) {
            
            demoPercentage = 50;
            diePercentage = 50;
            var message = "You have not been on stage yet";
            
        } else {
            
            if (demoPercentage >= diePercentage) {
                var message = demoPercentage + "% demo";
            } else {
                var message = diePercentage + "% die";
            }            
        }
        
		if (date==""){
			date="No data";
        }
        
		if(courses !=null){
            var modifiedCourses = "";
            for(i=0; i<courses.length; i++){
                if(i>0){
                    modifiedCourses = modifiedCourses.concat(", "+courses[i]);
                } else {
                    modifiedCourses = modifiedCourses.concat(courses[i]);
                }
            }
		}
        
    	var photoUser = photo.substring(0, photo.indexOf('?'));
        
		res.render('profile', {name: name, photo:photoUser,courses:modifiedCourses, date: date, demo: demoPercentage, die: diePercentage, message: message });
        
	});
});

// tonen van resultaat van votes van bepaalde user
router.get('/endvoting/profile/:id', function(req, res, next){
    
	if(req.user.role=='Student'){
		res.redirect('/profile/'+req.user.id);
	}
    
	var id = req.params.id;
	
	Account.findOne({_id: id}, function(err,user){
        
        if(err){
            console.log(err)
        }
        
		var name = user.name;
		var photo = user.profilepic;
		var courses = user.courses;
		var modifiedCourses = "";
		var date = "Now on stage";
		var demo = user.demo;
        var die = user.die;
        var total = demo + die;
        var demoPercentage = demo / total * 100;
        var diePercentage = die / total *100;
        demoPercentage = Math.round(demoPercentage);
		diePercentage = Math.round(diePercentage);
        
        if (demo == 0 && die == 0) {
            
            demoPercentage = 50;
            diePercentage = 50;
            var message = "You have not been on stage yet";
            
        } else {
            
            if (demoPercentage >= diePercentage) {
                var message = demoPercentage + "% demo";
            } else {
                var message = diePercentage + "% die";
            }
            
        }
        
		if(courses!=null){
            for(i=0; i<courses.length; i++){
                if(i>0){
                    modifiedCourses = modifiedCourses.concat(", "+courses[i]);
                } else {
                    modifiedCourses = modifiedCourses.concat(courses[i]);
                }
            }
		}
        
    	var photoUser = photo.substring(0, photo.indexOf('?'));
        
		res.render('endvoting', {name: name, photo:photoUser,courses:modifiedCourses, date: date, demo: demoPercentage, die: diePercentage, message: message })
        
	});
});

// verzenden van data votes naar accounts collection
router.post('/endvoting/profile/:id', function(req, res, next){
    
	var id = req.params.id;
	var demo = parseInt(req.body.voteDemo);
	var die = parseInt(req.body.voteDie);
	var date = new Date();
	var day = date.getDay()+7;
	var month = date.getMonth()+1;
	var year = date.getFullYear();
	var newdate = day+"/"+month+"/"+year;
	console.log(demo+", "+die);
    if (demo == null)
		{
			demo=0;
		}
	if(die == null){
		die=0;
	}
	if(req.body.vote=="demo"){
		demo+=1;
	} else {
		die+=1;
	};
    
	demo = demo.toString();
    die = die.toString();
	res.send(demo+"/"+die);
    
	Account.update({_id:id}, {$set:{demo:demo, die:die, onStage:true, date:newdate}}, function(err, result) {
        
    if (err)
        console.log(err);
	});
    
});

module.exports = router;
