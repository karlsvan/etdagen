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
	  .controller('SearchCtrl', SearchCtrl)
	  .filter('filterTags', filterTags);

		/*@ngInject*/
		function SearchCtrl(SearchService,$scope) {
			var self = this;
			this.users = [];
			this.update = function(){
				SearchService.update(self.searchOptions.searchString, null, function(users){
					self.users = users;
				});

			};

			this.removeTags = function() {
				self.searchOptions.selectedTags = [];
			}

			this.searchOptions = {
				searchString: '',
				companies: true,
				students: true,
				tags: true,
				selectedTags: []
			};


		}
		SearchCtrl.$inject = ['SearchService', '$scope'];

		function filterTags(){
			return function(users, selectedTags) {
				if(selectedTags.length == 0) {return users}
        		return users.filter(function(user) {

		            for (var i in user.tags) {
		                if (selectedTags.indexOf(user.tags[i]) != -1) {
		                    return true;
		                }
		            }
            	return false;

        		});
    		};
		}
})();
