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
				$http.get('/api/user').then(function success(res) {
					loggedIn = 1;
					user = res.data;
					if (cb) cb(user, loggedIn, null);
				}, function(res) { cb(null, 0, res.data); });
			};


			this.returnUser = function() { return user; };

			this.getLoggedIn = function() { return loggedIn; };

			/*
			*	@function init
			*	@description
			*		Gets currently logged in user and excecutes provided callback-function
			*		with the parameters @user, @loggedIn and @error.
			*	@callback parameters
			*		user:     The userobject from the user that is logged in
			*		loggedIn: bool value, true for user logged in
			*		error:    http request error
			*/
			this.init = function(cb) {
				self.getUser(function (user,loggedIn,error) {
					cb(user, loggedIn, error);
				});
			};

			/*
			*	@function getProfile
			*	@description
			*		Gets a user from the database specified by userid and excecutes the
			*		provided callback-function with the parameters @user.
			*	@callback-parameters
			*		user: A user from the database
			*/
			this.getProfile = function(id, callback) {
				$http.get('/user/'+id).then(function success(res) {
					callback(res.data);
				}, function failure(res) {
					console.error(res.data);
				});
			},

			this.logout = function() {
				loggedIn = 0;
				user = null;
				$http.get('/logout').then(function successCB(/*res*/) {
					$state.go('home');
				}, function errorCB(/*res*/) {
					$state.reload('login');
				});
			};

			this.login = function(credentials, callback) {
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
				$http.post('/register', cred).then(function sucsessCB(resp) {
					$http.post('/forgot', {text:resp.data}).then(function successCB(res) {
				    	cb(null,'Passord har blitt sendt til din email')
				    }, function errorCB(res) {
				    	cb(null,'Bruker opprettet, men feil ved passord-generering. Vennlist se "Glemt passord"')
				    });
				}, function(error){
					if(error.status == 500) {
						cb(error.data,null);
					}
				});
			};

			this.saveSettings = function(userSettings) {
				$http.post('/saveSettings',userSettings).then(function(/*res*/){
					$state.go('user',{id:userSettings.id});
				});
			};

			this.setPass = function(cred,cb) {
				$http.post('/setPass',cred).then(function(res) {
					cb(res);
				},function(error) {
					cb(error);
				});
			};

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
