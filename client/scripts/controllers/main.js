'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * This controller is defined for the whole app as 'app'. Every variable, function, etc. defined in this controller will be available in the whole application. Use this to define global app variables.
 */
angular.module('clientApp')
  .controller('MainCtrl', function () {
  		this.title = 'E&T-Dagen';
  		this.year = 2016;
    });
