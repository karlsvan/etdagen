(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:CompaniesCtrl
	 * @description
	 * # CompaniesCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('CompaniesCtrl', CompaniesCtrl);

		/*@ngInject*/
	  	function CompaniesCtrl($scope) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
		}
		CompaniesCtrl.$inject = ["$scope"];
})();