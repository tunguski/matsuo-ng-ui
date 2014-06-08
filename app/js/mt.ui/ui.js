'use strict';

angular.module('mt.ui', ['ui.bootstrap', 'ui.select2', 'mt.route', 'ngResource', 'pascalprecht.translate'])
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
    })

    .filter('formatDate', function() { return formatDate; })
    .filter('formatTime', function() { return formatTime; })
    .filter('formatDateTime', function() { return formatDateTime; })
    .filter('formatDayMoment', function() { return formatDayMoment; })
    .filter('weekdayLabel', function() { return function(input) {
      return weekdayLabel[parseDate(input).getDay()];
    }})


    .filter('addressPresenter', function() {
      return function (address) {
        if (!address) {
          return;
        }
        var result = '';

        if (address.zipCode) {
          result = result + address.zipCode + ' ';
        }
        result = result + address.town + '<br/>';
        result = result + address.street;
        if (address.houseNumber) {
          result = result + ' ' + address.houseNumber;
        }
        if (address.apartmentNumber) {
          result = result + ' / ' + address.apartmentNumber;
        }

        return result
      }
    })


    .run(function ($rootScope, $http, $compile, $timeout, $location) {
      // set page title
      $rootScope.setTitle = function(title, scope) {
        if (scope) {
          // assignment does not work if it changes another compiled part
          $rootScope.title = '';
          $timeout(function() {
            $rootScope.title = $compile(title)(scope).get();
          });
        } else {
          $rootScope.title = title;
        }
      };

      // default date configuration
      $rootScope.dateOptions = {
        appendToBody: true//,
        //dateFormat: 'yy-mm-dd'
      };

      /**
       * Actual year value.
       */
      $rootScope.actualYear = moment().format('YYYY');

      /**
       * Printing file. Appends iframe with url to file.
       */
      $rootScope.printFile = function printFile(urlOfFile) {
        var path = $location.protocol() + '://' + $location.host() + ':' + $location.port() + urlOfFile;
        // print
        var iframe = document.createElement('iframe');
        iframe.src = path;
        iframe.style.display = 'none';
        var iFrameLoaded = function() {
          iframe.contentWindow.print();
          iframe.parentNode.removeChild(iframe);
        };
        if (iframe.attachEvent) iframe.attachEvent('onload', iFrameLoaded); // for IE
        else if(iframe.addEventListener) iframe.addEventListener('load', iFrameLoaded, false); // for most other browsers
        else iframe.onload = iFrameLoaded; // just in case there's a browser not covered by the first two

        document.body.appendChild(iframe);
      }
    })


    // translation configuration

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
    })
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
var restFactory = buildRestFactory(angular.module('mt.ui'));


restFactory('Login', {
  urlEntityName: 'login',
  additionalFunctions: {
    getUser: { url: '/user' },
    logoff: { url: '/logoff', method: 'POST' },
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

