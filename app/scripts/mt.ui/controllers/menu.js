'use strict';

/**
 * @ngdoc function
 * @name mt.ui.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the mt.ui
 */
angular.module('mt.ui')
    .controller('MenuCtrl', function ($scope, $rootScope, $location, $route, menuService, permissionService) {
      $scope.menuService = menuService;

      $scope.homeLink = function () {
        $location.url($route.routes['null']);
      };

      $scope.displayUser = function () {
        if ($scope.user) {
          if ($scope.user.person.firstName || $scope.user.person.lastName) {
            return ($scope.user.person.firstName || '') + ' ' + ($scope.user.person.lastName || '');
          } else {
            return $scope.user.username;
          }
        } else {
          return '[]';
        }
      }
    });
