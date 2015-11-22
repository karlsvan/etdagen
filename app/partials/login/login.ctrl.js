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
	  	function LoginCtrl($http, $state, UserService) {

	    	this.login = function(credentials) {
			    UserService.login(credentials);
	      	};

		    this.adduser = function() {
		    	$state.go('register');
			};

	    	this.facebook = function() {
	    		UserService.facebook();
	    	}

	    }


	    LoginCtrl.$inject = ['$http', '$state','UserService'];
})();
