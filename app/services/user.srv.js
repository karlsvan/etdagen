(function(){
	'use strict';

	
	angular.module('etApp')
	  .factory('UserService', UserService);
	  	function UserService($http,$state) {
			var loggedIn = 0;
			var user;

			var getUser = function(cb) {
				$http.get('/api/user').then(function(res) {
					loggedIn = 1;
	    			user = res.data;
	    			if (cb) {
	    				cb(user,loggedIn,0);
	    			};
	  			}, function(res) {
					cb(null,0,res.data);
	  			});
			};

			return {

			returnUser : function() {
				return user;
			},

			getLoggedIn : function() {
				return loggedIn
			},

			init : function(cb) {
				getUser(function() {
					cb(user,loggedIn,error);
				})
				/*
				$http.get('/api/user').then(function successCB(res) {
					loggedIn = 1;
	    			user = res.data;
	    			if (cb) {
	    				cb(user,loggedIn);
	    			};
	  			}, function errorCB(res) {
	  				loggedIn = 0;
	  				user = null;
	  				cb(user,loggedIn,res.data);
	  			});*/
			},

			login : function(credentials) {
		  		$http.post('/login', credentials).then(function successCB(res) {
		  				getUser(function(user,loggedIn,error) {
			  				loggedIn = 1;
				      		$state.go('register');
			      		});
			      	},function errorCB(res) {
			      		$state.reload('login');
			      	});
		  	},

		  	facebook : function() {
		  		$http.get('/auth/facebook').then(function successCB() {
		    			$state.go('register');
			      	},function errorCB(res) {
			      		$state.reload('login');
		    		});
		  	},

		  	register : function(cred) {
		  		$http.post('/register', cred).then(function sucsessCB(response) {
  					$state.go('home');
  				});
		  	},

	  		logout : function() {
	  			loggedIn = 0;
	  			user = null;
				$http.get('/logout').then(function successCB(res) {
	    			$state.go('home');
		      	},function errorCB(res) {
		      		$state.reload('login');
	    		});
			}

			};

		};

	UserService.$inject = ['$http', '$state'];
})()



