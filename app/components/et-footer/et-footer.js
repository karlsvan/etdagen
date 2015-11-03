(function(){
	'use strict';

	/*
	*	@ngdoc function
	*	@name etApp.directive:etFooter
	*	@description
	*	# Components
	*	Components for the etApp
	*/
	angular.module('etApp')
		.directive('etFooter', etFooter);

		/*@ngInject*/
		function etFooter(){
		    return {
		        restrict: 'E',
		        replace: true,
		        templateUrl: './components/et-footer/et-footer.tmpl.html',
		        controller: 'EtFooterCtrl as etFooter'
		    }
		}
})();
