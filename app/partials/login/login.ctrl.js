(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:LoginCtrl
	 * @description
	 * # LoginCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('LoginCtrl', LoginCtrl);

	  	/*@ngInject*/
	  	function LoginCtrl($scope, $http, $state) {
	      $scope.login = function(credentials) {
	      	$http.post('/login', credentials).then(function() {
	      		$state.go('register');
	      	});
	      };
	    }
	    LoginCtrl.$inject = ['$scope', '$http', '$state'];
})();