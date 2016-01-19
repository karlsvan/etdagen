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
	function ContactCtrl(BoardService, $scope, $mdToast, $http, $mdDialog) {
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

		$scope.showTabDialog = function($event) {
			$mdDialog.show({
				controller: 'boardDialogCtrl',
				template:
				'<md-dialog flex="80">'+
					'<md-toolbar class="md-primary md-hue-2">'+
						'<div class="md-toolbar-tools">'+
						'<h2>Oversikt over styremedlemmer</h2>'+
						'<span flex></span>'+
						'<md-button class="md-icon-button" ng-click="cancel()">'+
							'<i class="fa fa-times fa-lg" aria-label="Close dialog"></i>'+
						'</md-button>'+
						'</div>'+
					'</md-toolbar>'+
					'<md-dialog-content>'+
						'<md-tabs ng-selected="selectIndex" md-dynamic-height md-border-bottom>'+
							'<md-tab ng-repeat="tab in tabs" ng-disabled="tab.disabled" label="{{tab.label}}">'+
								'<div layout="row" layout-align="center center" layout-wrap>'+
									'<div layout="column" ng-repeat="person in tab.board" style="margin: 1em 2em;" layout-align="center center">'+
										'<div class="circular circular-200">'+
											'<img ng-src="/assets/images/boards/{{person.img}}" width="100%">'+
										'</div>'+
										'<div class="md-body-1">{{person.name}}</div>'+
									'</div>'+
								'</div>'+
							'</md-tab>'+
						'</md-tabs>'+
					'</md-dialog-content>'+
				'</md-dialog>',
				parent: angular.element(document.body),
				targetEvent: $event,
				clickOutsideToClose:true
			});
		};

		this.sendMail = function($event){
			if(!$scope.form.$valid){
				showToast('Vennligst fyll ut alle feltene');
			} else {
				$http.post('/contact', $scope.form).then(function sucsessCB(res) {
					showToast('Melding sendt');
					clearForm();
				},function errorCB(res) {
					showToast('Noe gikk galt');
				});

			}
		};
	}
	ContactCtrl.$inject = ['BoardService', '$scope', '$mdToast', '$http', '$mdDialog'];
})();
