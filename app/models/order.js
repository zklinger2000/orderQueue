var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
	crew : {type : String, default: ''},
	custName : {type : String, default: ''},
	address : {type : String, default: ''},
	total : {type : Number, default: 0},
	notes : {type : String, default: ''}
});
