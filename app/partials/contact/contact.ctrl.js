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
	function ContactCtrl(BoardService) {
		this.boards = BoardService.boards;
	}
	ContactCtrl.$inject = ['BoardService'];
})();

