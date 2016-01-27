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
	.controller('ConnectController',ConnectController)
	.controller('PasswordController',PasswordController);

	/*@ngInject*/
	function SettingsCtrl($scope,UserService,$q,$mdDialog,$http,FileUploader,$cookies,$window) {
		$scope.cardlist = [];
		$scope.addNewTextCard = function(){
			$scope.cardlist.push({ settingCardType: 'tekst', visible: false, cardTitle: '', htmlcontent: '' });
		};
		$scope.addNewListCard = function(){
			$scope.cardlist.push({ settingCardType: 'liste', visible: false, cardTitle: '', list: [['','']] });
		};
		$scope.deleteCard = function(index){ $scope.cardlist.splice(index, 1); };


		var deffered = $q.defer();
		$scope.promise = deffered.promise;
		$scope.uploader = new FileUploader({url: '/upload',autoUpload:true,removeAfterUpload:true});
		$scope.uploader.onAfterAddingFile = function(item) {
			item.formData.push({size: item.file.size});
		};
		$scope.uploader.onSuccessItem = function(item, response, status, headers) {
			if(!$scope.user.filer){$scope.user.filer = []}
			$scope.user.filer.push({name: item.file.name, size: item.file.size});
		};
		$scope.uploader.onErrorItem = function(item, response, status, headers) {
			alert('Filen er for stor, alle har tilgang til 5MB hver');
		};

		$scope.imgUploader = new FileUploader({url: '/upload',autoUpload:true,removeAfterUpload:true});
		$scope.imgUploader.onAfterAddingFile = function(item) {
			var ext = item.file.name.split('.').pop();
			item.file.name = 'userAvatar.'+ext;
			item.formData.push({size: item.file.size});
		};
		$scope.imgUploader.onSuccessItem = function(item, response, status, headers) {
			$scope.user.bilde = '/filer/'+$scope.user.id+'/'+item.file.name;
			$window.location.reload();
		};
		$scope.imgUploader.onErrorItem = function(item, response, status, headers) {
			alert('Filen er for stor, alle har tilgang til 5MB hver');
		};


		UserService.init( function(user) {
			if (user.connect) connect(user);

			UserService.getProfile(UserService.returnUser().id, function(res) {
				var settings = $cookies.getObject('settings');
				if (settings) {
					res = settings;
					$cookies.remove('settings');
				}
				$scope.user = res;
				$scope.userConnectedTo = {
					facebook: !(res.facebookId === '' || res.facebookId === 'null' || res.facebookId === null || res.facebookId === 0 || !res.facebookId),
					google: !(res.googleId === '' || res.googleId === 'null' || res.googleId === null || res.googleId === 0 || !res.googleId),
					feide: !(res.feideId === '' || res.feideId === 'null' || res.feideId === null || res.feideId === 0 || !res.feideId)
				};
				if(res.tags) { deffered.resolve(res.tags); } else { deffered.reject(); }
				$scope.cardlist = (res.cards instanceof Array) ? res.cards : [];
				// console.log($scope.cardlist);
			});
		});

		$scope.deleteFile = function(index,file) {
			file.index = index;
			$http.post('/deleteFile',file).then(function() {
				$scope.user.filer.splice(index, 1);
			});
		};

	    $scope.changePass = function() {
	    	$mdDialog.show({
		      controller: 'PasswordController',
		      templateUrl: './partials/settings/password.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose:true,
		      locals: {
		      	id: $scope.user.id
		      }
		    });
	    };

	    $scope.saveUser = function() {
	    	//$scope.user.cards = toObject($scope.cards);
			$scope.user.cards = $scope.cardlist;
			console.log($scope.user);
	    	UserService.saveSettings($scope.user);
	    };


		$scope.setCookie = function(url) {
			// $scope.user.cards = toObject($scope.cards);
			$scope.user.cards = $scope.cards;
			// console.log(JSON.stringify($scope.user));
			$cookies.putObject('settings',$scope.user);
			$window.location.href = url;
		};

		function connect(user) {
			$mdDialog.show({
				controller: 'ConnectController',
				templateUrl: './partials/settings/connect.html',
				parent: angular.element(document.body),
				clickOutsideToClose:true,
				locals: {
					user: user,
					connect: user.connect
				}
			})
			.then(function(connect) {
				for(var key in connect) {
					$scope.user[key] = connect[key];
				}
				$http.get('/auth/connect/done');
			}, function() {
				$http.get('/auth/connect/done');
			});
		}
	}
	SettingsCtrl.$inject = ['$scope', 'UserService', '$q', '$mdDialog', '$http', 'FileUploader', '$cookies', '$window'];


	function ConnectController($scope,$mdDialog,user,connect) {
		$scope.radio = {};
		$scope.user = user;
		$scope.connect = connect;
		if (connect.facebookId) {
			$scope.provider = 'Facebook';
			$scope.user.facebookId = connect.facebookId;
			delete connect.facebookId;
		} else if (connect.googleId) {
			$scope.provider = 'Google';
			$scope.user.googleId = connect.googleId;
			delete connect.googleId;
		} else if (connect.feideId) {
			$scope.provider = 'NTNU';
			$scope.user.feideId = connect.feideId;
			delete connect.feideId;
		}

		$scope.save = function() {
			for(var key in $scope.radio) {
				if($scope.radio[key] != 'new') {
					delete $scope.connect[key];
				}
			}
			if ($scope.provider == 'Facebook') {
				$scope.connect.facebookId = $scope.user.facebookId;
			} else if ($scope.provider == 'Google') {
				$scope.connect.googleId = $scope.user.googleId;
			} else if ($scope.provider == 'NTNU') {
				$scope.connect.feideId = $scope.user.feideId;
			}
			$mdDialog.hide($scope.connect);
		};
		$scope.cancel = function() { $mdDialog.cancel(); };
	}
	ConnectController.$inject = ['$scope', '$mdDialog', 'user', 'connect'];

	function PasswordController($scope,$mdDialog,id,UserService) {
		$scope.savePass = function(cred) {
			if ($scope.PassForm.$valid){
				cred.id = id;
				var text;
				UserService.setPass(cred,function(res) {
					if(res.status == 200) {
						text = 'OK!';
					} else if (res.status == 500) {
						text = res.data;
					}
					$mdDialog.show({
						template:'<h1>'+text+'</h1>',
						parent: angular.element(document.body),
						clickOutsideToClose: true
					});
				});
			}
		};
	}
	PasswordController.$inject = ['$scope', '$mdDialog', 'id', 'UserService'];
})();
