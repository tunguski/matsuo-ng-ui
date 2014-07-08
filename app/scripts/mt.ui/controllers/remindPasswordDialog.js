'use strict';

angular.module('mt.ui')
    /**
     * @ngdoc function
     * @name mt.ui.controller:RemindPasswordDialogCtrl
     * @description
     * # RemindPasswordDialogCtrl
     * Controller of the mt.ui
     */
    .controller('RemindPasswordDialogCtrl', function ($scope, $http, $modalInstance) {
      $scope.remind = {};

      $scope.remindPassword = function() {
        if ($scope.remind.username) {
          $http.post('/api/login/remindPassword/' + $scope.remind.username)
              .success(function () {
                toastr.success('Przesłano email z linkiem zmiany hasła');
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
