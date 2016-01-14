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
		function NavbarCtrl($scope,UserService,$state) {
			var self = this;
			$scope.loggedIn = 0;
			self.username= '';
			UserService.init(function(user,loggedIn,error){
				$scope.loggedIn = loggedIn;
				if (!error) {
					self.username = user.fornavn;
					self.id = user.id;
				};
			});

			this.openMenu = function($mdOpenMenu, ev) {
			    $mdOpenMenu(ev);
    		};

			$scope.$on('$stateChangeStart',
		    	function(event, toState, toParams, fromState, fromParams){
		    		if (UserService.getLoggedIn()){
		    			$scope.loggedIn = true;
		    			var user = UserService.returnUser();
		    			self.username = user.fornavn;
		    			self.id = user.id
		    		}
		    	})
			
			$scope.logout = function() {
				UserService.logout();
				$scope.loggedIn=0;
			}

			$scope.settings = function(){
				$state.go('settings')
			}

			$scope.user = function(){
				$state.go('user',{id:self.id})
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
		NavbarCtrl.$inject = ['$scope', 'UserService', '$state'];
})();
