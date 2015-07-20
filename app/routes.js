var Order = require('./models/order');

function getOrders(res){
	Order.find(function(err, orders) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(orders); // return all orders in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all orders
	app.get('/api/orders', function(req, res) {

		// use mongoose to get all orders in the database
		getOrders(res);
	});

	// create order and send back all orders after creation
	app.post('/api/orders', function(req, res) {

		// create an order, information comes from AJAX request from Angular
		Order.create({
			crew : req.body.crew,
			custName : req.body.custName,
			address: req.body.address,
			total : req.body.total,
			confirm : req.body.confirm,
			notes : req.body.notes,
			done : false
		}, function(err, order) {
			if (err)
				res.send(err);

			// get and return all the orders after you create another
			getOrders(res);
		});

	});

	// delete an order
	app.delete('/api/orders/:order_id', function(req, res) {
		Order.remove({
			_id : req.params.order_id
		}, function(err, order) {
			if (err)
				res.send(err);

			getOrders(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
