(function(){
	'use strict';

	/*
	*	@ngdoc function
	*	@name etApp.directive:navbar
	*	@description
	*	# Components
	*	Components for the etApp
	*/
	angular.module('etApp').directive('navbar', function(){
	    return {
	        restrict: 'E',
	        replace: true,
	        templateUrl: './components/navbar/navbar.tmpl.html',
	        controller: 'NavbarCtrl as navbar'
	    }
	});

})();