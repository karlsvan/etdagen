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
	  	function RegisterCtrl($scope,UserService) {

		    $scope.$on('$stateChangeSuccess',
		    	function(event, toState, toParams, fromState, fromParams){
		    		UserService.init(function(user,loggedIn,error) {
						$scope.loggedIn = loggedIn;
						$scope.user = user;
						});
		    	});

  			$scope.register = function() {
  				UserService.register($scope.registerForm,function(error){
  					$scope.error = error;
  				})
  			}
		}
		RegisterCtrl.$inject = ['$scope', 'UserService'];
})();