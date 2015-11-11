(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:RegisterCtrl
	 * @description
	 * # RegisterCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
		.controller('RegisterCtrl', RegisterCtrl);

	  	/*@ngInject*/
	  	function RegisterCtrl($scope, $http, $state) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
		    $http.get('/api/user').then(function(res) {
    			$scope.user = res.data;
  			}, function() {
  				$scope.user = {fornavn: 'error'};
  			});

  			$scope.register = function() {
  				$http.post('/register', $scope.registerForm).then(function sucsessCB(response) {
  					$state.go('home');
  				});

  			}
		}
		RegisterCtrl.$inject = ['$scope', '$http', '$state'];
})();