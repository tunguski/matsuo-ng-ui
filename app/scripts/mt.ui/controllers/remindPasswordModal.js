'use strict';

angular.module('mt.ui')
    /**
     * @ngdoc function
     * @name mt.ui.controller:RemindPasswordModalCtrl
     * @description
     * # RemindPasswordModalCtrl
     * Controller of the mt.ui
     */
    .controller('RemindPasswordModalCtrl', function ($scope, $http, $modalInstance) {
      $scope.remind = {};

      $scope.remindPassword = function() {
        if ($scope.remind.username) {
          $http.post('/api/login/remindPassword/' + $scope.remind.username)
              .success(function () {
                toastr.success($scope.translate('dialog.remindPassword.success'));
                $modalInstance.close();
              });
        } else {
          $scope.errorClass = 'text-red';
        }
      };

      $scope.close = function() {
        $modalInstance.close();
      };
    })
;
