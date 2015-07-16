var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
	text : {type : String, default: ''}
});
