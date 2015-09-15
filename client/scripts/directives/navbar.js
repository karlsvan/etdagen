'use strict';

angular.module('clientApp').directive('navbar', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '../templates/navbar.tmpl.html',
        controller: 'NavbarCtrl as navbar'
    }
});
