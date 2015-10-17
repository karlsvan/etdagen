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
 	.config(configure);

 	/*@ngInject*/
 	function configure($stateProvider, $urlRouterProvider, $mdThemingProvider) {
 		$urlRouterProvider.otherwise('/news');

 		$stateProvider
 	    .state('news', {
 	      url: '/news',
 	      templateUrl: 'partials/news/news.html',
 	      controller: 'NewsCtrl as pagenews'
 	    })
 	    .state('about', {
 	      url: '/about',
 	      templateUrl: 'partials/about/about.html',
 	      controller: 'AboutCtrl'
 	    })
 	    .state('companies', {
 	      url: '/companies',
 	      templateUrl: 'partials/companies/companies.html',
 	      controller: 'CompaniesCtrl'
 	    })
 	    .state('board', {
 	      url: '/board',
 	      templateUrl: 'partials/board/board.html',
 	      controller: 'BoardCtrl'
 	    })
 	    .state('login', {
 	      url: '/login',
 	      templateUrl: 'partials/login/login.html',
 	      controller: 'LoginCtrl as LOGIN'
 	    })
 	    .state('register', {
 	      url: '/register',
 	      templateUrl: 'partials/register/register.html',
 	      controller: 'RegisterCtrl'
 	    });

 	    $mdThemingProvider.theme('default')
 	    	.primaryPalette('red')
 	    	.accentPalette('blue')
 	    	.warnPalette('yellow')
 	    	.backgroundPalette('red');
 	}
 	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];
})();
