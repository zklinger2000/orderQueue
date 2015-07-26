var Order = require('./models/order');

//============================================================================
function getOrders(res){
//============================================================================
	console.log("*** app/routes.js getOrders(res) *** " + Date.now());
	Order.find(function(err, orders) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(orders); // return all orders in JSON format
		});
};

//============================================================================
function getOrdersByDate(date, res){
//============================================================================
	console.log("*** app/routes.js getOrdersByDate(" + date + ", res) *** " + Date.now());
	Order.find({
		//"date": {"$gt": new Date(2015, 6, 19), "$lt": new Date(2015, 6, 20)}
		//"date" : {"$lt": req.params.order_date}
		"date" : date
	}, function(err, orders) {
		if (err)
			res.send(err);

		res.json(orders); // return all orders in JSON format
	})
};

//============================================================================
function getOrdersByDateAndCrew(date, crew, res){
//============================================================================
	console.log("*** app/routes.js getOrdersByDateAndCrew(" + date + ", " + crew + ", res) *** " + Date.now());
	Order.find({
		//"date": {"$gt": new Date(2015, 6, 19), "$lt": new Date(2015, 6, 20)}
		//"date" : {"$lt": req.params.order_date}
		"date" : date,
		"crew" : crew
	}, function(err, orders) {
		if (err)
			res.send(err);

		res.json(orders); // return all orders in JSON format
	})
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all orders
	app.get('/api/orders', function(req, res) {
		console.log("*** app/routes.js app.get('/api/orders')  *** " + Date.now());
		// use mongoose to get all orders in the database
		getOrders(res);
	});

	// create order and send back all orders after creation
	app.post('/api/orders', function(req, res) {

		// create an order, information comes from AJAX request from Angular
		Order.create({
			date : req.body.date,
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
			getOrdersByDate(req.body.date, res);
			//getOrdersByDate(req, res);
			//getOrders(res);
		});

	});

	// retrieve orders by date and crew
	app.get('/api/orders/:order_date/:order_crew', function(req, res) {
		console.log("*** app/routes.js app.get('/api/orders/:order_date/:order_crew')  ***" + req.params.order_date + " " + req.params.order_crew);
		getOrdersByDateAndCrew(req.params.order_date, req.params.order_crew, res);
	});

	// retrieve orders by date
	app.get('/api/orders/:order_date', function(req, res) {
		console.log("*** app/routes.js app.get('/api/orders/:order_date')  ***" + req.params.order_date);
		/*
		Order.find({
			//"date": {"$gt": new Date(2015, 6, 19), "$lt": new Date(2015, 6, 20)}
			//"date" : {"$lt": req.params.order_date}
			"date" : req.params.order_date
		}, function(err, orders) {
			if (err)
				res.send(err);

			res.json(orders); // return all orders in JSON format
		})
		*/
		getOrdersByDate(req.params.order_date, res);
	});

	// delete an order
	app.delete('/api/orders/:order_id/:order_date', function(req, res) {
		Order.remove({
			_id : req.params.order_id
		}, function(err, order) {
			if (err)
				res.send(err);
			console.log(res);
			getOrdersByDate(req.params.order_date, res);
			//getOrdersByDate(req, res);
			//getOrders(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};
