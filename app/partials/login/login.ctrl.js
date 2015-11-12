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
	  	function LoginCtrl($http, $state) {

	    	this.login = function(credentials) {
		      	$http.post('/login', credentials).then(function successCB(res) {
		      		$state.go('register');
		      	},function errorCB(res) {
		      		$state.reload('login');
		      	});
	      	};

		    this.adduser = function() {
		    	$state.go('register');
			};

	    	this.facebook = function() {
	    		$http.get('/auth/facebook').then(function successCB() {
	    			$state.go('register');
		      	},function errorCB(res) {
		      		$state.reload('login');
	    		})
	    	}

	    }


	    LoginCtrl.$inject = ['$http', '$state'];
})();
