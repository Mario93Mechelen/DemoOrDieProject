var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
	name:String,
	profilepic:String,
	courses: Array
});

module.exports = mongoose.model('Account', Account);