(function(){
	'use strict';

	
	angular.module('etApp')
	  .factory('UserService', UserService);
	  	function UserService($http,$state) {
			var loggedIn = 0;
			var user = {username:'testYo',fornavn:'karlyo'};

			var getUser = function(cb) {
				$http.get('/api/user').then(function(res) {
	    			user = res.data;
	    			cb()
	  			}, function(res) {
	  				alert('error: '+ res);
	  			});
			};

			return {

			returnUser : function(cb) {
				return user;
			},

			getLoggedIn : function() {
				return loggedIn
			},

			login : function(credentials) {
		  		$http.post('/login', credentials).then(function successCB(res) {
		  				getUser(function() {
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

	  		logout : function() {
				$http.get('/logout').then(function successCB() {
	    			$state.go('home');
		      	},function errorCB(res) {
		      		$state.reload('login');
	    		});
			}

			};

		// $rootScope.$on('$stateChangeSuccess',
		// function(event, toState, toParams, fromState, fromParams){
		// 	if(fromState.name == 'login' && toParams.user == 1) {
		// 		$http.get('/api/user').then(function successCB(res) {
	 //     			$rootScope.username = res.data.username;
		//        	},function errorCB(res) {
		//        		$rootScope.username = error;
	 //     		});
		// 	}
		// })


		};

	UserService.$inject = ['$http', '$state'];
})()



