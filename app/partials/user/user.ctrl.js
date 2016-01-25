(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:userCtrl
	 * @description
	 * # userCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('userCtrl', userCtrl);

		/*@ngInject*/
		function userCtrl($scope, $state, UserService,$q){
			var deffered = $q.defer();
			$scope.promise = deffered.promise;

			$scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState, fromParams*/) {
				if(toState.name == "user"){
					UserService.getProfile(toParams.id, function(res) {
						console.log(res);
						$scope.user = res;
						if(res.tags) deffered.resolve(res.tags);
						else deffered.reject();
					});
					UserService.getUser(function(user/*,loggedIn,error*/) {
						if (user.status == 'bedrift_betalt'  || user.status == 'crew') {
							/*Find users files*/
								var arr = $scope.user.filer[0].navn.split('_');
								arr.shift();
								$scope.filename = arr.join('_');
							/*end find*/
							$scope.authorizedToSeeFiles = true;
						}
					});
				}
			});
		}
		userCtrl.$inject = ['$scope', '$state', 'UserService', '$q'];
})();
