(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:BoardCtrl
	 * @description
	 * # BoardCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('BoardCtrl', BoardCtrl);

		/*@ngInject*/
	  	function BoardCtrl($scope) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
		}
})();