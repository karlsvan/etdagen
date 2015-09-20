'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
	.controller('NavbarCtrl', ['$scope', function ($scope) {
		this.links = {
			main: [
				{ state: 'news', icon: 'fa-newspaper-o', name: 'Nyheter' },
				{ state: 'about', icon: 'fa-info', name: 'Rekrutteringsdagen' },
				{ state: 'companies', icon: 'fa-building-o', name: 'Bedrifter' },
				{ state: 'board', icon: 'fa-users', name: 'Styret' }

			],
			side: [
				{ state: 'login', icon: 'fa-sign-in', name: 'Logg inn' },
				{ state: 'user', icon: 'fa-cog', name: 'Brukernavn' },
				{ state: 'menu', icon: 'fa-bars', name: 'Meny' }
			]
		};


	}]);
