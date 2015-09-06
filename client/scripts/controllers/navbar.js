'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
	.controller('NavbarCtrl', ['AuthService', function (AuthService) {
		this.logout = AuthService.logout;
	}]);
    
