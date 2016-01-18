(function(){
	'use strict';

	/*
	*	@ngdoc function
	*	@name etApp.directive:navbar
	*	@description
	*	# Components
	*	Components for the etApp
	*/
	angular.module('etApp')
		.directive('navbar', navbar);

		/*@ngInject*/
		function navbar(){
			return {
				restrict: 'E',
				replace: true,
				templateUrl: './components/navbar/navbar.tmpl.html',
				controller: 'NavbarCtrl as navbar'
			};
		}
		navbar.$inject = ['$window'];
})();
