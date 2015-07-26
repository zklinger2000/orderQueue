var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name : {type : String, default: ''},
	crews : [],
	dateCreated : {type : Date, default: Date.now()}
});
