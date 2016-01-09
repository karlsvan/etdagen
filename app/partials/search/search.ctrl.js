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

			// this.users = [
			// 		{img: '/assets/images/avatar.jpg', name: 'Eric Northman', usertype: 'student'},
			// 		{img: '/assets/images/avatar.jpg', name: 'Winston Eastman', usertype: 'student'},
			// 		{img: '/assets/images/avatar.jpg', name: 'Kanye Westman', usertype: 'student'},
			// 		{img: '/assets/images/avatar.jpg', name: 'Charlie Southman', usertype: 'student'},
			// 		{img: '/assets/images/avatar.jpg', name: 'hr Winston Southbeach', usertype: 'student'},
			// 		{img: '/assets/images/avatar.jpg', name: 'Noshow Inc.', usertype: 'bedrift'},
			// 		{img: '/assets/images/avatar.jpg', name: 'Northman AS', usertype: 'bedrift'},
			// 		{img: '/assets/images/avatar.jpg', name: 'Winston Company', usertype: 'bedrift'}
			// 	];
			this.searchOptions = {
				searchString: '',
				companies: true,
				students: true
			};
		}
		SearchCtrl.$inject = ['SearchService'];
})();
