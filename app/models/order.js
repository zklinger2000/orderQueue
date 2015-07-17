var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
	custName : {type : String, default: ''},
	address : {type : String, default: ''},
	amount : {type : Number, default: 0},
	custNotes : {type : String, default: ''}
});
