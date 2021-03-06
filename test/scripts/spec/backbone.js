describe('Backbone', function () {


  var Test, q, $timeout;
  beforeEach(inject(function (_Test_, _$timeout_, $q) {
    Test = _Test_;
    $timeout = _$timeout_;
    q = $q;
  }));


  it('formatResult', function () {
    var formatFunction = formatResult(function (a) { return '' + a; });
    expect(formatFunction('tobby')).toBe('tobby');
    expect(formatFunction()).toBe('');
    formatFunction = formatResult(function (a) { throw {}; });
    expect(formatFunction('jamie')).toBe('jamie');
  });


  it('formatResultByField', function () {
    expect(formatResultByField('xxx')({ xxx: 'yyy'})).toBe('yyy');
    expect(formatResultByField('a')({ a: '77'})).toBe('77');
  });


  it('partyFormatResult', function () {
    expect(partyFormatResult({ firstName: 'Bill', lastName: 'Cosby'})).toBe('Bill Cosby');
    expect(partyFormatResult({ fullName: 'Company X'})).toBe('Company X');
  });


  it('personFormatResult', function () {
    expect(personFormatResult({ firstName: 'Bill', lastName: 'Cosby'})).toBe('Bill Cosby');
    expect(personFormatResult({ firstName: 'Bill', lastName: 'Cosby', pesel: '432'})).toBe('Bill Cosby 432');
  });


  it('simplePartyFormatResult', function () {
    expect(simplePartyFormatResult({ name: 'boy'})).toBe('boy');
  });


  it('extractEventEndDate', function () {
    expect(extractEventEndDate({ endDate: '2014-01-01' })).toBeDefined();
    expect(extractEventEndDate({ startDate: '2014-01-01', duration: '20' })).toBeDefined();
  });


  it('parseDate', function () {
    expect(moment.isMoment(parseDate('2014-01-01'))).toBe(true);
    expect(moment.isMoment(parseDate('12:14'))).toBe(true);
    expect(moment.isMoment(parseDate('2014-01-01 12:14'))).toBe(true);
  });


  it('isBetween', function () {
    expect(isBetween('2014-04-04', '2014-04-01', '2014-04-11')).toBe(true);
    expect(isBetween('2014-04-01', '2014-04-04', '2014-04-11')).toBe(false);
    expect(isBetween('2014-04-04', '2014-04-04', '2014-04-11')).toBe(false);
  });


  it('scopeSetter', function () {
    scope.scopeSetter('field')('xxx');
    expect(scope.field).toBe('xxx');
  });


  it('saveOrUpdate', function () {
    var updated = false;
    var save = function () {};
    var update = function () {
      updated = true;
    };
    scope.myField = {
      id: 7,
      name: 'test_name',
      isNew: function () { return false; },
      $update: function (params, successFn, validationFn) {
        successFn();
      },
      $save: function (params, successFn, validationFn) {
        successFn();
      }
    };
    var saveOrUpdateFn = saveOrUpdate(scope, 'myField', save, update);
    saveOrUpdateFn();
    expect(updated).toBe(true);
  });


  it('err logger', function () {
    // no error
    err('xxx');
  });


  describe('searchQueryFunction', function () {
    it('basic', function () {
      searchQueryFunction(scope, Test);
      scope.query = 'fafa';

      http.expectGET('/api/tests?query=fafa').respond([{}, {}]);
      scope.$digest();
      $timeout.flush();
      http.flush();

      expect(scope.elements.length).toBe(2);
      expect(scope.refresh).toBeDefined();
    });

    it('complex', function () {
      var afterLoadExecuted = false;
      searchQueryFunction(scope, Test, {
        afterLoadFn: function () { afterLoadExecuted = true; },
        refreshMethod: 'refreshMethod',
        minLength: 3
      });
      scope.query = 'fafa';

      http.expectGET('/api/tests?query=fafa').respond([{}, {}]);
      scope.$digest();
      $timeout.flush();
      http.flush();

      expect(afterLoadExecuted).toBe(true);
      expect(scope.refreshMethod).toBeDefined();
      scope.refreshMethod([ 'a' ]);
    });
  });


  it('loadAndInjectInternal', function () {
    var Test;
    inject(function (_Test_) {
      Test = _Test_;
    });

    var resultFnExecuted = false;

    scope.list = [{
      idEntity: 7
    }];

    http.expectGET('/api/tests/list/byIds?ids=7').respond([{ id: 7 }]);
    loadAndInjectInternal(scope.list, Test, 'idEntity', 'entity', 'id', function () {
      resultFnExecuted = true;
    });
    http.flush();

    expect(scope.list[0].entity).toBeDefined();
    expect(scope.list[0].entity.id).toBe(7);
    expect(resultFnExecuted).toBe(true);
  });


  it('loadAndInject', function () {
    var Test;
    inject(function (_Test_) {
      Test = _Test_;
    });

    var resultFnExecuted = false;

    scope.list = [{
      idEntity: 7
    }];

    http.expectGET('/api/tests/list/byIds?ids=7').respond([{ id: 7 }]);
    loadAndInject(scope.list, Test, 'entity', 'id', function () {
      resultFnExecuted = true;
    });
    http.flush();

    expect(scope.list[0].entity).toBeDefined();
    expect(scope.list[0].entity.id).toBe(7);
    expect(resultFnExecuted).toBe(true);
  });
});

