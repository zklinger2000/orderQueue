var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
	custName : {type : String, default: ''},
	custNotes : {type : String, default: ''}
});
