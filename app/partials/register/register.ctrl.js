(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:RegisterCtrl
	 * @description
	 * # RegisterCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
		.controller('RegisterCtrl', RegisterCtrl);

	/*@ngInject*/
	function RegisterCtrl($scope, UserService) {

		var form = 'form';
		this.registerOptions = [
			{label: 'Fornavn', inputType: 'text', model: form+'.fornavn'},
			{label: 'Etternavn', inputType: 'text', model: form+'.etternavn'},
			{label: 'Epost', inputType: 'email', model: form+'.email'},
			{label: 'Telefonnummer', inputType: 'number', model: form+'.tlf'},
			{label: 'Utgangsår', inputType: 'number', model: form+'.utgangsaar'},
			{label: 'Linje', inputType: 'text', model: form+'.linje'},
			{label: 'Fødselsdato', inputType: 'date', model: form+'.fodselsdato'},
			//{label: 'Brukernavn', inputType: 'text', model: form+'.username'},
			{label: 'Passord', inputType: 'password', model: form+'.password'},
			{label: 'Bekreft Passord', inputType: 'password', model: form+'.rpassword'}
		];
		this.reg = function() { console.log($scope.form); }
		this.register = function() { UserService.register($scope.registerForm); };
	}
	RegisterCtrl.$inject = ['$scope', 'UserService'];

})();
