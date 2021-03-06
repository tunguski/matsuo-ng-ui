'use strict';

angular.module('mt.ui')
    /**
     * @ngdoc function
     * @name mt.ui.controller:CreateAccountModalCtrl
     * @description
     * # CreateAccountModalCtrl
     * Controller of the mt.ui
     */
    .controller('CreateAccountModalCtrl', function ($scope, $http, $uibModalInstance) {
      $scope.loginData = {};

      $scope.createAccount = function(isValid) {
        if (isValid) {
          $http.post('/api/login/createAccount', $scope.loginData)
              .success(function (data) {
                toastr.success($scope.translate('dialog.createAccount.success') + '\n' + data);
                $uibModalInstance.close();
              });
        } else {
          $scope.errorClass = 'text-red';
        }
      };

      $scope.close = function() {
        $uibModalInstance.close();
      };
    })
;
