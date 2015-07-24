angular.module('orderService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Orders', ['$http',function($http) {
		return {
			get : function() {
				console.log("*** services/orders/ get() ***" + Date.now());
				return $http.get('/api/orders');
			},
			create : function(orderData) {
				return $http.post('/api/orders', orderData);
			},
			delete : function(id) {
				return $http.delete('/api/orders/' + id);
			},
			getByDate : function(date) {
				console.log("*** services/orders/ getByDate(date) ***" + Date.now());
				return $http.get('/api/orders/' + date);
			}
		}
	}]);
