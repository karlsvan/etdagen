(function(){
	'use strict';

	/**
	* @ngdoc function
	* @name etApp.controller:ContactCtrl
	* @description
	* # ContactCtrl
	* Controller of the etApp
	*/
	angular.module('etApp')
	.controller('ContactCtrl', ContactCtrl);

	/*@ngInject*/
	function ContactCtrl(BoardService, $scope, $mdToast) {
		this.boards = BoardService.boards;

		function clearForm(){
			$scope.form.name='';
			$scope.form.email='';
			$scope.form.subject='';
			$scope.form.message='';
			$scope.form.$setPristine();
			$scope.form.$setUntouched();
		}
		function showToast(message){
			$mdToast.show(
				$mdToast.simple()
					.content(message)
					.position('bottom right')
					.hideDelay(3000)
					.parent(angular.element(document.getElementById('toastParent')))
			);
		}

		this.sendMail = function($event){
			if(!$scope.form.$valid){
				showToast('Vennligst fyll ut alle feltene');
			} else {
				showToast('Melding sendt');
				clearForm();
			}
		};
	}
	ContactCtrl.$inject = ['BoardService', '$scope', '$mdToast'];
})();

