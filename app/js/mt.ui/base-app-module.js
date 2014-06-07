/**
 * Created by marek on 03.03.14.
 */
angular.module('mt.core', [ 'ngResource', 'mt.route', 'mt.ui'])
    .config(function($routeProvider, $httpProvider, $sceProvider) {
      // Completely disable SCE.  For demonstration purposes only!
      // Do not use in new projects.
      $sceProvider.enabled(false);

      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
    })


    .run(function ($rootScope, $injector) {
      $rootScope.getService = function (name) {
        return $injector.get(name);
      };
      $rootScope.hasService = function (name) {
        return $injector.has(name);
      };
    });


angular.module('mt.translate', ['pascalprecht.translate'])

    .config(function ($translateProvider) {
      // tell angular-translate to use your custom handler
      $translateProvider.useMissingTranslationHandler('mtTranslateHandlerFactory');
    })

    .run(function ($rootScope, $translate) {
      // provide $translate service to all scopes
      $rootScope.translate = $translate.instant;
    })

    // define custom handler
    .factory('mtTranslateHandlerFactory', function ($translate) {
      // has to return a function which gets a tranlation ID
      return function (translationID) {
        if (translationID.lastIndexOf('.') > 0) {
          var translation = $translate.instant(translationID.substr(translationID.lastIndexOf('.') + 1));
          return _.endsWith(translationID, translation) ? translationID : translation;
        } else {
          return translationID;
        }
      };
    });
;


function baseAppController($scope, $route, $rootScope, $location, $timeout, $dialog, userGroupConfiguration, Login) {
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
      $location.url('');
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

  $scope.remindPassword = function() {
    $dialog.simpleDialog('login/remindPassword.html', 'RemindPasswordDialogController')();
  };

  $timeout(function() {
    $('.hidden-on-startup').removeClass('hidden-on-startup');
  }, 200);
}


// default resource factory building function
var restFactory = buildRestFactory(angular.module('mt.core'));


restFactory('Login', {
  urlEntityName: 'login',
  additionalFunctions: {
    getUser: { url: "/user" },
    logoff: { url: "/logoff", method: 'POST' },
    login: {
      method: 'POST'
    }
  }
});


function AppController($scope, $route, $rootScope, $location, $timeout, $dialog, userGroupConfiguration, Login) {
  baseAppController($scope, $route, $rootScope, $location, $timeout, $dialog, userGroupConfiguration, Login);
}

function MenuController($scope, permissionService) {
}


function RemindPasswordDialogController($scope, $http, $modalInstance) {
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
  }

  $scope.close = function() {
    $modalInstance.close();
  }
}


function HeaderController($scope, $location, $dialog) {

  $scope.showHelp = function() {
    log('Show help for: ' + $location.path());

    function cleanPath() {
      return _.reduce($location.path().split('/'), function (memo, element) {
        return memo + (parseInt(element) ? '' : '/' + element); }, '').substr(1);
    }

    $dialog.simpleDialog('help' + cleanPath() + 'Help.html', 'HelpDialogController')();
  }
}


function HelpDialogController($scope, $modalInstance) {
  $scope.close = function(result) { $modalInstance.close(result); }
}

