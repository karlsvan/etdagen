(function(){
	'use strict';

	/**
	* @ngdoc function
	* @name etApp.controller:boardDialogCtrl
	* @description
	* # boardDialogCtrl
	* Controller of the etApp
	*/
	angular.module('etApp')
	.controller('boardDialogCtrl', boardDialogCtrl);

	/*@ngInject*/
	function boardDialogCtrl($scope, BoardService, $mdDialog) {
		var boards = BoardService.boards;
		$scope.tabs = [
			{label: '2016', disabled: false, board: boards.y16},
			{label: '2015', disabled: false, board: boards.y15},
			{label: '2014', disabled: false, board: boards.y14},
			{label: '2013', disabled: false, board: boards.y13},
			{label: '2012', disabled: false, board: boards.y12},
			{label: '2011', disabled: false, board: boards.y11},
			{label: '2010', disabled: false, board: boards.y10}
		];
		$scope.selectIndex = 1;
		$scope.cancel = function(){ $mdDialog.hide(); };
	}
	boardDialogCtrl.$inject = ['$scope', 'BoardService', '$mdDialog'];
})();
