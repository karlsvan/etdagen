(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.service:CompaniesService
	 * @description
	 * # CompaniesService
	 * Service of the etApp
	 */
	angular.module('etApp')
	  .service('CompaniesService', CompaniesService);
        var logoFolder = './assets/images/companyLogos/';
        var types = { main_collaborator: 'Hovedsamarbeidspartner', collaborator: 'Samarbeidspartner', partner: 'Partner', sponsor: 'Sponsor'};
        var descriptions = {
          neo: 'Norsk Elektro Optikk A/S ble etablert i 1985 som et privat forskningsorientert selskap innenfor feltet elektrooptikk. Grunnleggerne hadde sine vitenskapelige og tekniske bakgrunner fra forsvarets forskningsinstitutt, som gjennom de siste 30-40 årene har vært ledende innen elektrooptikk i Norge. Selskapet har, siden det startet opp, blitt en av de største uavhengige forsknings- og utviklingsselskapene innen elektrooptikk i Norge og har i tillegg etablert seg selv som en produsent for avanserte elektrooptiske produkt i det internasjonale markedet.'
        };
        var attendings = {
            neo: [
                {year: 2016, type: types.collaborator},
                {year: 2015, type: types.collaborator},
                {year: 2014, type: types.partner}
            ],
            cisco: [
                {year: 2016, type: types.partner},
                {year: 2014, type: types.collaborator}
            ],
            kongsberg: [
                {year: 2016, type: types.partner},
                {year: 2014, type: types.collaborator}
            ],
            nordic: [
                {year: 2016, type: types.partner},
                {year: 2014, type: types.collaborator}
            ],
            siliconLabs: [
                {year: 2016, type: types.partner},
                {year: 2014, type: types.collaborator}
            ],
            sopraSteria: [
                {year: 2016, type: types.partner},
                {year: 2014, type: types.partner}
            ],
            zenitel: [
                {year: 2016, type: types.partner}
            ],
            ksat: [
                {year: 2016, type: types.partner}
            ],
            qFree: [
                {year: 2016, type: types.partner},
                {year: 2014, type: types.collaborator}
            ],
            microsoft: [
                {year: 2016, type: types.partner}
            ],
            brekkeStrand: [
                {year: 2016, type: types.partner},
                {year: 2014, type: types.partner}
            ],
            jernbaneverket: [
                {year: 2015, type: types.collaborator},
                {year: 2014, type: types.partner}
            ],
            dataRespons: [
                {year: 2015, type: types.collaborator}
            ],
            texas: [
                {year: 2014, type: types.collaborator}
            ],
            hatteland: [
                {year: 2014, type: types.partner}
            ],
            hittite: [
                {year: 2014, type: types.partner}
            ],
            academicWork: [
                {year: 2014, type: types.partner}
            ],
            autronica: [
                {year: 2014, type: types.partner}
            ],
            norbit: [
                {year: 2014, type: types.partner}
            ],
            zedge: [
                {year: 2014, type: types.partner}
            ],
            ideas: [
                {year: 2014, type: types.partner}
            ],
            arm: [
                {year: 2014, type: types.collaborator}
            ],
            hifiklubben: [
                {year: 2015, type: types.sponsor},
                {year: 2014, type: types.sponsor}
            ]
        };
        var companies = {
          nordic: {name: 'Nordic Semiconductor', logo: logoFolder+'nordic.png', description: null},
          abb: {name: 'ABB', logo: logoFolder+'abb.png', description: null},
          cisco: {name: 'Cisco', logo: logoFolder+'cisco.gif', description: null},
          kongsberg: {name: 'Kongsberg', logo: logoFolder+'kkongsberg.png', description: null},
          ksat: {name: 'Kongsberg Satelite Services (KSAT)', logo: logoFolder+'ksat.jpg', description: null},
          neo: {name: 'Norsk Elektro Optikk', logo: logoFolder+'neo.png', description: descriptions.neo},
          siliconLabs: {name: 'Silicon Labaratories', logo: logoFolder+'silicon_labs.png', description: null},
          sopraSteria: {name: 'Sopra Steria', logo: logoFolder+'soprasteria.png', description: null},
          zenitel: {name: 'Zenitel', logo: logoFolder+'zenitel.png', description: null},
          academicWork: {name: 'Academic Work', logo: logoFolder+'academic_work.png', description: null},
          arm: {name: 'ARM', logo: logoFolder+'arm.gif', description: null},
          asc: {name: 'ASC', logo: logoFolder+'asc.png', description: null},
          autronica: {name: 'Autronica', logo: logoFolder+'autronica.png', description: null},
          brekkeStrand: {name: 'Brekke Strand', logo: logoFolder+'brekkestrand.jpg', description: null},
          dataRespons: {name: 'Data Respons', logo: logoFolder+'data_respons.png', description: null},
          hatteland: {name: 'Hatteland', logo: logoFolder+'hatteland.png', description: null},
          hittite: {name: 'Hittite', logo: logoFolder+'hittite.jpg', description: null},
          ideas: {name: 'Ideas', logo: logoFolder+'ideas.png', description: null},
          jernbaneverket: {name: 'Jernbaneverket', logo: logoFolder+'jernbaneverket.png', description: null},
          norbit: {name: 'Norbit', logo: logoFolder+'norbit.png', description: null},
          qFree: {name: 'Q-free', logo: logoFolder+'q-free.png', description: null},
          texas: {name: 'Texas Instruments', logo: logoFolder+'texas.png', description: null},
          microsoft: {name: 'Microsoft', logo: logoFolder+'microsoft.png', description: null}
        };
		/*@ngInject*/
		function CompaniesService(){
            this.companies = {
              main_collaborator: null,
              collaborators: [companies.neo],
              partners: [companies.cisco, companies.kongsberg, companies.nordic, companies.siliconLabs, companies.sopraSteria, companies.zenitel, companies.ksat, companies.qFree, companies.microsoft, companies.brekkeStrand],
              sponsors: []
            };
		}
})();
