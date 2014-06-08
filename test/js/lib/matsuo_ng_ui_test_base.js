toastr = {
  success: function (msg) {
    console.log(msg);
  },
  info: function (msg) {
    console.log(msg);
  }
};

restFactory('Test');

angular.module('mt.route')
    .constant('routeConfiguration', {
      rootPath: 'testViews',
      extension: '.html'
    });

angular.module('test.translate', ['mt.ui'])
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
;
beforeEach(module('test.translate'));


beforeEach(function () {
  this.addMatchers({
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

