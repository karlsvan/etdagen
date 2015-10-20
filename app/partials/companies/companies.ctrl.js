(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:CompaniesCtrl
	 * @description
	 * # CompaniesCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('CompaniesCtrl', CompaniesCtrl);

		/*@ngInject*/
	  	function CompaniesCtrl() {
	  		var logoFolder = './assets/images/companyLogos/';
	  		var companies = {
	  			nordicSemiconductor: {name: 'Nordic Semiconductor', logo: logoFolder+'nordic.jpg'},
	  			abb: {name: 'ABB', logo: logoFolder+'abb.png'},
	  			cisco: {name: 'Cisco', logo: logoFolder+'cisco.gif'},
	  			kongsberg: {name: 'Kongsberg', logo: logoFolder+'kongsberg.png'},
	  			ksat: {name: 'Kongsberg Satelite Services (KSAT)', logo: null},
	  			neo: {name: 'Norsk Elektro Optikk', logo: logoFolder+'neo.png'},
	  			SiliconLabs: {name: 'Silicon Labaratories', logo: logoFolder+'silicon_labs.png'},
	  			SopraSteria: {name: 'Sopra Steria', logo: logoFolder+'sopra_steria.png'},
	  			zenitel: {name: 'Zenitel', logo: null},
	  			academicWork: {name: 'Academic Work', logo: logoFolder+'academic_work.png'},
	  			arm: {name: 'ARM', logo: logoFolder+'arm.png'},
	  			asc: {name: 'ASC', logo: logoFolder+'asc.png'},
	  			autronica: {name: 'Autronica', logo: logoFolder+'autronica.png'},
	  			brekkeStrand: {name: 'Brekke Strand', logo: logoFolder+'brekkestrand.gif'},
	  			dataRespons: {name: 'Data Respons', logo: logoFolder+'data_respons.png'},
	  			hatteland: {name: 'Hatteland', logo: logoFolder+'hatteland.png'},
	  			hittite: {name: 'Hittite', logo: logoFolder+'hittite.jpg'},
	  			ideas: {name: 'Ideas', logo: logoFolder+'ideas.png'},
	  			jernbaneverket: {name: 'Jernbaneverket', logo: logoFolder+'jernbaneverket.png'},
	  			norbit: {name: 'Norbit', logo: logoFolder+'norbit.png'},
	  			qFree: {name: 'Q-free', logo: logoFolder+'q-free.png'},
	  			texas: {name: 'Texas Instruments', logo: logoFolder+'texas.png'}
	  		};
		    this.companies = {
		    	mainPartner: companies.nordicSemiconductor,
		    	partners: [companies.cisco, companies.ksat, companies.neo, companies.SiliconLabs, companies.SopraSteria, companies.arm, companies.asc, companies.ideas],
		    	sponsors: [companies.zenitel, companies.jernbaneverket, companies.norbit, companies.texas]
		    };
		}
})();
