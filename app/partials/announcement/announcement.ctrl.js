(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:announcementCtrl
	 * @description
	 * # announcementCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('announcementCtrl', announcementCtrl);

		/*@ngInject*/
		function announcementCtrl() {
			this.companyProfile = {
				img: null,
				name: 'Norges bank',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				tags: ['Elektronikk', 'Nano', 'Bensin']
			};
			this.industries = ['Elektronikk', 'Optikk', 'Akustikk'];
			this.title = 'Awesome Intern';
			this.functions = ['Reklame', 'Rengjøring'];
			this.employmentType = 'Deltid';
			this.description = 'Vil du være med på vårt lavpriseventyr som vår nye Butikksjef på Sveberg? \n'+
								'Har du kremmerskap i blodet og elsker travle hverdager?  Da kan vi love deg at en stilling hos oss gir deg muligheter til å utvikle dine kjøpmannsevner, og å sitte i ro - det får du garantert ikke.\n'+
								'Vi er på leting etter ny butikksjef til vår butikk på Sveberg.\n'+
								'Våre store butikker gjør at du går mange skritt i løpet av dagen. Våre spennende varer ankommer i store mengder, og krever at du elsker en fysisk jobb som til stadighet byr på uforutsette hendelser. Samtidig higer du etter struktur og liker gode planer på kort og lang sikt.\n'+
								'Du vil komme til å lede en gjeng med flotte folk som krever at du inkluderer de i store og små beslutninger, er "tett på" både i dialog og i handling. Av og til kreves det at du må pushe og trykke på de rette knappene, andre ganger holder det med rosende ord og en klapp på skulderen. Derfor er du tilpasningsdyktig i ditt lederskap og er på stadig leting etter utviklingspotensial.\n'+
								'Vi legger ikke skjul på at vi lever av fornøyde kunder. Det vet vi at du lykkes med når du som rollemodell samler teamet ditt og gjør butikken "klar for salg". Selv om tiden er knapp, smiler du og du vet hva som vil gi kundene "kongefølelsen".\n'+
								'Hos oss vil du få et ledertreningsprogram med i ryggsekken, som skal gjøre deg kompetent og trygg. Vi vil at du skal komme deg raskt inn i oppgavene og levere resultater. Å være endel av vår suksess er som en herlig berg og dalbane. Det kiler i magen over å nå nye høyder og du vet at du er nøkkelen til at vi sammen skal kunne lykkes.\n'+
								'Ta en titt på vår side "Vil du også være Europris?", og har du spørsmål til stillingen kan disse rettes til distriktssjef John Andreassen på telefon 977 81 777.\n'+
								'KAN og VIL DU - er dette garantert jobben du har lett etter. Søk da vel!!',
			this.applicamentProcedure = 'email';
			this.deadline = '22.01.2016';

			this.ex = [
				{key: 'Firma', value: 'HAV A/S'},
				{key: 'Sted', value: '1364 Fornebu'},
				{key: 'Omfang', value: 'Deltid'},
				{key: 'Frist', value: 'Snarest'},
				{key: 'Søknad merkes', value: 'Fornebu'},
				{key: 'Nettverk', value: 'Facebook'},
				{key: 'Tiltredelse', value: 'Snarest'},
				{key: 'Varighet', value: 'Fast'},
				{key: 'Sektor', value: 'Privat'},
				{key: 'Lønn', value: 'Etter avtale'},
				{key: 'Stillingstittel', value: 'Personlig assistent'},
				{key: 'Bransje', value: 'Helsepersonell'},
				{key: 'Stillingsfunksjon', value: 'Helsepersonell'}
			]
		}
		/*
		Firma: HAV A/S
		Sted: 1364 Fornebu
		Omfang: Deltid
		Frist: Snarest
		Søknad merkes: Fornebu

		Nettverk: Facebook
		Tiltredelse: Snarest
		Varighet: Fast
		Sektor: Privat

		Lønn: Etter avtale
		Stillingstittel: Personlig assistent
		Bransje: Helse og omsorg
		Stillingsfunksjon: Helsepersonell

		Beskrivelse av utlysning
		Nøkkelord: Barn, Fritid, Assistent, Lekser
		id-kode: 6497651
		Sist endret: 14.14.14

		Kontaktperson: Wilhelm Riemann
		Stillingstittel: Personalansvarlig
		Telefon: 32164643
		Epost: riemann@hav.no
		*/
		announcementCtrl.$inject = [];
})();
