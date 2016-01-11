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

			var self = this;

		    self.readonly = false;
		    self.selectedItem = null;
		    self.searchText = null;
		    self.querySearch = querySearch;
		    loadTags();
		    self.selectedTags = [];
		    self.numberBuffer = '';
		    self.autocompleteDemoRequireMatch = false;
		    self.transformChip = transformChip;

		    /**
		     * Return the proper object when the append is called.
		     */
		    function transformChip(chip) {
		      // If it is an object, it's already a known chip
		      if (angular.isObject(chip)) {
		        return chip;
		      }

		      // Otherwise, create a new one
		      return { navn: chip, type: 'new' }
		    }

		    /**
		     * Search for vegetables.
		     */
		    function querySearch (query) {
		      var results = query ? self.tags.filter(createFilterFor(query)) : [];
		      return results;
		    }

		    /**
		     * Create filter function for a query string
		     */
		    function createFilterFor(query) {
		      var lowercaseQuery = angular.lowercase(query);

		      return function filterFn(tag) {
		        return (tag._lowername.indexOf(lowercaseQuery) === 0);
		      };

		    }

		    function loadTags() {
		      SearchService.getTags(function(taggies){
		      	console.log(taggies);
		      	self.tags = taggies.map(function (tag) {
		        	tag._lowername = tag.navn.toLowerCase();
		        	tag._lowertype = 'old';
		        	return tag;
		      	});
		      });

		    }

		}
		SearchCtrl.$inject = ['SearchService'];
})();
