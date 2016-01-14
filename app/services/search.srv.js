(function(){
	'use strict';


	angular.module('etApp')
	  .factory('SearchService', SearchService);
	  	function SearchService($http) {

			return {

				update : function(callback) {
					$http.get('/search').then(function successCB(res) {
						var users = [];
						res.data.forEach(function(element,index) {
							users[index]= {
								img: element.bilde || '/assets/images/avatar.png',
								id: element.id,
								name: element.fornavn+' '+element.etternavn,
								usertype: element.status,
								tags: element.tags
							};
						});
						callback(users);
					});
				}, 

				getProfile : function(id, callback) {
					$http.get('/user/'+id).then(function(res) {
						//console.log(res.data);
						callback(res.data);
					}, function(res) {
						console.log(res.data);
					});
				}
			};
		}

	SearchService.$inject = ['$http'];
})();
