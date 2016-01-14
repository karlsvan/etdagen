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
	  	function LoginCtrl($state, UserService,$scope) {
	  		var self = this;
	  		self.error = {};
	    	this.login = function(credentials) {
			    UserService.login(credentials,function() {
			    	self.error.nameOrPass = true;
			    	$scope.credentials.username = '';
			    	$scope.credentials.password = '';
			    });
	      	};

		    this.adduser = function() {
		    	$state.go('register');
			};

	    }


	    LoginCtrl.$inject = ['$state', 'UserService','$scope'];
})();
