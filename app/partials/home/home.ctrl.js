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
		function HomeCtrl(){
			
			
			this.program = [
				{time: '10.00-15.00', action: 'Bedrifter på stand i Glassgården', place: 'Glassgården', icon: 'Tie'},
				{time: '10.00-15.00', action: 'Quiz! Gevinster på 500kr og 250kr gavekort midtbyen', place: 'Glassgården', icon: 'question'},
				{time: '10.05', action: 'Ballongslipp', place: 'Glassgården', icon: 'Balloon'},
				{time: '12.05', action: 'Kakespising med bedriftene', place: 'Glassgården', icon: 'cake'},
				{time: '14.15', action: 'Bedriftspresentasjon med Norsk Elektro Optikk', place: 'EL1', icon: 'Tie'},
				{time: '15.10', action: 'Utdeling av mikroelektronikk-prisen', place: 'EL6', icon: 'Circuit'},
				{time: '15.15', action: 'Sommerjobbmaraton', place: 'EL6', icon: 'Stopwatch'},
				{time: '15.45', action: 'Loddtrekning, med fine gevinster', place: 'EL6', icon: 'ticket'}
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
})();
