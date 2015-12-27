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
								img: '/assets/images/avatar.jpg',
								name: element.fornavn+' '+element.etternavn,
								usertype: 'student'
							};
						});
						callback(users);
					});
				}
			};
		}

	SearchService.$inject = ['$http'];
})();
