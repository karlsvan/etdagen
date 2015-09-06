'use strict';

/**
 * @ngdoc service
 * @name clientApp.news
 * @description
 * # news
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('newsService', ['$http', '$q', function ($http, $q) {

      // Public service methods
      function getNews(){
          var request = $http({
              method: 'GET',
              url: '/api/news'
          });
          return request.then(handleSuccess, handleError);
      }

      function addNews(title, content){
        var request = $http({
            method: 'POST',
            url: 'api/news',
            params: {
              action: 'add'
            },
            data: {
              title: title,
              content: content
            }
        });
        return request.then(handleSuccess, handleError);
      }

      function removeNews(id){
        var request = $http({
            method: 'DELETE',
            url: 'api/news',
            params: {
              action: 'delete'
            },
            data: {
              id: id
            }
        });
        return request.then(handleSuccess, handleError);
      }

      // Local service methods
      function handleError(response){
          if( !angular.isObject(response.data) || !response.data.message ){
            return $q.reject('an unknown error occured');
          } else {
            return $q.reject(response.data.message);
          }
      }

      function handleSuccess(response) {
          return response.data;
      }
      

      // Public API methods for this service
      return({
          getNews: getNews,
          addNews: addNews,
          removeNews: removeNews
      });
  }]);
