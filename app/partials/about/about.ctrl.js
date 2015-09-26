(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:AboutCtrl
	 * @description
	 * # AboutCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('AboutCtrl', AboutCtrl);

		/*@ngInject*/
	  	function AboutCtrl($scope) {
		    $scope.awesomeThings = [
		      'HTML5 Boilerplate',
		      'AngularJS',
		      'Karma'
		    ];
		}

})();