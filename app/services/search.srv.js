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
								usertype: element.status || 'student',
								tags: element.tags
							};
						});
						callback(users);
					});
				}
			};
		}

	SearchService.$inject = ['$http'];
})();
