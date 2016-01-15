(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:HomeCtrl
	 * @description
	 * # HomeCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('HomeCtrl', HomeCtrl);

		/*@ngInject*/
		function HomeCtrl(NewsService){
			this.news = NewsService.getNews();

			this.tiles = (function(){
				var ret = [],
					color =  ['red', 'green', 'darkBlue', 'pink', 'yellow', 'purple'];
				for(var i=0; i<12; i++){
					ret.push({
						background: color[Math.round(Math.random()*(color.length-1))],
						span: { row: Math.round(Math.random()*(3-1)+1), col: Math.round(Math.random()*(3-1)+1) }
					});
				}
				return ret;
			})();

			this.program = [
				{time: '10.00', action: 'Bedrifter på stand i Glassgården', place: 'Glassgården', icon: 'Tie'},
				{time: '10.05', action: 'Ballongslipp', place: 'Glassgården', icon: 'Balloon'},
				{time: '12.05', action: 'Kakespising med bedriftene', place: 'Glassgården', icon: 'Tie'},
				{time: '14.15', action: 'Bedriftspresentasjon med Norsk Elektro Optikk', icon: 'Tie'},
				{time: '15.10', action: 'Utdeling av mikroelektronikk-prisen', icon: 'Circuit'},
				{time: '15.15', action: 'Sommerjobbmaraton', icon: 'Stopwatch'}
				/*{time: '10.05', action: 'Ballongslipp', place: 'glassgården', icon: 'Balloon'},
				{time: '10.15', action: 'Bedpress med DataRespons', place: 'EL3', icon: 'Tie'},
				{time: '11.15', action: 'Bedpress med Jernbaneverket', place: 'EL3', icon: 'Tie'},
				{time: '12.05', action: 'Ballongslipp', place: 'glassgården', icon: 'Balloon'},
				{time: '12.15', action: 'Bedpress med Norsk Elektro Optikk', place: 'EL21', icon: 'Tie'},
				{time: '14.15', action: 'Bedpress med Kongsberg', place: 'EL5', icon: 'Tie'},
				{time: '15.10', action: 'Utdeling av mikroelektronikk-prisen', place: 'EL5', icon: 'Circuit'},
				{time: '15.15', action: 'Sommerjobbmaraton', place: 'glassgården', icon: 'Stopwatch'}*/
			];
		}
		HomeCtrl.$inject = ['NewsService'];
})();
