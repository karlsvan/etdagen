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
	  	function SearchCtrl() {
		    this.users = [
					{img: '/assets/images/icons/avatar.jpg', name: 'Winston Northman', usertype: 'student'},
					{img: '/assets/images/icons/avatar.jpg', name: 'Winston Eastman', usertype: 'student'},
					{img: '/assets/images/icons/avatar.jpg', name: 'Winston Westman', usertype: 'student'},
					{img: '/assets/images/icons/avatar.jpg', name: 'Winston Southman', usertype: 'student'},
					{img: '/assets/images/icons/avatar.jpg', name: 'hr Winston Southbeach', usertype: 'student'},
					{img: '/assets/images/icons/avatar.jpg', name: 'Northman Inc.', usertype: 'bedrift'},
					{img: '/assets/images/icons/avatar.jpg', name: 'Northman AS', usertype: 'bedrift'},
					{img: '/assets/images/icons/avatar.jpg', name: 'Winston Company', usertype: 'bedrift'}
				]
		}
		SearchCtrl.$inject = [];
})();
