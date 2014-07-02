'use strict';

describe('Service: menuService', function () {

  var menuService,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _menuService_) {
    scope = $rootScope.$new();
    menuService = _menuService_;
  }));

  it('all elements are defined', function () {
    expect(angular.isDefined(menuService.menuElementStyle)).toBe(true);
    expect(angular.isDefined(menuService.menu)).toBe(true);
  });

  it('menuElementStyle works', function () {
    expect(menuService.menuElementStyle({ title: 'yyy'})).toBe('xxx-yyy');
  });
});
