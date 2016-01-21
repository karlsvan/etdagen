(function(){
	'use strict';


	angular.module('etApp')
		.service('UserService', UserService);

		/*@ngInject*/
		function UserService($http,$state) {
			var self = this;
			var loggedIn = 0;
			var user;

			this.getUser = function(cb) {
				$http.get('/api/user').then(function(res) {
					loggedIn = 1;
					user = res.data;
					if (cb) {
						cb(user,loggedIn,0);
					}
				}, function(res) {
					cb(null,0,res.data);
				});
			};


			this.returnUser = function() { return user; };

			this.getLoggedIn = function() { return loggedIn; };

			this.init = function(cb) {
				self.getUser(function (user,loggedIn,error) {
					cb(user,loggedIn,error);
				});
			};

			this.getProfile = function(id, callback) {
				$http.get('/user/'+id).then(function(res) {
					//console.log(res.data);
					callback(res.data);
				}, function(res) {
					console.log(res.data);
				});
			},
			
	  		this.logout = function() {
	  			loggedIn = 0;
	  			user = null;
				$http.get('/logout').then(function successCB(res) {
	    			$state.go('home');
		      	},function errorCB(res) {
		      		$state.reload('login');
	    		});
			}

			this.login = function(credentials,callback) {
				$http.post('/auth/login',credentials).then(function successCB(/*res*/) {
					self.getUser( function (user,loggedIn/*,error*/) {
						loggedIn = 1;
						$state.go('user',{id:user.id});
					});
				},function errorCB(res) {
					if(res.status == 401){
						callback();
					}
				});
			};

			this.register = function(cred,cb) {
				$http.post('/register', cred).then(function sucsessCB(/*response*/) {
					$state.go('settings');
				}function(error){
					if(error.status == 500) {
						cb(error.data)
					}
				});
			};

			this.saveSettings = function(userSettings) {
				$http.post('/saveSettings',userSettings).then(function(res){
					$state.go('user',{id:userSettings.id});
				},function(error) {

				})
			}

			this.setPass = function(cred,cb) {
				$http.post('/setPass',cred).then(function(res) {
					cb(res)
				},function(error) {
					cb(error)
				})
			}

			this.logout = function() {
				loggedIn = 0;
				user = null;
				$http.get('/logout').then(function successCB(/*res*/) {
					$state.go('home');
				},function errorCB(/*res*/) {
					$state.reload('login');
				});
			};
		}
		UserService.$inject = ['$http', '$state'];
})();
