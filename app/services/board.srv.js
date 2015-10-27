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
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dignissimos est, hic itaque consectetur at quasi, earum fugiat qui laboriosam quis eveniet, labore inventore molestias! Repellendus consequuntur nobis accusamus ducimus.'
	  		},
	  		deputy: {
	  			title: 'Nestleder',
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima beatae distinctio harum debitis veniam impedit expedita vel esse dolorem numquam laboriosam repellendus sed doloremque, quae modi incidunt iure reiciendis odit.'
	  		},
	  		it: {
	  			title: 'IT-ansvarlig',
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quis ab nam, facere voluptas. Ipsam ut obcaecati temporibus adipisci. Repudiandae voluptates exercitationem earum, dolore atque, ipsam ex consequatur aspernatur vitae.'
	  		},
	  		marketing: {
	  			title: 'Markedsføring',
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae a iste error maxime cum illum sint rerum pariatur quis magni quod placeat ullam, officia, dolore id assumenda beatae in, commodi.'
	  		},
	  		logistics: {
	  			title: 'Logistikk',
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur explicabo dicta voluptas dolor cupiditate voluptates assumenda minus consectetur suscipit temporibus esse, minima amet qui nam, fuga culpa facilis quae!'
	  		},
	  		economy: {
	  			title: 'Økonomi',
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, et iure assumenda a voluptatibus magnam aspernatur voluptas. Officiis vitae possimus cum necessitatibus, quas, omnis tenetur sint commodi enim esse, dolor.'
	  		},
	  		business: {
	  			title: 'Bedriftskontakt',
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus cupiditate ratione consectetur, saepe obcaecati fuga, rerum sint, quibusdam in, maiores velit vitae illo! Vitae impedit at nam magnam magni doloremque?'
	  		},
	  		travel: {
	  			title: 'Turansvarlig',
	  			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium sequi aspernatur quam sunt quidem modi omnis dolorum quod fugit corporis! Sunt assumenda minus, saepe cum distinctio deserunt beatae, inventore magni?'
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
