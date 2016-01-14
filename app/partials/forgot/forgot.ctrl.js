(function(){
	'use strict';

	angular.module('etApp')
	  .controller('forgotCtrl', forgotCtrl);

	  	/*@ngInject*/
	  	function forgotCtrl($mdDialog, $http) {
	  		var self = this;

	    	this.getNewPass = function(email) {
	    		self.waitingDialog();
			    $http.post('/forgot', email).then(function successCB(res) {
			    	self.showDialog('success','successfully reset password. You will recive an email with your new password');
			    }, function errorCB(res) {
			    	if(res.status == 404){
			    		self.showDialog('Beklager','Vi fant ikke adressen din i vår database');
			    	}
			    });
	      	};

	      	this.showDialog = function(title, content) {
	      		$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .clickOutsideToClose(true)
			        .title(title)
			        .textContent(content)
			        .ariaLabel('popup')
			        .ok('OK!')
    			);
	      	}

	      	this.waitingDialog = function() {
	      		$mdDialog.show({
	      			title: 'Vennligst vent',
	      			templateUrl:'./partials/forgot/wait.html',
	      			parent: angular.element(document.body)
	      		});
	      	}

	    }
	    forgotCtrl.$inject = ['$mdDialog', '$http'];

})();