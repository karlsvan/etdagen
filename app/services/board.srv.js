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
  			],
			y15: [
				{
					name: 'Anders',
					position: positions.leader,
					mail: null,
					phone: null,
					img: '2015/Anders.jpg'
				},
				{
					name: 'Havard',
					position: null,
					mail: null,
					phone: null,
					img: '2015/Havard.jpg'
				},
				{
					name: 'Henning',
					position: null,
					mail: null,
					phone: null,
					img: '2015/Henning.jpg'
				},
				{
					name: 'Hermann',
					position: null,
					mail: null,
					phone: null,
					img: '2015/Hermann.jpg'
				},
				{
					name: 'Jørgen',
					position: null,
					mail: null,
					phone: null,
					img: '2015/Jorgen.jpg'
				},
				{
					name: 'Marta',
					position: null,
					mail: null,
					phone: null,
					img: '2015/Marta.jpg'
				},
				{
					name: 'Silje',
					position: null,
					mail: null,
					phone: null,
					img: '2015/Silje.jpg'
				},
				{
					name: 'Tor',
					position: null,
					mail: null,
					phone: null,
					img: '2015/Tor.jpg'
				},
				{
					name: 'Torbjørn',
					position: positions.it,
					mail: null,
					phone: null,
					img: '2015/Torbjorn.jpg'
				}
			],
			y14: [
				{
					name: 'Adrian',
					position: null,
					mail: null,
					phone: null,
					img: '2014/adrian.jpg'
				},
				{
					name: 'Elly',
					position: null,
					mail: null,
					phone: null,
					img: '2014/elly.jpg'
				},
				{
					name: 'Erlend',
					position: null,
					mail: null,
					phone: null,
					img: '2014/erlend.jpg'
				},
				{
					name: 'Halvorsen',
					position: null,
					mail: null,
					phone: null,
					img: '2014/halvorsen.jpg'
				},
				{
					name: 'Ida',
					position: null,
					mail: null,
					phone: null,
					img: '2014/ida.jpg'
				},
				{
					name: 'Idunn',
					position: null,
					mail: null,
					phone: null,
					img: '2014/idunn.jpg'
				},
				{
					name: 'Karoline',
					position: null,
					mail: null,
					phone: null,
					img: '2014/karoline.jpg'
				},
				{
					name: 'Mattis',
					position: null,
					mail: null,
					phone: null,
					img: '2014/mattis.jpg'
				},
				{
					name: 'Silja',
					position: null,
					mail: null,
					phone: null,
					img: '2014/silja.jpg'
				},
				{
					name: 'Smith',
					position: null,
					mail: null,
					phone: null,
					img: '2014/smith.jpg'
				}
			],
			y13: [
				{
					name: 'bo',
					position: null,
					mail: null,
					phone: null,
					img: '2013/bo.png'
				},
				{
					name: 'eckholdt',
					position: null,
					mail: null,
					phone: null,
					img: '2013/eckholdt.png'
				},
				{
					name: 'haddeland',
					position: null,
					mail: null,
					phone: null,
					img: '2013/haddeland.png'
				},
				{
					name: 'herding',
					position: null,
					mail: null,
					phone: null,
					img: '2013/herding.png'
				},
				{
					name: 'holmefjord',
					position: null,
					mail: null,
					phone: null,
					img: '2013/holmefjord.png'
				},
				{
					name: 'lepsoy',
					position: null,
					mail: null,
					phone: null,
					img: '2013/lepsoy.png'
				},
				{
					name: 'liland',
					position: null,
					mail: null,
					phone: null,
					img: '2013/liland.png'
				},
				{
					name: 'meling',
					position: null,
					mail: null,
					phone: null,
					img: '2013/meling.png'
				}
			],
			y12: [
				{
					name: 'arnesen',
					position: null,
					mail: null,
					phone: null,
					img: '2012/arnesen.png'
				},
				{
					name: 'askheim',
					position: null,
					mail: null,
					phone: null,
					img: '2012/askheim.png'
				},
				{
					name: 'bjorsvik',
					position: null,
					mail: null,
					phone: null,
					img: '2012/bjorsvik.jpg'
				},
				{
					name: 'bognoy',
					position: null,
					mail: null,
					phone: null,
					img: '2012/bognoy.png'
				},
				{
					name: 'grodas',
					position: null,
					mail: null,
					phone: null,
					img: '2012/grodas.png'
				},
				{
					name: 'gunnerud',
					position: null,
					mail: null,
					phone: null,
					img: '2012/gunnerud.png'
				},
				{
					name: 'hanes',
					position: null,
					mail: null,
					phone: null,
					img: '2012/hanes.png'
				},
				{
					name: 'henriksen',
					position: null,
					mail: null,
					phone: null,
					img: '2012/henriksen.png'
				},
				{
					name: 'kiaer',
					position: null,
					mail: null,
					phone: null,
					img: '2012/kiaer.png'
				},
				{
					name: 'odegaard',
					position: null,
					mail: null,
					phone: null,
					img: '2012/odegaard.png'
				},
				{
					name: 'pehilj',
					position: null,
					mail: null,
					phone: null,
					img: '2012/pehilj.jpg'
				},
				{
					name: 'rake',
					position: null,
					mail: null,
					phone: null,
					img: '2012/rake.png'
				},
				{
					name: 'rosenberg',
					position: null,
					mail: null,
					phone: null,
					img: '2012/rosenberg.png'
				},
				{
					name: 'sandvoll',
					position: null,
					mail: null,
					phone: null,
					img: '2012/sandvoll.png'
				},
				{
					name: 'strandvik',
					position: null,
					mail: null,
					phone: null,
					img: '2012/strandvik.png'
				},
				{
					name: 'tommer',
					position: null,
					mail: null,
					phone: null,
					img: '2012/tommer.png'
				}
			],
			y11: [
				{
					name: 'bendik',
					position: null,
					mail: null,
					phone: null,
					img: '2011/bendik.png'
				},
				{
					name: 'carl',
					position: null,
					mail: null,
					phone: null,
					img: '2011/carl.png'
				},
				{
					name: 'christoffer',
					position: null,
					mail: null,
					phone: null,
					img: '2011/christoffer.png'
				},
				{
					name: 'daniel',
					position: null,
					mail: null,
					phone: null,
					img: '2011/daniel.png'
				},
				{
					name: 'eirik',
					position: null,
					mail: null,
					phone: null,
					img: '2011/eirik.png'
				},
				{
					name: 'jorund',
					position: null,
					mail: null,
					phone: null,
					img: '2011/jorund.png'
				},
				{
					name: 'knut',
					position: null,
					mail: null,
					phone: null,
					img: '2011/knut.png'
				},
				{
					name: 'kristian',
					position: null,
					mail: null,
					phone: null,
					img: '2011/kristian.png'
				},
				{
					name: 'lars',
					position: null,
					mail: null,
					phone: null,
					img: '2011/lars.png'
				},
				{
					name: 'magnus',
					position: null,
					mail: null,
					phone: null,
					img: '2011/magnus.png'
				},
				{
					name: 'rasmus',
					position: null,
					mail: null,
					phone: null,
					img: '2011/rasmus.png'
				},
				{
					name: 'simon',
					position: null,
					mail: null,
					phone: null,
					img: '2011/simon.png'
				},
				{
					name: 'thomasc',
					position: null,
					mail: null,
					phone: null,
					img: '2011/thomasc.png'
				},
				{
					name: 'thomask',
					position: null,
					mail: null,
					phone: null,
					img: '2011/thomask.png'
				},
				{
					name: 'torolv',
					position: null,
					mail: null,
					phone: null,
					img: '2011/torolv.png'
				}
			],
			y10: [
				{
					name: 'anders',
					position: null,
					mail: null,
					phone: null,
					img: '2010/anders.jpg'
				},
				{
					name: 'audun',
					position: null,
					mail: null,
					phone: null,
					img: '2010/audun.jpg'
				},
				{
					name: 'bard',
					position: null,
					mail: null,
					phone: null,
					img: '2010/bard.jpg'
				},
				{
					name: 'marianne',
					position: null,
					mail: null,
					phone: null,
					img: '2010/marianne.jpg'
				},
				{
					name: 'mehmet',
					position: null,
					mail: null,
					phone: null,
					img: '2010/mehmet.jpg'
				},
				{
					name: 'nils',
					position: null,
					mail: null,
					phone: null,
					img: '2010/nils.png'
				},
				{
					name: 'pal',
					position: null,
					mail: null,
					phone: null,
					img: '2010/pal.png'
				},
				{
					name: 'sigurd',
					position: null,
					mail: null,
					phone: null,
					img: '2010/sigurd.jpg'
				},
				{
					name: 'sigvald',
					position: null,
					mail: null,
					phone: null,
					img: '2010/sigvald.jpg'
				}
			]
  		};


		/*@ngInject*/
		function BoardService(){
			this.boards = boards;
		}
})();
