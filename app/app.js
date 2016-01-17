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
		// 'ngTouch',
		'ui.router',
		'ngMaterial'
	])
	.config(configure)
	.controller('appCtrl', appCtrl);

	function appCtrl($cookies,$mdToast){
		this.name = 'E&T-dagen';
		this.year = 2016;

	}

	appCtrl.$inject = ['$cookies', '$mdToast'];
	/*@ngInject*/
	function configure($stateProvider, $urlRouterProvider, $mdThemingProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		// Main navigation pages
		.state('home', {
			url: '/',
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
		.state('contact',{
			url: '/contact',
			templateUrl: 'partials/contact/contact.html',
			controller: 'ContactCtrl as contact'
		})


		// Secondary pages
		.state('login', {
			url: '/login',
			templateUrl: 'partials/login/login.html',
			controller: 'LoginCtrl as LOGIN'
		})
		.state('register', {
			url: '/register/:user',
			templateUrl: 'partials/register/register.html',
			controller: 'RegisterCtrl',
		})
		.state('settings', {
			url: '/settings',
			templateUrl: 'partials/settings/settings.html',
			controller: 'SettingsCtrl as SettingsCtrl'
		})
		.state('search', {
			url: '/search',
			templateUrl: 'partials/search/search.html',
			controller: 'SearchCtrl as SearchCtrl'
		})
		.state('forgot', {
			url: '/forgot',
			templateUrl: 'partials/forgot/forgot.html',
			controller: 'forgotCtrl as FORGOT'
		})
		.state('announcement', {
			url: '/announcement/:id',
			templateUrl: 'partials/announcement/announcement.html',
			controller: 'announcementCtrl as announcement'
		})
		.state('user', {
			url: '/user/:id',
			templateUrl: 'partials/user/user.html',
			controller: 'userCtrl'
		});


		// Theming for the app
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
