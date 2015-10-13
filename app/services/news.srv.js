(function(){
	'use strict';

	/**
	 * @ngdoc function
	 * @name etApp.service:NewsService
	 * @description
	 * # NewsService
	 * Service of the etApp
	 */
	angular.module('etApp')
	  .service('NewsService', NewsService);

	  	function getNews(){
	  		return [
	  			{
	  				title: 'This is an example news template',
	  				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem ipsum vel earum recusandae consequuntur, est molestias officiis distinctio necessitatibus, fugit quasi consectetur dicta. Eaque, esse labore quis deleniti placeat illum.'
	  			},
	  			{
	  				title: 'The Second test for the news',
	  				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi accusamus ut quam aut dolore impedit, animi et voluptate id sunt temporibus vel veniam repudiandae! Possimus cum voluptatibus accusamus quidem itaque.'
	  			},
	  			{
	  				title: 'This is an example news template',
	  				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem ipsum vel earum recusandae consequuntur, est molestias officiis distinctio necessitatibus, fugit quasi consectetur dicta. Eaque, esse labore quis deleniti placeat illum.'
	  			},
	  			{
	  				title: 'The Second test for the news',
	  				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi accusamus ut quam aut dolore impedit, animi et voluptate id sunt temporibus vel veniam repudiandae! Possimus cum voluptatibus accusamus quidem itaque.'
	  			},
	  			{
	  				title: 'This is an example news template',
	  				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem ipsum vel earum recusandae consequuntur, est molestias officiis distinctio necessitatibus, fugit quasi consectetur dicta. Eaque, esse labore quis deleniti placeat illum.'
	  			},
	  			{
	  				title: 'The Second test for the news',
	  				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi accusamus ut quam aut dolore impedit, animi et voluptate id sunt temporibus vel veniam repudiandae! Possimus cum voluptatibus accusamus quidem itaque.'
	  			}
	  		]
	  	}

		/*@ngInject*/
		function NewsService(){
			this.getNews = getNews;
		}
})();