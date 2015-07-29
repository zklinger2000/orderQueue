angular.module('orderService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Orders', ['$http',function($http) {
		return {
			get : function() {
console.log("*** services/orders/ get() ***");
				return $http.get('/api/orders');
			},
			create : function(orderData) {
				return $http.post('/api/orders', orderData);
			},
			delete : function(id, date) {
				return $http.delete('/api/orders/' + id + '/' + date);
			},
			getByDate : function(date) {
console.log("*** services/orders/ getByDate(date) ***");
				return $http.get('/api/orders/' + date);
			},
			getByDateAndCrew : function(date, crew) {
console.log("** services/orders/ getByDateAndCrew(" + date + ", " + crew + ") **");
				return $http.get('/api/orders/' + date + '/' + crew);
			},
			moveUpRank: function(id, date) {
console.log("*** services/orders/ moveUpRank(" + id + ", " + date + ") ***");
				return $http.get('/api/orders/rank/' + id + '/' + date);
			}
		}
	}]);
