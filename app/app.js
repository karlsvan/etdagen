(function() {
    'use strict';

    /*
    *	The application main module
    *	@module: etApp
    */
    angular.module('etApp', [
	    'ngAnimate',
	    'ngAria',
	    'ngCookies',
	    'ngMessages',
	    'ngResource',
	    'ngRoute',
	    'ngSanitize',
	    'ngTouch',
	    'ui.router',
	    'ngMaterial'
 	])
 	.config(configure)
 	.controller('appCtrl', function(){
 		this.name = 'E&T-dagen';
 		this.year = 2016;
 	});

 	/*@ngInject*/
 	function configure($stateProvider, $urlRouterProvider, $mdThemingProvider) {
 		$urlRouterProvider.otherwise('/home');

 		$stateProvider
 	    .state('home', {
 	      url: '/home',
 	      templateUrl: 'partials/home/home.html',
 	      controller: 'HomeCtrl as pagehome'
 	    })
 	    .state('about', {
 	      url: '/about',
 	      templateUrl: 'partials/about/about.html',
 	      controller: 'AboutCtrl'
 	    })
 	    .state('companies', {
 	      url: '/companies',
 	      templateUrl: 'partials/companies/companies.html',
 	      controller: 'CompaniesCtrl as pagecomp'
 	    })
 	    // .state('board', {
 	    //   url: '/board',
 	    //   templateUrl: 'partials/board/board.html',
 	    //   controller: 'BoardCtrl'
 	    // })
 	    .state('login', {
 	      url: '/login',
 	      templateUrl: 'partials/login/login.html',
 	      controller: 'LoginCtrl as LOGIN'
 	    })
 	    // .state('register', {
 	    //   url: '/register/:user',
 	    //   templateUrl: 'partials/register/register.html',
 	    //   controller: 'RegisterCtrl'
 	    // })
 	    .state('contact',{
 	    	url: '/contact',
 	    	templateUrl: 'partials/contact/contact.html',
 	    	controller: 'ContactCtrl as contact'
 	    })
      .state('user', {
 	      url: '/user',
        abstract: true,
 	      template: '<ui-view/>',
 	    })
      .state('users', {
 	      url: '/users',
        abstract: true,
 	      template: '<ui-view/>',
 	    })
      .state('user.profile', {
 	      url: '/profile',
 	      templateUrl: 'partials/profile/profile.html',
 	      controller: 'ProfileCtrl'
 	    })
      .state('users.students', {
 	      url: '/students',
 	      templateUrl: 'partials/students/students.html',
 	      controller: 'StudentsCtrl'
 	    })
      .state('users.search', {
 	      url: '/search',
 	      templateUrl: 'partials/users/search/search.html',
 	      controller: 'SearchCtrl'
 	    });

 	    $mdThemingProvider.theme('default')
 	    	.primaryPalette('red')
 	    	.accentPalette('brown')
 	    	.warnPalette('yellow')
 	    	.backgroundPalette('grey', {
 	    		'hue-1': '200',
 	    	});
 	    $mdThemingProvider.theme('formTheme')
 	    	.primaryPalette('red')
 	    	.warnPalette('deep-orange');
 	}
 	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];
})();
