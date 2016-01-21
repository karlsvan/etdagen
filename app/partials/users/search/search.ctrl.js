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
	  		var boye = this;
	  		this.update = function() {
	  			SearchService.update(this.searchText,this.userField,function(users){
	  				boye.users = users;
	  			});
	  		};
			var avatar = '/assets/images/avatar.png';
		    this.users = [
					{img: avatar, name: 'Eric Northman', usertype: 'student'},
					{img: avatar, name: 'Winston Eastman', usertype: 'student'},
					{img: avatar, name: 'Kanye Westman', usertype: 'student'},
					{img: avatar, name: 'Charlie Southman', usertype: 'student'},
					{img: avatar, name: 'hr Winston Southbeach', usertype: 'student'},
					{img: avatar, name: 'Noshow Inc.', usertype: 'bedrift'},
					{img: avatar, name: 'Northman AS', usertype: 'bedrift'},
					{img: avatar, name: 'Winston Company', usertype: 'bedrift'}
				];

			this.userField = '';
			this.searchText = '';

        this.fields = ('Alt Navn Epostadresser Hemmelig').split(' ').map(function (field) { return { fieldname: field }; });
		}
		SearchCtrl.$inject = ['SearchService'];
})();
