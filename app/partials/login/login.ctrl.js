(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:LoginCtrl
	 * @description
	 * # LoginCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('LoginCtrl', LoginCtrl);

	  	/*@ngInject*/
	  	function LoginCtrl($window, $state, UserService) {

	    	this.login = function(credentials) {
			    UserService.login(credentials);
	      	};

		    this.adduser = function() {
		    	$state.go('register');
			};

	    }


	    LoginCtrl.$inject = ['$window', '$state', 'UserService'];
})();
