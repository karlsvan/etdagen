(function(){
	'use strict';


	angular.module('etApp')
	  .controller('TagController', TagController)
		.directive('etTags',etTags);

	  	function TagController($http,$scope){
	  		var self = this;

		    self.readonly = false;
		    self.selectedItem = null;
		    self.searchText = null;
		    self.querySearch = querySearch;
		    getTags();
		    self.selectedTags = [];
		    self.numberBuffer = '';
		    self.autocompleteDemoRequireMatch = false;
		    self.transformChip = transformChip;
		    self.names = $scope.selectedTags;

		    $scope.removeChip = function(index) {
		    	self.names.splice(index,1);
		    }
		    /**
		     * Return the proper object when the append is called.
		     */
		    function transformChip(chip) {
		    	//$scope.selectedTags.push(chip);
		      // If it is an object, it's already a known chip
		      if (angular.isObject(chip)) {
		      	self.names.push(chip.navn);
		        return chip;
		      }

		      // Otherwise, create a new one
		      self.names.push(chip);
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

			function getTags(callback) {
				$http.get('/tags').then(function(res) {
					//console.log(res.data);
					self.tags = res.data.map(function (tag) {
		        		tag._lowername = tag.navn.toLowerCase();
		        		tag._lowertype = 'old';
		        		return tag;
		      		});
				}, function(res) {
					console.log('getTags error: '+res.data);
				});
			}
	  	}

		TagController.$inject = ['$http', '$scope'];

	  	function etTags() {
	  		return {
	  			restrict: 'AEC',
	  			replace: false,
	  			scope: {
	  				requirematch: '=',
	  				selectedTags: '=selectedTags'
	  			},
    			templateUrl: './components/tags/et-tags.html',
    			controller: 'TagController as TagController'
  			};
	  	}

		
})();