(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:ProfileCtrl
	 * @description
	 * # ProfileCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('ProfileCtrl', ProfileCtrl);

		/*@ngInject*/
	  	function ProfileCtrl($scope,UserService,$state) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];

		    $scope.$on('$stateChangeSuccess',
		    	function(event, toState, toParams, fromState, fromParams){
		    		UserService.init(function(user,loggedIn,error) {
		    			if (loggedIn) {
		    				$scope.user = user;
		    			} else {
		    				$state.go('login');
		    			}
						
						});
		    	});

		    
		}
		ProfileCtrl.$inject = ['$scope', 'UserService', '$state'];
})();
