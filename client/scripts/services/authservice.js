'use strict';

/**
 * @ngdoc service
 * @name clientApp.AuthService
 * @description
 * # AuthService
 * This service implements authorization in the clientApp. Use $rootScope only to broadcast events.
 */
angular.module('clientApp')
    .service('AuthService', ['$rootScope', '$http', function ($rootScope, $http) {
        var AuthService = this;

        AuthService.currentUser = null;

        AuthService.login = function(credentials){
            $http.post('/auth/login').then(function success(data){
                AuthService.currentUser = data.user;
                console.log(currentUser + ' is logged in');
            }, function error(error){
                console.log(error);
            });
        }

        AuthService.logout = function(){
            $http.get('/auth/logout').then(function success(){
                AuthService.currentUser = null;
                console.log('User logged out');
            }, function error(error){
                console.log(error);
            });          
        }

    }]);
