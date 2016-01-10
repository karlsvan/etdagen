(function(){
	'use strict';


	angular.module('etApp')
	  .factory('SearchService', SearchService);
	  	function SearchService($http) {

			return {

				update : function(text,coll,callback) {
					var search = {text:text,coll:coll};
					$http.post('/search',search).then(function successCB(res) {
						var users = [];
						res.data.forEach(function(element,index) {
							users[index]= {
								img: element.bilde || '/assets/images/avatar.jpg',
								name: element.fornavn+' '+element.etternavn,
								usertype: 'student'
							};
						});
						callback(users);
					});
				}, 

				getProfile : function(id, callback) {
					$http.get('/user/'+id).then(function(res) {
						console.log(res.data);
						callback(res.data);
					}, function(res) {
						console.log(res.data);
					});
				},

				getTags: function(callback) {
					$http.get('/tags').then(function(res) {
						//console.log(res.data);
						callback(res.data);
					}, function(res) {
						console.log('getTags error: '+res.data);
					});
				}
			};
		}

	SearchService.$inject = ['$http'];
})();
