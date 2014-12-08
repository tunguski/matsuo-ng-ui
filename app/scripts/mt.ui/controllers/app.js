'use strict';

angular.module('mt.ui')
  /**
   * @ngdoc function
   * @name mt.ui.service:baseAppCtrl
   * @description
   * # baseAppCtrl
   * Service of the mt.ui
   */
    .service('baseAppCtrl', function ($route, $rootScope, $location, $timeout, $dialog, userGroupConfiguration, Login) {
      return function ($scope) {
        $scope.loginData = {};


        if ($rootScope.user) {
          userGroupConfiguration.refreshAppUserConfiguration();
        }

        $rootScope.$on('loggedIn', userGroupConfiguration.refreshAppUserConfiguration);


        $scope.afterLogged = function (data) {
          Login.getUser(scopeSetter($rootScope, 'user')).$promise.then(function (user) {
            $scope.loginData = {};
            $scope.errorClass = '';
            $rootScope.loggedIn = !!data;
            $scope.showWrongPasswordMessage = false;

            $rootScope.$broadcast('loggedIn');
            $route.reload();
            //$location.url('');
          });
        };


        $scope.isLoggedIn = function () {
          return $rootScope.loggedIn === true;
        };


        $scope.isLoggedOff = function () {
          return $rootScope.loggedIn === false;
        };


        $scope.checkIsLogged = function () {
          Login.get(function(data) {
            if (data && !$rootScope.loggedIn) {
              $scope.afterLogged(data);
            } else if (!data) {
              $rootScope.loggedIn = false;
            }
          });
        };
        $scope.checkIsLogged();


        $scope.login = function() {
          Login.login($scope.loginData,
              function(data) {
                $scope.afterLogged(data);
                toastr.success($scope.translate('login.success'));
              },
              function () {
                $scope.errorClass = 'text-red';
                $scope.showWrongPasswordMessage = true;
              });
        };

        $scope.hideWrongPasswordMessage = function () {
          $scope.showWrongPasswordMessage = false;
        };


        $scope.logoff = function() {
          Login.logoff(function () {
            $rootScope.loggedIn = false;
          });
        };

        $timeout(function() {
          $('.hidden-on-startup').removeClass('hidden-on-startup');
        }, 200);
      };
    })

    /**
     * @ngdoc function
     * @name mt.ui.controller:AppCtrl
     * @description
     * # AppCtrl
     * Controller of the mt.ui
     */
    .controller('AppCtrl', function ($scope, baseAppCtrl) {
      baseAppCtrl($scope);
    })
;
