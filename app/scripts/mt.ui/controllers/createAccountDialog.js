'use strict';

angular.module('mt.ui')
    /**
     * @ngdoc function
     * @name mt.ui.controller:CreateAccountDialogCtrl
     * @description
     * # CreateAccountDialogCtrl
     * Controller of the mt.ui
     */
    .controller('CreateAccountDialogCtrl', function ($scope, $http, $modalInstance) {
      $scope.loginData = {};

      $scope.createAccount = function(isValid) {
        if (isValid) {
          $http.post('/api/login/createAccount/', $scope.loginData)
              .success(function (data) {
                toastr.success('Przesłano email z linkiem. Proszę kliknąć aby potwierdzić zgodność adresu email\n' + data);
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
