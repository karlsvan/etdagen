(function(){
	'use strict';

	/*
	*	@ngdoc function
	*	@name etApp.directive:settingCard
	*	@description
	*	# Components
	*	Components for the etApp
	*/
	angular.module('etApp')
		.directive('settingCard', settingCard)
		.controller('settingCardCtrl', settingCardCtrl);

		/*@ngInject*/
		function settingCard(){
			return {
				restrict: 'E',
				replace: true,
				scope: {
					settingCardType: '=', /* Either text or list */
					visible: '=', /* Visibility in profile */
					cardTitle: '=?',
					list: '=?'
					// htmlcontent: '=?'
				},
				templateUrl: './components/setting-card/setting-card.tmpl.html',
				controller: 'settingCardCtrl as settingCard'
			};
		}

		/*@ngInject*/
		function settingCardCtrl($scope){
			var testvar = 'Testvar';
			$scope.htmlcontent = testvar;
			$scope.addListField = function(){ $scope.list.push(['','']); };
			$scope.deleteListField = function(index) { $scope.list.splice(index, 1); };
			$scope.toggleVisible = function(){ $scope.visible = !$scope.visible; };
			$scope.showHtmlContent = function(){ console.log($scope.htmlcontent); };
		}
		settingCardCtrl.$inject = ['$scope'];
})();
