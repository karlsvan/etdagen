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
		var self = this;
		this.formError = null;
		$scope.form = {};
		this.registerOptions = [
			{label: 'Fornavn',			inputType: 'text',		model: 'fornavn',		required: true},
			{label: 'Etternavn',		inputType: 'text',		model: 'etternavn',		required: true},
			{label: 'Epost',			inputType: 'email',		model: 'email',			required: true},
			{label: 'Passord',			inputType: 'password',	model: 'password',		required: true},
			{label: 'Bekreft Passord',	inputType: 'password',	model: 'rpassword',		required: true},
			/* Optional register fields */
			/*{label: 'Telefonnummer',	inputType: 'number',	model: 'tlf',			required: false},
			{label: 'Utgangsår', 		inputType: 'number',	model: 'utgangsaar',	required: false},
			{label: 'Linje',			inputType: 'text',		model: 'linje',			required: false},
			{label: 'Fødselsdato',		inputType: 'date',		model: 'fodselsdato',	required: false}*/
			//{label: 'Brukernavn',		inputType: 'text',		model: 'username',		required: false},
		];
		this.register = function() {
			if($scope.registerForm.$valid) {
				delete $scope.form.rpassword;
				alert(JSON.stringify($scope.form));
				UserService.register($scope.form, function(error){
					self.formError = error;
					alert(JSON.stringify(error));
				});
			}
			else {self.formError = 'Vennligst fyll inn påkrevde felt'; alert('feil')}
		};
	}
	RegisterCtrl.$inject = ['$scope', 'UserService'];
})();
