(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:NavbarCtrl
	 * @description
	 * # NavbarCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
		.controller('NavbarCtrl', NavbarCtrl);

		/*@ngInject*/
		function NavbarCtrl($scope) {
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


		}
		NavbarCtrl.$inject = ['$scope'];
})();