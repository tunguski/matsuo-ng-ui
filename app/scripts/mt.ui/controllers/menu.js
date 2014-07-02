'use strict';

/**
 * @ngdoc function
 * @name mt.ui.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the mt.ui
 */
angular.module('mt.ui')
    .controller('MenuCtrl', function ($scope, menuService, permissionService) {
      $scope.menuService = menuService;
    });
