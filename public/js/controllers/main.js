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

	// a filter that returns the totals of all jobs by day for a single crew
	.filter('getCrewTotal', function() {
		// when using ng-repeat, the input that gets passed is each item in the list
		return function(input, crew) {
			//create an integer for total amount
			var total = 0;
			//use Angular's forEach to loop through each item.  'job' here can be called
			//anything because it is just the callback item variable name
			angular.forEach(input, function(job) {
				if (job.crew == crew) total = total + job.total;;
			})
			return total;
		}
	})

	// inject the Order service factory into our controller
	.controller('mainController', ['$scope','$filter','$http','Orders', function($scope, $filter, $http, Orders) {
		$scope.formData = {};
		$scope.formData.crews = [{ foreman : 'Ken'}, { foreman : 'Gary'}, { foreman : 'Jim'}, { foreman : 'David'}];
		$scope.formData.date = $filter("date")(Date.now(), 'yyyy-MM-dd');

		$scope.loading = true;

		// when landing on the page, get all orders and show them
		Orders.getByDate($scope.formData.date)
			.success(function(data) {
				$scope.orders = data;
				$scope.loading = false;
			});

		// get the count of jobs by crew for the Date in datePicker
		$scope.getTotalByCrew = function(crew) {

			Orders.getByDateAndCrew($scope.formData.date, crew)
				.success(function(data) {
					console.log('data.length for total = ' + data.length);
					$scope.total = data.length;
				});
			//return 0;
			//return 5;
		};

		// GET BY DATE & CREW ======================================================
		// get all orders by date
		$scope.getOrderRankByDateAndCrew = function(crew) {
			$scope.loading = true;

			Orders.getByDateAndCrew($scope.formData.date, crew)
				.success(function(data) {
					console.log('data.length = ' + data.length);
					$scope.formData.rank = data.length + 1;
					$scope.loading = false;
				});
		};

		// GET BY DATE =============================================================
		// when landing on the page, get all orders and show them
		// get all orders by date
		$scope.getOrdersByDate = function() {
			$scope.loading = true;

			Orders.getByDate($scope.formData.date)
				.success(function(data) {
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
			// let Rank field be blank
			if ($scope.formData.rank == undefined) {
				$scope.formData.rank = 1;
			}
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.custName != undefined) {
				$scope.loading = true;


				// call the create function from our service (returns a promise object)
				Orders.create($scope.formData)

					// if successful creation, call our get function to get all the new orders
					.success(function(data) {
						// clear the form so our user is ready to enter another
						$scope.formData.custName = '';
						$scope.formData.address = '';
						$scope.formData.total = undefined;
						$scope.formData.confirm = undefined;
						$scope.formData.notes = '';
						$scope.orders = data; // assign our new list of orders
						$scope.loading = false;
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
					$scope.orders = data; // assign our new list of orders
					$scope.loading = false;
				});
		};

		// MOVE UP RANK ============================================================
		// 
		$scope.moveOrderUpRank = function(id, date) {
			console.log('moveOrderUpRank CALLED');// log message
			$scope.loading = true;

			Orders.moveUpRank(id, date)
				// if id is found, call our get function to update the orders
				.success(function(data) {
					$scope.orders = data; // assign our new list of orders
					$scope.loading = false;
				});
		};
	}]);
