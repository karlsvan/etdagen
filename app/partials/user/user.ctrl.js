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
		function userCtrl($stateParams, $scope, $state, SearchService){

			$scope.$on('$stateChangeSuccess',
		    	function(event, toState, toParams, fromState, fromParams){
		    		if(toState.name == "user"){
			    		SearchService.getProfile(toParams.id, function(res) {
			    			console.log(res);
		    				$scope.user = res; 
		    			});
		    		}
		    	});

			

		}
		userCtrl.$inject = ['$stateParams', '$scope', '$state', 'SearchService'];
})();
