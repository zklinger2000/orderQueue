angular.module('orderService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Orders', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/orders');
			},
			create : function(orderData) {
				return $http.post('/api/orders', orderData);
			},
			delete : function(id) {
				return $http.delete('/api/orders/' + id);
			}
		}
	}]);
