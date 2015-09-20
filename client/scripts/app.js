'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'lumx'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/news');

    $stateProvider
      .state('news', {
        url: '/news',
        templateUrl: 'partials/news.html',
        controller: 'NewsCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      })
      .state('companies', {
        url: '/companies',
        templateUrl: 'partials/companies.html',
        controller: 'CompaniesCtrl'
      })
      .state('board', {
        url: '/board',
        templateUrl: 'partials/board.html',
        controller: 'BoardCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl as LOGIN'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl'
      });

  }]);
