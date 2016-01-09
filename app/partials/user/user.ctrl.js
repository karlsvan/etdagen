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
		function userCtrl($stateParams, $scope, allowedUsers, $state, SearchService){/*
			var index = allowedUsers.indexOf($stateParams.username);
			if (index > -1) $scope.username = $stateParams.username;
			else $state.go('home');*/

			$scope.$on('$stateChangeSuccess',
		    	function(event, toState, toParams, fromState, fromParams){
		    		if(toState.name == "user"){
			    		SearchService.getProfile(toParams.id, function(res) {
		    				alert(JSON.stringify(res))
		    			});
		    		}
		    	});

		}
		userCtrl.$inject = ['$stateParams', '$scope', 'allowedUsers', '$state', 'SearchService'];
})();
