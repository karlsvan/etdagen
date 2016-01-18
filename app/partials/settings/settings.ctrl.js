(function(){
	'use strict';

	/**
	* @ngdoc function
	* @name etApp.controller:SettingsCtrl
	* @description
	* # SettingsCtrl
	* Controller of the etApp
	*/
	UploadEditor.$inject = ['$scope', '$mdDialog'];
	angular.module('etApp')
	.controller('SettingsCtrl', SettingsCtrl)
	.controller('UploadController', UploadEditor);

	/*@ngInject*/
	function UploadEditor($scope, $mdDialog) {
		var alert;

		$scope.showAlert = showAlert;
		$scope.closeAlert = closeAlert;
		$scope.showUpload = showCustomUpload;

		function showAlert() {
			$mdDialog
			.show( alert )
			.finally(function() {
				alert = undefined;
			});
		}

		function closeAlert() {
			$mdDialog.hide( alert, "finished" );
			alert = undefined;
		}

		function showCustomUpload($event) {
			$mdDialog.show({
				targetEvent: $event,
				template:
			     '<md-dialog aria-label="Upload dialog">' +
	         '  <md-dialog-content>'+
					 '		<form class="md-dialog-content" action="upload.php" method="post" enctype="multipart/form-data">' +
				   '		    Select image to upload:' +
				   '		    <input type="file" name="fileToUpload" id="fileToUpload">' +
				   '		    <input type="submit" value="Upload Image" name="submit" ng-click="closeDialog()">' +
				   '		</form>' +
	         '  </md-dialog-content>' +
	         '</md-dialog>',
				locals: { Upload: $scope.userName }
			});
		}
	}

	function SettingsCtrl($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		var self = this;

		self.readonly = false;
		self.selectedItem = null;
		self.searchText = null;
		self.querySearch = querySearch;
		self.vegetables = loadVegetables();
		self.selectedVegetables = [];
		self.numberBuffer = '';
		self.autocompleteDemoRequireMatch = false;
		self.transformChip = transformChip;

		/**
		* Return the proper object when the append is called.
		*/
		function transformChip(chip) {
			// If it is an object, it's already a known chip
			if (angular.isObject(chip)) {
				return chip;
			}

			// Otherwise, create a new one
			return { name: chip, type: 'new' };
		}

		/**
		* Search for vegetables.
		*/
		function querySearch (query) {
			var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
			return results;
		}

		/**
		* Create filter function for a query string
		*/
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);

			return function filterFn(vegetable) {
				return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
				(vegetable._lowertype.indexOf(lowercaseQuery) === 0);
			};

		}

		function loadVegetables() {
			var veggies = [
				{
					'name': 'Broccoli',
					'type': 'Brassica'
				},
				{
					'name': 'Cabbage',
					'type': 'Brassica'
				},
				{
					'name': 'Carrot',
					'type': 'Umbelliferous'
				},
				{
					'name': 'Lettuce',
					'type': 'Composite'
				},
				{
					'name': 'Spinach',
					'type': 'Goosefoot'
				}
			];

			return veggies.map(function (veg) {
				veg._lowername = veg.name.toLowerCase();
				veg._lowertype = veg.type.toLowerCase();
				return veg;
			});
		}

	}
	SettingsCtrl.$inject = ['$scope'];
})();
