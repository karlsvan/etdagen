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
		function NavbarCtrl($scope,UserService) {
			
			var username = UserService.returnUser().username || 'LOL';
			$scope.loggedIn = UserService.getLoggedIn() || 0;

			$scope.$on('$stateChangeStart',
		    	function(event, toState, toParams, fromState, fromParams){
		    		if (UserService.getLoggedIn()){
		    			username = UserService.returnUser().username;
		    			$scope.loggedIn = UserService.getLoggedIn();
		    		}
		    	})
			


			this.links = {
				main: [
					{ state: 'home', icon: 'fa-newspaper-o', name: 'Hjem' },
					{ state: 'about', icon: 'fa-info', name: 'Informasjon' },
					{ state: 'companies', icon: 'fa-building-o', name: 'Bedrifter' },
					{ state: 'contact', icon: 'fa-users', name: 'Kontakt' }

				],
				side: [
					{ state: 'login', icon: 'fa-sign-in', name: function() {return 'Logg inn'} },
					{ state: 'user', icon: 'fa-cog', name: function() {return username} },
					{ state: 'menu', icon: 'fa-bars', name: 'Meny' }
				]
			};

		}
		NavbarCtrl.$inject = ['$scope', 'UserService'];
})();
