var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Courses = new Schema({
	course: String
});

module.exports = mongoose.model('Courses', Courses);