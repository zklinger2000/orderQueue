angular.module('orderController', [])

	// a filter for the crew names
	.filter('byCrewName', function() {
		// when using ng-repeat, the input that gets passed is each item in the list
		return function(input, crew) {
			//create an empty array for output of items
			var out = [];
			//use Angular's forEach to loop through each item.  'job' here can be called
			//anything because it is just the callback item variable name
			angular.forEach(input, function(job) {
				if (job.crew == crew) out.push(job);
			})
			return out;
		}
	})

	// inject the Order service factory into our controller
	.controller('mainController', ['$scope','$filter','$http','Orders', function($scope, $filter, $http, Orders) {
		$scope.formData = {};
		$scope.formData.date = $filter("date")(Date.now(), 'yyyy-MM-dd');
		/*
		$scope.filterFn = function(crew) {
			if(formData.crew = crew) return true;
			return false;
		};
		*/

		/*
		// get the count of jobs by crew for the Date in datePicker
		$scope.getTotalByCrew = function(crew) {
			return Orders.getTotalByCrew(crew, $scope.formData.date);
		};
		*/

		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all orders and show them
		// use the service to get all the orders
		console.log("*** controllers/main/ Orders.getByDate($scope.formData.date) ***" + Date.now());
		Orders.getByDate($scope.formData.date)
		//Orders.get()
			.success(function(data) {
				//console.log("*** controllers/main/ Orders.getByDate($scope.dormData.date) ***");
				console.log("*** controllers/main/ Orders.getByDate().success ***" + Date.now());
				$scope.orders = data;
				$scope.loading = false;
			});

		// get all orders by date
		$scope.getOrdersByDate = function() {
			$scope.loading = true;

			console.log("*** controllers/main/ Orders.getByDate($scope.formData.date) ***" + Date.now());
			Orders.getByDate($scope.formData.date)
			//Orders.get()
				.success(function(data) {
					//console.log("*** controllers/main/ Orders.getByDate($scope.dormData.date) ***");
					console.log("*** controllers/main/ Orders.getByDate().success ***" + Date.now());
					$scope.orders = data;
					$scope.loading = false;
				});
		};

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrder = function() {
			
			// let Address field be blank
			if ($scope.formData.date == undefined) {
				$scope.formData.date = Date.now();
			}
			// let Address field be blank
			if ($scope.formData.crew == undefined) {
				$scope.formData.crew = '';
			}
			// let Address field be blank
			if ($scope.formData.address == undefined) {
				$scope.formData.address = '';
			}
			// let Notes field be blank
			if ($scope.formData.total === undefined) {
				$scope.formData.total = 0;
			}
			// let Notes field be blank
			if ($scope.formData.confirm == undefined) {
				$scope.formData.confirm = '';
			}
			// let Notes field be blank
			if ($scope.formData.notes == undefined) {
				$scope.formData.notes = '';
			}
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.custName != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Orders.create($scope.formData)

					// if successful creation, call our get function to get all the new orders
					.success(function(data) {
						$scope.loading = false;
						// clear the form so our user is ready to enter another
						$scope.formData.custName = '';
						$scope.formData.address = '';
						$scope.formData.total = undefined;
						$scope.formData.confirm = undefined;
						$scope.formData.notes = '';
						$scope.orders = data; // assign our new list of orders
					});
			}
		};

		// DELETE ==================================================================
		// delete an order after checking it
		$scope.deleteOrder = function(id, date) {
			$scope.loading = true;

			Orders.delete(id, date)
				// if successful creation, call our get function to get all the new orders
				.success(function(data) {
					$scope.loading = false;
					$scope.orders = data; // assign our new list of orders
				});
		};
	}]);
