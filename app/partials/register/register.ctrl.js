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
	  	function RegisterCtrl($scope) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
		}
		RegisterCtrl.$inject = ['$scope'];
})();