'use strict';

angular.module('mt.ui')
    /**
     * @ngdoc function
     * @name mt.ui.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Controller of the mt.ui
     */
    .controller('LoginCtrl', function ($scope, $dialog) {
      $scope.showLoginView = function () {
        $scope.loginView = '/views/login/login.html';
      };
      $scope.showLoginView();

      $scope.showCreateAccountView = function () {
        $scope.loginView = '/views/login/createAccount.html';
      };

      $scope.remindPassword = $dialog.simpleDialog('/views/login/remindPasswordModal.html', 'RemindPasswordDialogCtrl');
      $scope.createAccount = $dialog.simpleDialog('/views/login/createAccountModal.html', 'CreateAccountDialogCtrl');
    })
;
