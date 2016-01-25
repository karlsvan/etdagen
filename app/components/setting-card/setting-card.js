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
					list: '=?',
					htmlcontent: '=?',
					deleteCard: '&?',
					saveCard: '&?'
				},
				templateUrl: './components/setting-card/setting-card.tmpl.html',
				controller: 'settingCardCtrl as settingCard'
			};
		}

		/*@ngInject*/
		function settingCardCtrl($scope, $attrs){
			var self = this;
			self.addListField = function(){ $scope.list.push(['','']); };
			self.deleteListField = function(index) { $scope.list.splice(index, 1); };
			self.toggleVisible = function(){ $scope.visible = !$scope.visible; };
			self.showHtmlContent = function(){
				console.log({cardTitle: $scope.cardTitle, settingCardType: $scope.settingCardType, visible: $scope.visible, list: $scope.list, htmlcontent: self.htmlcontent});
			};
			self.deleteCard = function(index){console.log('index: ', index); };
			self.updateHtmlcontent = function(htmlcontent){
				$scope.htmlcontent = htmlcontent;
			}
		}
		settingCardCtrl.$inject = ['$scope', '$attrs'];
})();
