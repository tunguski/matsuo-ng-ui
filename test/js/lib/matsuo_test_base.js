toastr = {
  success: function (msg) {
    console.log(msg);
  },
  info: function (msg) {
    console.log(msg);
  }
}


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
    });
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

