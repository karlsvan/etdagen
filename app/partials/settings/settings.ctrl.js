(function(){
	'use strict';

	/**
	* @ngdoc function
	* @name etApp.controller:SettingsCtrl
	* @description
	* # SettingsCtrl
	* Controller of the etApp
	*/
	angular.module('etApp')
	.controller('SettingsCtrl', SettingsCtrl)
	.controller('UploadController', UploadEditor)

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
				onComplete: afterShowAnimation,
				locals: { Upload: $scope.userName }
			});

			// When the 'enter' animation finishes...

			function afterShowAnimation(scope, element, options) {
				// post-show code here: DOM element focus, etc.
			}
		}
	}
	UploadEditor.$inject = ['$scope', '$mdDialog'];

	function SettingsCtrl($scope,UserService,$q) {
		var self = this;
		var deffered = $q.defer();
		$scope.promise = deffered.promise
	    var keyArr = [],contArr = [];

		$scope.$on('$stateChangeSuccess',
	    	function(event, toState, toParams, fromState, fromParams){
	    		if((toState.name == "settings") && UserService.getLoggedIn()){
		    		UserService.getProfile(UserService.returnUser().id, function(res) {
		    			//console.log(res);
	    				$scope.user = res;
	    				deffered.resolve(res.tags);
	    				$scope.cards = toArray(res.cards);
	    			});
	    		} else {
	    			deffered.reject('fuck');
	    		}
	    	}
	    );

	    function toArray(obj) {
	    	if(typeof obj === 'string') {
	    		return obj;
	    	}
	    	var arr = [];
	    	var i = 0;
	    	for (var key in obj) {
	    		arr[i] = [key];
	    		arr[i][1] = toArray(obj[key]);
	    		i++;
	    	}
	    	return arr;
	    }

	    function toObject(arr) {
	    	if(typeof arr === 'string') {
	    		return arr;
	    	}
	    	var obj = {};
	    	arr.forEach(function(element,index,arr) {
	    		obj[element[0]] = toObject(element[1]);
	    	})

	    	return obj;
	    }

	    $scope.saveUser = function() {
	    	//console.log($scope.user);
	    	console.log(JSON.stringify(toObject($scope.cards)));
	    	//UserService.saveUser($scope.user);
	    }





	}
	SettingsCtrl.$inject = ['$scope','UserService','$q'];
})();
