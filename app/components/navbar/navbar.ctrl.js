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
			$scope.loggedIn = 0;
			var username;
			UserService.init(function(user,loggedIn,error){
				$scope.loggedIn = loggedIn;
				if (!error) {
					username = user.username || user.fornavn;
				};
			});

			$scope.$on('$stateChangeStart',
		    	function(event, toState, toParams, fromState, fromParams){
		    		if (UserService.getLoggedIn()){
		    			username = UserService.returnUser().username || UserService.returnUser().fornavn;
		    			$scope.loggedIn = UserService.getLoggedIn();
		    		}
		    	})
			
			$scope.logout = function() {
				UserService.logout();
				$scope.loggedIn=0;
			}

			this.links = {
				main: [
					{ state: 'home', icon: 'fa-newspaper-o', name: 'Hjem' },
					{ state: 'about', icon: 'fa-info', name: 'Informasjon' },
					{ state: 'companies', icon: 'fa-building-o', name: 'Bedrifter' },
					{ state: 'contact', icon: 'fa-users', name: 'Kontakt' }

				],
				side: [
					{ state: 'login', icon: 'fa-sign-in', name: function() {return 'Logg inn'} },
					{ state: 'user', icon: 'fa-cog', name: function() { return username }},
					{ state: 'menu', icon: 'fa-bars', name: 'Meny' }
				]
			};

		}
		NavbarCtrl.$inject = ['$scope', 'UserService'];
})();
