(function(){
	'use strict';

	
	angular.module('etApp')
	  .factory('SearchService', SearchService);
	  	function SearchService($http) {

			return {

				update : function(text,coll) {
					var search = {text:text,coll:coll};
					$http.post('/search',search).then(function successCB(res) {
						callback(res.data);
					},function errorCB() {

					})
				}

			};

		};

	SearchService.$inject = ['$http'];
})()



