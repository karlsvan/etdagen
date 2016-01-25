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
		var self = this;
		var deffered = $q.defer();
		$scope.promise = deffered.promise
	    var keyArr = [],contArr = [];
	    $scope.uploader = new FileUploader({url: '/upload',autoUpload:true,removeAfterUpload:true});
	    $scope.uploader.onAfterAddingFile = function(item) {
		    item.formData.push({size: item.file.size});
		}
		$scope.uploader.onSuccessItem = function(item, response, status, headers) {
			console.log('yey!');
		}
		$scope.uploader.onErrorItem = function(item, response, status, headers) {
			console.log('For stor fil');
		}

	    UserService.init(function(user,loggedIn,error) {
	    	if (user.connect) {
					connect(user);
			}
			UserService.getProfile(UserService.returnUser().id, function(res) {
				var settings = $cookies.getObject('settings');
				if (settings) {
					res = settings;
					$cookies.remove('settings');
				}
				$scope.user = res;
				if(res.tags) {
					deffered.resolve(res.tags);
				} else {
					deffered.reject();
				}
				$scope.cards = populateCards(res.cards);
			});
	    })

	    $scope.deleteFile = function() {
	    	$http.post('/deleteFile',$scope.user.filer[0]).then(function() {
	    		$scope.user.filer = [];
	    	})
	    }

	    $scope.continueCards = function(role,cardIndex,index) {
	    	if ($scope.cards.length-1 == cardIndex) {
	    		$scope.cards.push(['',[['','']]]);
	    	}

	    	if (role == 'key' || role == 'value') {
	    		if ($scope.cards[cardIndex][1].length-1 == index) {
	    			$scope.cards[cardIndex][1].push(['','']);
	    		}
	    	}
	    }

	    $scope.setCookie = function(url) {
	    	$scope.user.cards = toObject($scope.cards);
	    	console.log(JSON.stringify($scope.user))
	    	$cookies.putObject('settings',$scope.user);
	    	$window.location.href = url;
	    }

	    $scope.changePass = function() {
	    	$mdDialog.show({
		      controller: 'PasswordController',
		      templateUrl: './partials/settings/password.html',
		      parent: angular.element(document.body),
		      clickOutsideToClose:true,
		      locals: {
		      	id: $scope.user.id
		      }
		    })
		    .then(function() {

		    }, function() {

		    })
	    }

	    function populateCards(cards) {
	    	if(typeof cards === 'object') {cards = toArray(cards)}
	    	if(cards.length < 1) {
				cards = [['Ny info om deg',[['stikkord','text'],['stikkord','text']]]];
				return cards
			} else {
				for (var i = cards.length - 1; i >= 0; i--) {
					cards[i][1].push(['','']);
				};
				cards.push(['',[['','']]]);
				return cards
			}

	    }

	    function equalArray(arr1,arr2) {
	    	console.log(arr1+' | '+arr2);
	    	if (arr1.length != arr2.length) {
	    		return false
	    	}

	    	if (typeof arr1 === 'string' || typeof arr2 === 'string') {
	    		if (typeof arr1 == typeof arr2) {
	    			if(arr1 == arr2) {
	    				return true;
	    			} else {
	    				return false
	    			}
	    		} else {
	    			return false
	    		}
	    	}
	    	for (var i = arr1.length - 1; i >= 0; i--) {
	    		if(equalArray(arr1[i],arr2[i])) {
	    			continue;
	    		} else {
	    			return false;
	    		}
	    	};
	    	return true
	    	

	    }

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
	    		if (element[0] == '' || element[1] == '') {
	    			return;
	    		}
	    		obj[element[0]] = toObject(element[1]);
	    	})

	    	return obj;
	    }

	    $scope.saveUser = function() {
	    	$scope.user.cards = toObject($scope.cards);
	    	UserService.saveSettings($scope.user);
	    }
	    
	    function connect(user) {
			if (Object.keys(user.connect).length == 0) {
				return;
			}
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
		    	$http.get('/auth/connect/done')
		    }, function() {
		      $http.get('/auth/connect/done')
		    })

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
			$mdDialog.hide($scope.connect)
		}
	}
	ConnectController.$inject = ['$scope', '$mdDialog', 'user', 'connect'];

	function PasswordController($scope,$mdDialog,id,UserService) {
		$scope.savePass = function(cred) {
			if ($scope.PassForm.$valid){
				cred.id = id;
				UserService.setPass(cred,function(res) {
					if(res.status == 200) {
						var text = 'OK!';
					} else if (res.status = 500) {
						var text = res.data;
					}
					$mdDialog.show({
		      			template:'<h1>'+text+'</h1>',
		      			parent: angular.element(document.body),
		      			clickOutsideToClose:true

	      			});
				})
			}
		}
	}
	PasswordController.$inject = ['$scope', '$mdDialog', 'id', 'UserService'];
})();
