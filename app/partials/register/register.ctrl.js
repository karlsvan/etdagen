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
	  	function RegisterCtrl($scope, $http, $state, UserService) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];

		    $scope.$on('$stateChangeSuccess',
		    	function(event, toState, toParams, fromState, fromParams){
		    		$scope.user = UserService.returnUser();
		    	})

  			$scope.register = function() {
  				$http.post('/register', $scope.registerForm).then(function sucsessCB(response) {
  					$state.go('home');
  				});

  			}
		}
		RegisterCtrl.$inject = ['$scope', '$http', '$state', 'UserService'];
})();