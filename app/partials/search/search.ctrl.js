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
	  .filter('filterTags', filterTags)
	  .filter('filterType', filterType);

	angular.module('etApp')
		/*@ngInject*/
		function SearchCtrl(SearchService,$scope,$state) {
			var self = this;
			this.users = [];

			this.update = function(){
				SearchService.update(function(users){
					self.users = users;
				});

			};

			self.update();

			this.removeTags = function() {
				self.searchOptions.selectedTags = [];
			}

			this.getUrl = function(id) {
				 alert($state.href('user', {id:id}));
			}

			this.searchOptions = {
				searchString: '',
				companies: true,
				students: true,
				tags: true,
				selectedTags: []
			};


		}
		SearchCtrl.$inject = ['SearchService', '$scope', '$state'];

		function filterTags(){
			return function(users, selectedTags) {
				if(selectedTags.length == 0) {return users}
        		return users.filter(function(user) {
		            return selectedTags.every(function(element){
		            	if (!user.tags){return false}
		                if (user.tags.indexOf(element) != -1) {
		                    return true;
		                } else {
		                	return false;
		                }
		            })
        		});
    		};
		}

		function filterType() {
			return function(users,types) {
				return users.filter(function(user) {
	                if (types.indexOf(user.usertype) != -1) {
	                    return true;
	                }
				})
			}
		}
})();
