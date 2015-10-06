(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.controller:NewsCtrl
	 * @description
	 * # NewsCtrl
	 * Controller of the etApp
	 */
	angular.module('etApp')
	  .controller('NewsCtrl', NewsCtrl);

		/*@ngInject*/
		function NewsCtrl(NewsService){
			this.news = NewsService.getNews();

			this.tiles = (function(){
				var ret = [],
					color =  ['red', 'green', 'darkBlue', 'pink', 'yellow', 'purple'];
				for(var i=0; i<12; i++){
					ret.push({
						background: color[Math.round(Math.random()*(color.length-1))],
						span: { row: Math.round(Math.random()*(3-1)+1), col: Math.round(Math.random()*(3-1)+1) }
					});
				}
				return ret;
			})();
		}
		NewsCtrl.$inject = ["NewsService"];
})();