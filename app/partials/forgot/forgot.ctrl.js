(function(){
	'use strict';

	angular.module('etApp')
	  .controller('forgotCtrl', forgotCtrl);

	  	/*@ngInject*/
	  	function forgotCtrl($mdDialog, $http) {
	  		var self = this;

	    	this.getNewPass = function(email) {
			    $http.post('/forgot', email).then(function successCB(res) {
			    	self.showDialog('success','successfully reset password. You will recive an email with your new password');
			    }, function errorCB(res) {
			    	self.showDialog('error',JSON.stringify(res.data));
			    });
	      	};

	      	this.showDialog = function(title, content) {
	      		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.querySelector('body')))
			        .clickOutsideToClose(true)
			        .title(title)
			        .textContent(content)
			        .ariaLabel('popup')
			        .ok('OK!')
    			);
	      	}

	    }
	    forgotCtrl.$inject = ['$mdDialog', '$http'];

})();