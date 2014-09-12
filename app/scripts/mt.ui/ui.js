'use strict';

(function () {
  var mt_ui = angular.module('mt.ui', ['ui.bootstrap', 'ui.select2', 'mt.route', 'mt.resource', 'pascalprecht.translate'])
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


      .filter('addressPresenter', function() {
        return function (address) {
          if (!address) {
            return;
          }
          return '' +
              (address.zipCode ? address.zipCode + ' ' : '') +
              (address.town ? address.town : '') +
              (address.zipCode || address.town ? '<br/>' : '') +
              (address.street ? address.street + ' ' : '') +
              (address.houseNumber ? address.houseNumber : '') +
              (address.apartmentNumber ? '/' + address.apartmentNumber : '');
        };
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
        $rootScope.datepickerOptions = {
          format: 'dd-mm-yyyy',
          momentFormat: 'DD-MM-yyyy'
        };

        /**
         * Actual year value.
         */
        $rootScope.actualYear = moment().format('YYYY');

        /**
         * Printing file. Appends iframe with url to file.
         */
        $rootScope.printFile = function (urlOfFile) {
          var path = $location.protocol() + '://' + $location.host() + ':' + $location.port() + urlOfFile;
          // print
          var iframe = document.createElement('iframe');
          iframe.src = path;
          iframe.style.display = 'none';
          var iFrameLoaded = function() {
            iframe.contentWindow.print();
            iframe.parentNode.removeChild(iframe);
          };
          if (iframe.attachEvent) {
            iframe.attachEvent('onload', iFrameLoaded); // for IE
          } else if (iframe.addEventListener) {
            iframe.addEventListener('load', iFrameLoaded, false); // for most other browsers
          } else {
            iframe.onload = iFrameLoaded; // just in case there's a browser not covered by the first two
          }

          document.body.appendChild(iframe);
        };
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
      /**
       * @ngdoc function
       * @name mt.ui.factory:mtTranslateHandlerFactory
       * @description
       * # mtTranslateHandlerFactory
       * Factory of the mt.ui
       */
      .factory('mtTranslateHandlerFactory', function ($translate) {
        // has to return a function which gets a tranlation ID
        return function (translationID) {
          if (translationID.indexOf('.') > 0) {
            var translation = $translate.instant(translationID.substr(translationID.indexOf('.') + 1));
            return _.endsWith(translationID, translation) ? translationID : translation;
          } else {
            return translationID;
          }
        };
      })
      .config(function (restFactoryProvider) {
        restFactoryProvider.define('Login', {
          urlEntityName: 'login',
          additionalFunctions: {
            getUser: { url: '/user' },
            logoff: { url: '/logoff', method: 'POST' },
            login: {
              method: 'POST'
            }
          }
        });
      })
      .provider('userGroupConfiguration', function (mtRouteConfig) {
        var self = this;

        self.groupToDefaultRoute = [];

        this.$get = function ($rootScope, $route) {
          return {
            // placeholder for refreshing user group configuration
            refreshAppUserConfiguration: function () {
              var groups = _.pluck($rootScope.user.groups, 'name');
              // default group
              groups.push('');
              var element = _.find(self.groupToDefaultRoute, function (element) {
                return _.contains(groups, element.groupName);
              });

              mtRouteConfig.defaultRoute = element ? element.defaultRoute : '';
              $route.routes['null'] = mtRouteConfig.defaultRoute;
            }
          };
        };

        return self;
      })
      /**
       * @ngdoc function
       * @name mt.ui.controller:HelpModalCtrl
       * @description
       * # HelpModalCtrl
       * Controller of the mt.ui
       */
      .controller('HelpModalCtrl', function ($scope, $modalInstance) {
        $scope.close = function(result) { $modalInstance.close(result); };
      });


  function dateFormatService (format) {
    return function (input) {
      return input ? parseDate(input).format(format) : '';
    };
  }

  // for each key register date filter with that name and value as format
  angular.forEach({
      'formatDate': 'YYYY-MM-DD',
      'formatTime': 'HH:mm',
      'formatDateTime': 'YYYY-MM-DD HH:mm',
      'formatDayMoment': 'ddd HH:mm',
      'weekdayLabel': 'dddd'
  }, function (value, key) {
    mt_ui.filter(key, function () { return dateFormatService(value); });
  });
})();

/**
 * For unstable directives.
 */
angular.module('mt.ui.dev', ['mt.ui']);
