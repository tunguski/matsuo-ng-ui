describe('Permissions module', function () {
  describe('permissionService', function () {
    var _permissionService;

    beforeEach(inject(function (permissionService) {
      _permissionService = permissionService;
    }));


    describe('check permissions after prior loading', function () {
      it('correct', function () {
        http.expectPOST('/api/login/permissions', ['xxx', 'yyy']).respond('[ true, false ]');

        _permissionService.lookupPermissions(['xxx', 'yyy']);

        http.flush();

        _permissionService.isPermitted('xxx').then(function (permission) {
          expect(permission).toBe(true);
        });
        _permissionService.isPermitted('yyy').then(function (permission) {
          expect(permission).toBe(false);
        });

        scope.$apply();
      });
    });


    describe('check permissions', function () {
      it('correct', function () {
        http.expectPOST('/api/login/permissions', ['xxx']).respond('[ true ]');
        http.expectPOST('/api/login/permissions', ['yyy']).respond('[ false ]');

        _permissionService.isPermitted('xxx').then(function (permission) {
          expect(permission).toBe(true);
        });
        _permissionService.isPermitted('yyy').then(function (permission) {
          expect(permission).toBe(false);
        });

        http.flush();
        scope.$apply();
      });
    });


    describe('reload permissions', function () {
      it('correct', function () {
        http.expectPOST('/api/login/permissions', ['xxx']).respond('[ true ]');
        http.expectPOST('/api/login/permissions', ['yyy']).respond('[ false ]');

        _permissionService.isPermitted('xxx');
        _permissionService.isPermitted('yyy');

        http.flush();

        http.expectPOST('/api/login/permissions', ['xxx', 'yyy']).respond('[ true, false ]');

        _permissionService.reloadPermissions();

        http.flush();
      });
    });


    describe('reload on loggedIn', function () {
      it('correct', function () {
        http.expectPOST('/api/login/permissions', ['xxx']).respond('[ true ]');
        _permissionService.isPermitted('xxx');
        http.flush();

        rootScope.$broadcast('loggedIn');

        http.expectPOST('/api/login/permissions', ['xxx']).respond('[ true ]');
        http.flush();
      });
    });
  });
});

