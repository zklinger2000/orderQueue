var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
	date : {type : Date, default: Date.now()},
	crew : {type : String, default: ''},
	custName : {type : String, default: ''},
	address : {type : String, default: ''},
	total : {type : Number, default: 0},
	confirm : {type : String, default: 0},
	notes : {type : String, default: ''}
});
