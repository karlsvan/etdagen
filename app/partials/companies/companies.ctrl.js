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
	  	function CompaniesCtrl(CompaniesService) {
		    this.companies = CompaniesService.companies;
		}
		CompaniesCtrl.$inject = ['CompaniesService'];
})();
