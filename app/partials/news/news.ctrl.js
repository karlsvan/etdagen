(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:NewsCtrl
	 * @description
	 * # NewsCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('NewsCtrl', NewsCtrl);

		/*@ngInject*/
		function NewsCtrl(NewsService){
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
				{time: '10.00', action: 'Dørene åpner', place: null},
				{time: '10.05', action: 'Ballongslipp', place: 'glassgården'},
				{time: '10.15', action: 'Bedpress med DataRespons', place: 'EL3'},
				{time: '11.15', action: 'Bedpress med Jernbaneverket', place: 'EL3'},
				{time: '12.05', action: 'Ballongslipp', place: 'glassgården'},
				{time: '12.15', action: 'Bedpress med Norsk Elektro Optikk', place: 'EL21'},
				{time: '14.15', action: 'Bedpress med Kongsberg', place: 'EL5'},
				{time: '15.10', action: 'Utdeling av mikroelektronikk-prisen', place: 'EL5'},
				{time: '15.15', action: 'Sommerjobbmaraton', place: 'glassgården'}
			];
		}
		NewsCtrl.$inject = ['NewsService'];
})();