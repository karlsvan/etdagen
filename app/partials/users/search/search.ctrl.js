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
					{img: '/assets/images/avatar.jpg', name: 'Eric Northman', usertype: 'student'},
					{img: '/assets/images/avatar.jpg', name: 'Winston Eastman', usertype: 'student'},
					{img: '/assets/images/avatar.jpg', name: 'Kanye Westman', usertype: 'student'},
					{img: '/assets/images/avatar.jpg', name: 'Charlie Southman', usertype: 'student'},
					{img: '/assets/images/avatar.jpg', name: 'hr Winston Southbeach', usertype: 'student'},
					{img: '/assets/images/avatar.jpg', name: 'Noshow Inc.', usertype: 'bedrift'},
					{img: '/assets/images/avatar.jpg', name: 'Northman AS', usertype: 'bedrift'},
					{img: '/assets/images/avatar.jpg', name: 'Winston Company', usertype: 'bedrift'}
				]
				this.userField = '';
        this.fields = ('Alt Navn Epostadresser Hemmelig').split(' ').map(function (field) { return { fieldname: field }; });
		}
		SearchCtrl.$inject = [];
})();
