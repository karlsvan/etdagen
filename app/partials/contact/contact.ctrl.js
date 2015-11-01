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
		this.sendMail = function($event){
			alert($scope.form.name);
		};
	}
	ContactCtrl.$inject = ['BoardService', '$scope', '$mdToast'];
})();

