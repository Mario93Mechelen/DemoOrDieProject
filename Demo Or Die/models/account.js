var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
	name:String,
	profilepic:String,
	courses: Array,
	role: String,
	demo:Number,
	die:Number,
	vote:Boolean,
	date:Date
});

module.exports = mongoose.model('Account', Account);