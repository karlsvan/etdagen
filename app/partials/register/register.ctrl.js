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
		    		$scope.user = UserService.returnUser();
		    	});

  			$scope.register = function() {
  				UserService.register($scope.registerForm)
  			}
		}
		RegisterCtrl.$inject = ['$scope', 'UserService'];
})();