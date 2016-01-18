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
		function NavbarCtrl($scope, UserService) {
			var self = this;
			$scope.loggedIn = 0;
			self.username= '';
			UserService.init(function(user,loggedIn,error){
				$scope.loggedIn = loggedIn;
				if (!error) {
					self.username = user.fornavn;
					self.id = user.id;
				}
			});

			$scope.$on('$stateChangeStart', function(/*event, toState, toParams, fromState, fromParams*/){
				if (UserService.getLoggedIn()){
						$scope.loggedIn = true;
						var user = UserService.returnUser();
						self.username = user.fornavn;
						self.id = user.id;
				}
			});
			$scope.logout = function() {
				UserService.logout();
				$scope.loggedIn=0;
			};

			this.links = {
				main: [
					{ state: 'home', icon: 'fa-newspaper-o', name: 'Hjem' },
					{ state: 'about', icon: 'fa-info', name: 'Informasjon' },
					{ state: 'companies', icon: 'fa-building-o', name: 'Bedrifter' },
					{ state: 'contact', icon: 'fa-users', name: 'Kontakt' }
				],
				side: [
					{ state: 'login', icon: 'fa-sign-in', name: 'Logg inn' },
					{ state: 'user', icon: 'fa-cog', name: 'Brukernavn'/*self.username*/ },
					{ state: 'menu', icon: 'fa-bars', name: 'Meny' }
				]
			};

		}
		NavbarCtrl.$inject = ['$scope', 'UserService'];
})();
