(function(){
	'use strict';

	/**
	* @ngdoc function
	* @name etApp.controller:BoardCtrl
	* @description
	* # BoardCtrl
	* Controller of the etApp
	*/
	angular.module('etApp')
	.controller('BoardCtrl', BoardCtrl);

	/*@ngInject*/
	function BoardCtrl($scope) {
		$scope.boards = {
			active: 2016,
			'2016': [
				{
					img: "2016/kaja.jpg",
					name: 'Kaja Sørbotten',
					position: 'Styreleder',
					email: 'kaja@etdagen.no'
				},
				{
					img: "2016/marte.jpg",
					name: 'Marte Vadla',
					position: 'Nestleder',
					email: 'vadla@etdagen.no'
				},
				{
					img: "2016/glenn.jpg",
					name: 'Glenn Flø Karlsen',
					position: 'IT-ansvarlig',
					email: 'glenn.fk@etdagen.no'
				},
				{
					img: "2016/henrik.jpg",
					name: 'Henrik Valø Sunbeck',
					position: 'Markedsføringsansvarlig',
					email: 'henrikvs@etdagen.no'
				},
				{
					img: "2016/hakon.jpg",
					name: 'Håkon Præstegård',
					position: 'Logistikkansvarlig',
					email: 'hakonp@etdagen.no'
				},
				{
					img: "2016/magnus.jpg",
					name: 'Magnus Nøkleby Pedersen',
					position: 'Økonomiansvarlig',
					email: 'magnusnp@etdagen.no'
				},
				{
					img: "2016/martin.jpg",
					name: 'Martin Haukali',
					position: 'Bedriftskontaktleder',
					email: 'martinh@etdagen.no'
				},
				{
					img: "2016/oda.jpg",
					name: 'Oda L. K. Wærås',
					position: 'Turleder',
					email: 'odalkw@etdagen.no'
				}
			],
			'2015':  [
				{
					img: "2015/Anders.jpg",
					name: 'Anders B. Åsheim',
					position: 'Styreleder',
					email: 'aasheim@etdagen.no'
				},
				{
					img: "2015/Havard.jpg",
					name: 'Håvard G. D. Løvaas',
					position: 'Nestleder',
					email: 'lovaas@etdagen.no'
				},
				{
					img: "2015/Torbjorn.jpg",
					name: 'Torbjørn Viem Ness',
					position: 'IT-ansvarlig',
					email: 'ness@etdagen.no'
				},
				{
					img: "2015/Tor.jpg",
					name: 'Tor Braastad Gylder',
					position: 'Markedsføringsansvarlig',
					email: 'gylder@etdagen.no'
				},
				{
					img: "2015/Henning.jpg",
					name: 'Henning Schei',
					position: 'Logistikkansvarlig',
					email: 'schei@etdagen.no'
				},
				{
					img: "2015/Hermann.jpg",
					name: 'Hermann Sundklakk',
					position: 'Økonomiansvarlig',
					email: 'sundklakk@etdagen.no'
				},
				{
					img: "2015/Marta.jpg",
					name: 'Marta Ranestad',
					position: 'Bedriftskontaktleder',
					email: 'ranestad@etdagen.no'
				},
				{
					img: "2015/Jorgen.jpg",
					name: 'Jørgen Antonsen',
					position: 'Turleder',
					email: 'antonsen@etdagen.no'
				}
			]
		};
		BoardCtrl.$inject = ['$scope'];
	}
})();

