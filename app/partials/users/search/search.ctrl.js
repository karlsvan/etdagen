(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:SearchCtrl
	 * @description
	 * # SearchCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('SearchCtrl', SearchCtrl);

		/*@ngInject*/
	  	function SearchCtrl($scope) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
		}
		SearchCtrl.$inject = ['$scope'];
})();
