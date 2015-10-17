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
	  	function LoginCtrl(AuthService) {
	      this.login = AuthService.login;
	    }
	    LoginCtrl.$inject = ['AuthService'];
})();