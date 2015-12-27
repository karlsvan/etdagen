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
		function userCtrl($stateParams, $scope, allowedUsers, $state){
			var index = allowedUsers.indexOf($stateParams.username);
			if (index > -1) $scope.username = $stateParams.username;
			else $state.go('home');
		}
		userCtrl.$inject = ['$stateParams', '$scope', 'allowedUsers', '$state'];
})();
