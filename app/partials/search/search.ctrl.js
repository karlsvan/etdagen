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
		function SearchCtrl(SearchService) {
			var self = this;
			this.users = [];
			this.update = function(){
				SearchService.update(self.searchOptions.searchString, null, function(users){
					self.users = users;
				});
			};

			this.searchOptions = {
				searchString: '',
				companies: true,
				students: true,
				tags: true,
			};


		}
		SearchCtrl.$inject = ['SearchService'];
})();
