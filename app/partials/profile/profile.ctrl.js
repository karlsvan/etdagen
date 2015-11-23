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
	  	function ProfileCtrl($scope) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
		}
		ProfileCtrl.$inject = ['$scope'];
})();
