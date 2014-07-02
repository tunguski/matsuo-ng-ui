toastr = {
  success: function (msg) {
    console.log(msg);
  },
  info: function (msg) {
    console.log(msg);
  }
};

angular.module('mt.route')
    .config(function (mtRouteConfig) {
      mtRouteConfig.rootPath = 'testViews';
    });

angular.module('mt.route')
    .factory('userGroupConfiguration', ['$route', '$rootScope', '$location', 'mtRouteConfig',
      function($route, $rootScope, $location, mtRouteConfig) {
        var userGroupConfiguration = {
          refreshAppUserConfiguration: function () {
            var groups = _.pluck($rootScope.user.groups, 'name');
            mtRouteConfig.defaultRoute = '/base/registration'
            $route.routes['null'] = mtRouteConfig.defaultRoute;
            //$location.url(mtRouteConfig.defaultRoute);
          }
        };
        return userGroupConfiguration;
      }]);

angular.module('test.module', ['mt.ui'])
    .config(function($translateProvider) {
      // ustawiamy globalnie locale
      $translateProvider.preferredLanguage('pl');
      // polskie tłumaczenie
      $translateProvider.translations('pl', {
        value: {
          first: "one"
        },
        second: "two"
      });
    })
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('test/dialog.html',
              '<div class="modal-header"><h3 translate="title"></h3></div>\n' +
              '<div class="modal-body"><p ng-bind-html="message"></p></div>\n' +
              '<div class="modal-footer"></div>\n');
    }])
    .controller('TestDialogController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      expect($modalInstance.values.testValue).toBe('testValue');
    }])
    .controller('TestSimpleDialogController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    }])
    .config(function (restFactoryProvider) {
      restFactoryProvider.define('Test');
    })
;
beforeEach(module('test.module'));


beforeEach(function () {
  jasmine.addMatchers({
    toEqualData: function (expected) {
      return angular.equals(this.actual, expected);
    }
  });
});


var controller;
var rootScope, scope, http, compile;
beforeEach(inject(function ($httpBackend, $rootScope, $compile) {
  http = $httpBackend;
  rootScope = $rootScope;
  scope = $rootScope.$new();
  compile = $compile;
}));

