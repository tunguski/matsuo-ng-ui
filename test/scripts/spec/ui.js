describe('UI -', function () {

  describe('filters -', function () {
    var $filter;
    beforeEach(inject(function (_$filter_) {
      $filter = _$filter_;
    }));


    it('weekdayLabel', function () {
      var date = moment().day(1);
      date.lang('pl');
      expect($filter('weekdayLabel')(date)).toBe('poniedziałek');
      date.lang('en');
      expect($filter('weekdayLabel')(date)).toBe('Monday');
    });

    it('formatDate', function () {
      var date = moment('2013-02-08 09:30:26');
      date.lang('pl');
      expect($filter('formatDate')(date)).toBe('2013-02-08');
      date.lang('en');
      expect($filter('formatDate')(date)).toBe('2013-02-08');
    });

    it('formatTime', function () {
      var date = moment('2013-02-08 09:30:26');
      date.lang('pl');
      expect($filter('formatTime')(date)).toBe('09:30');
      date.lang('en');
      expect($filter('formatTime')(date)).toBe('09:30');
    });

    it('formatDateTime', function () {
      var date = moment('2013-02-08 09:30:26');
      date.lang('pl');
      expect($filter('formatDateTime')(date)).toBe('2013-02-08 09:30');
      date.lang('en');
      expect($filter('formatDateTime')(date)).toBe('2013-02-08 09:30');
    });

    it('formatDayMoment pl', function () {
      var date = moment('2013-02-08 09:30:26');
      date.lang('pl');
      expect($filter('formatDayMoment')(date)).toBe('pt 09:30');
    });

    it('formatDayMoment en', function () {
      var date = moment('2013-02-08 09:30:26');
      date.lang('en');
      expect($filter('formatDayMoment')(date)).toBe('Fri 09:30');
    });

    it('formats address correctly', function () {
      var address = {
        zipCode: '22-333',
        town: 'Warszawa',
        street: 'Starzyńskiego',
        houseNumber: '17',
        apartmentNumber: '20'
      };
      expect($filter('addressPresenter')(address)).toBe('22-333 Warszawa<br/>Starzyńskiego 17 / 20');

      address.apartmentNumber = undefined;
      expect($filter('addressPresenter')(address)).toBe('22-333 Warszawa<br/>Starzyńskiego 17');

      address.zipCode = undefined;
      expect($filter('addressPresenter')(address)).toBe('Warszawa<br/>Starzyńskiego 17');

      expect($filter('addressPresenter')(undefined)).toBe(undefined);
    });
  });

  describe('setTitle', function () {
    var $timeout;
    beforeEach(inject(function (_$timeout_) {
      $timeout = _$timeout_;
    }));

    it('sets static title', function () {
      rootScope.setTitle('test');
      expect(rootScope.title).toBe('test');
    });

    it('sets dynamic title', function () {
      scope.name = 'Kryspin';
      rootScope.setTitle('<span>test {{name}}</span>', scope);

      $timeout.flush();

      expect(angular.element(rootScope.title).text()).toBe('test Kryspin');
    });
  });

  it('printing file works', function () {
    rootScope.printFile('/api/prints/4324343');

    expect($('iframe').length).toBe(1);
  });

  describe('services', function () {
    describe('baseAppCtrl', function () {
      var baseAppCtrl;
      beforeEach(inject(function (_baseAppCtrl_) {
        baseAppCtrl = _baseAppCtrl_;
      }));

      it('works', function () {
        baseAppCtrl(scope);

        expect(scope.afterLogged).toBeDefined();
        expect(scope.isLoggedIn).toBeDefined();
        expect(scope.isLoggedOff).toBeDefined();
        expect(scope.checkIsLogged).toBeDefined();
        expect(scope.login).toBeDefined();
        expect(scope.hideWrongPasswordMessage).toBeDefined();
        expect(scope.logoff).toBeDefined();
      });
    });

    describe('userGroupConfiguration', function () {
      var userGroupConfiguration, $route;
      beforeEach(inject(function (_userGroupConfiguration_, _$route_) {
        userGroupConfiguration = _userGroupConfiguration_;
        $route = _$route_;
      }));

      it('group route works', function () {
        rootScope.user = { groups: [ { name: 'TEST' } ] };
        userGroupConfiguration.refreshAppUserConfiguration();
        expect($route.routes['null']).toBe('/base/test');
      });

      it('default route works', function () {
        rootScope.user = { groups: [ { name: 'XLL' } ] };
        userGroupConfiguration.refreshAppUserConfiguration();
        expect($route.routes['null']).toBe('/base/test2');
      });
    });
  });

  describe('controllers', function () {
    describe('AppCtrl', function () {
      beforeEach(inject(function ($controller) {
        controller = $controller('AppCtrl', {$scope: scope});
      }));

      it ('login works', function () {
        scope.loginData = {
          username: 'testUser',
          password: 'testPassword'
        };

        http.expectGET('/api/login').respond('');
        http.expectPOST('/api/login').respond('');
        http.expectGET('/api/login/user').respond('{}');
        http.expectGET('/api/login/user').respond('{}');
        scope.login();
        http.flush();
      });

      it('isLoggedIn', function () {
        rootScope.loggedIn = true;
        expect(scope.isLoggedIn()).toBe(true);
        rootScope.loggedIn = false;
        expect(scope.isLoggedIn()).toBe(false);
        rootScope.loggedIn = undefined;
        expect(scope.isLoggedIn()).toBe(false);
      });

      it('isLoggedOff', function () {
        rootScope.loggedIn = true;
        expect(scope.isLoggedOff()).toBe(false);
        rootScope.loggedIn = false;
        expect(scope.isLoggedOff()).toBe(true);
        rootScope.loggedIn = undefined;
        expect(scope.isLoggedOff()).toBe(false);
      });

      it('logoff', function () {
        rootScope.loggedIn = true;

        http.expectGET('/api/login').respond('');
        http.expectPOST('/api/login/logoff').respond('');
        scope.logoff();
        http.flush();

        expect(rootScope.loggedIn).toBe(false);
      });
    });

    describe('RemindPasswordModalCtrl', function () {
      var $modalInstance;
      beforeEach(inject(function ($controller) {
        $modalInstance = {
          close: function () {}
        };
        controller = $controller('RemindPasswordModalCtrl', {$scope: scope, $modalInstance: $modalInstance});
      }));

      it('remindPassword', function () {
        scope.remind.username = 'testowy';
        http.expectPOST('/api/login/remindPassword/testowy').respond('');
        scope.remindPassword();
        http.flush();
      });
    });

    describe('HeaderCtrl', function () {
      var $location;
      beforeEach(inject(function ($controller, _$location_) {
        controller = $controller('HeaderCtrl', {$scope: scope});
        $location = _$location_;
      }));

      it('showHelp', function () {
        $location.path('/base/info');
        http.expectGET('help/base/infoHelp.html').respond('<div>help content</div>');
        scope.showHelp();
        http.flush();
      });
    });
  });

  it('hasService', function () {
    expect(rootScope.hasService('$filter')).toBe(true);
    expect(rootScope.hasService('$fdafsdaafsdfadafdafad')).toBe(false);
  });
});

