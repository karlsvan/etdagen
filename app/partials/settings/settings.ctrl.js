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
		// $scope.oldCardlist = [
		// 	{ settingCardType: 'tekst', visible: true, cardTitle: 'Bio', htmlcontent: '' },
		// 	{ settingCardType: 'liste', visible: false, cardTitle: 'Utdanning', list: [['Juni 08 - Juli 09', 'Skolen vgs']] }
		// ];
		// $scope.cardlist = $scope.oldCardlist;
		$scope.cardlist = [];

		$scope.addNewTextCard = function(){
			$scope.cardlist.push({ settingCardType: 'tekst', visible: false, cardTitle: '', htmlcontent: '' });
		};
		$scope.addNewListCard = function(){
			$scope.cardlist.push({ settingCardType: 'liste', visible: false, cardTitle: '', list: [['','']] });
		};
		$scope.deleteCard = function(index){ $scope.cardlist.splice(index, 1); };
		// $scope.saveCard = function(index){  }






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
				if(res.tags) {
					deffered.resolve(res.tags);
				} else {
					deffered.reject();
				}
				$scope.cards = populateCards(res.cards);
			});
	    })

	    $scope.deleteFile = function(file,index) {
	    	file.index = index;
	    	$http.post('/deleteFile',file).then(function() {
	    		$scope.user.filer.slice(index,1);
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
	    };
	    

		$scope.setCookie = function(url) {
			// $scope.user.cards = toObject($scope.cards);
			$scope.user.cards = $scope.cards;
			// console.log(JSON.stringify($scope.user));
			$cookies.putObject('settings',$scope.user);
			$window.location.href = url;
		};


		function populateCards(cards) {
			if (!(cards instanceof Array)){
				console.error('cards is not an array.\n', cards);
				return []; // return empty
			} else {
				// console.log(cards);
				return cards;
			}
		};

		function equalArray(arr1,arr2) {
			// console.log(arr1+' | '+arr2);
			if (arr1.length != arr2.length) {
				return false;
			}

			if (typeof arr1 === 'string' || typeof arr2 === 'string') {
				if (typeof arr1 == typeof arr2) {
					if(arr1 == arr2) {
						return true;
					} else return false;
				} else return false;
			}
			for (var i = arr1.length - 1; i >= 0; i--) {
				if(equalArray(arr1[i],arr2[i])) {
					continue;
				} else {
					return false;
				}
			}
			return true;
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
				if (element[0] === '' || element[1] === '') return;
				obj[element[0]] = toObject(element[1]);
			});
			return obj;
		}

		$scope.saveUser = function() {
			// $scope.user.cards = toObject($scope.cards);
			$scope.user.cards = $scope.cardlist;
			// console.log($scope.user);
			UserService.saveSettings($scope.user);
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
