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
	.controller('ConnectController',ConnectController)

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

	function SettingsCtrl($scope,UserService,$q,$mdDialog,$http) {
		var self = this;
		var deffered = $q.defer();
		$scope.promise = deffered.promise
	    var keyArr = [],contArr = [];

	    UserService.init(function(user,loggedIn,error) {
	    	console.log(JSON.stringify(user));
	    	if (user.connect) {
					connect(user);
			}
			UserService.getProfile(UserService.returnUser().id, function(res) {
				$scope.user = res;
				deffered.resolve(res.tags);
				$scope.cards = toArray(res.cards);
			});
	    })


		/*$scope.$on('$stateChangeSuccess',
	    	function(event, toState, toParams, fromState, fromParams){
	    		if((toState.name == "settings") && UserService.getLoggedIn()){
	    			console.log('hei')
		    		UserService.getProfile(UserService.returnUser().id, function(res) {
	    				$scope.user = res;
	    				deffered.resolve(res.tags);
	    				$scope.cards = toArray(res.cards);
	    				UserService.getUser(function(user,loggedIn,error) {
	    					if (user.connect) {
	    						connect(user);
	    					}
	    				})
	    			});

	    		} else {
	    			deffered.reject('fuck');
	    		}
	    	}
	    );
*/
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
	    
	    function connect(user) {
			//console.log(JSON.stringify(resultat.data));
			$mdDialog.show({
		      controller: 'ConnectController',
		      templateUrl: './partials/settings/connect.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose:true,
		      //controllerAs: 'connCtrl',
		      //bindToController: true,
		      locals: {
		      	user: user,
		      	connect: user.connect
		      }
		    })
		    .then(function(answer) {
		      $scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
		      $scope.status = 'You cancelled the dialog.';
		    })

		}


	}
	SettingsCtrl.$inject = ['$scope', 'UserService', '$q', '$mdDialog','$http'];


	function ConnectController($scope,$mdDialog,user,connect) {
		console.log(user);
		console.log(connect);
		$scope.user = user;
		$scope.connect = connect;
		if (connect.facebookId) {
			$scope.provider = 'Facebook';
		} else if (connect.googleId) {
			$scope.provider = 'Google';			
		} else if (connect.feideId) {
			$scope.provider = 'NTNU';
		}
	}
	//ConnectController.$inject = ['$scope','user','connect']
})();
