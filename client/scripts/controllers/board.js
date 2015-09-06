'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('BoardCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
