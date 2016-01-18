(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:userCtrl
	 * @description
	 * # userCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('userCtrl', userCtrl);

		/*@ngInject*/
		function userCtrl($scope, $state, UserService){

			$scope.$on('$stateChangeSuccess',
		    	function(event, toState, toParams, fromState, fromParams){
		    		if(toState.name == "user"){
			    		UserService.getProfile(toParams.id, function(res) {
			    			//console.log(res);
		    				$scope.user = res; 
		    			});
		    		}
		    	});

			

		}
		userCtrl.$inject = ['$scope', '$state', 'UserService'];
})();
