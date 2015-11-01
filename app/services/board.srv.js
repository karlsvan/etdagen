(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.service:BoardService
	 * @description
	 * # BoardService
	 * Service of the etApp
	 */
	angular.module('etApp')
	  .service('BoardService', BoardService);


	  	var positions = {
	  		leader: {
	  			title: 'Leder',
	  			description: 'Har ansvaret for øvrige hendvendelser.'
	  		},
	  		deputy: {
	  			title: 'Nestleder',
	  			description: 'Har ansvaret for øvrige hendvendelser'
	  		},
	  		it: {
	  			title: 'IT-ansvarlig',
	  			description: 'Har ansvaret for nettsiden og CV-database.'
	  		},
	  		marketing: {
	  			title: 'Markedsføring',
	  			description: 'Har ansvaret for promotering av E&T-dagen. Ønsker om å være med i årets promoteringvideo meldes her.'
	  		},
	  		logistics: {
	  			title: 'Logistikk',
	  			description: 'Har ansvaret for logistikk under arrangementet. Kan kontaktes angående utstyr og annet.'
	  		},
	  		economy: {
	  			title: 'Økonomi',
	  			description: 'Har ansvaret for økonomi'
	  		},
	  		business: {
	  			title: 'Bedriftskontakt',
	  			description: 'Har ansvaret for bedrifter.'
	  		},
	  		travel: {
	  			title: 'Turansvarlig',
	  			description: 'Har ansvaret for klasseturen.'
	  		}

	  	};

  		var boards = {
  			y16: [
  				{
  					name: 'Kaja Sørbotten',
  					position: positions.leader,
  					mail: 'kaja@etdagen.no',
  					phone: null,
  					img: '2016/kaja.jpg'
  				},
  				{
  					name: 'Marte Vadla',
  					position: positions.deputy,
  					mail: 'vadla@etdagen.no',
  					phone: null,
  					img: '2016/marte.jpg'
  				},
  				{
  					name: 'Glenn Flø Karlsen',
  					position: positions.it,
  					mail: 'glenn.fk@etdagen.no',
  					phone: null,
  					img: '2016/glenn.jpg'
  				},
  				{
  					name: 'Henrik Valø Sundbeck',
  					position: positions.marketing,
  					mail: 'henrikvs@etdagen.no',
  					phone: null,
  					img: '2016/henrik.jpg'
  				},
  				{
  					name: 'Håkon Præstegård',
  					position: positions.logistics,
  					mail: 'hakonp@etdagen.no',
  					phone: null,
  					img: '2016/hakon.jpg'
  				},
  				{
  					name: 'Magnus Nøkleby Pedersen',
  					position: positions.economy,
  					mail: 'magnusnp@etdagen.no',
  					phone: null,
  					img: '2016/magnus.jpg'
  				},
  				{
  					name: 'Martin Haukali',
  					position: positions.business,
  					mail: 'martinh@etdagen.no',
  					phone: null,
  					img: '2016/martin.jpg'
  				},
  				{
  					name: 'Oda Linnea Ketilsdatter Wærås',
  					position: positions.travel,
  					mail: 'odalkw@etdagen.no',
  					phone: null,
  					img: '2016/oda.jpg'
  				}
  			]
  		};


		/*@ngInject*/
		function BoardService(){
			this.boards = boards;
		}
})();
