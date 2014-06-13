describe('Backbone', function () {


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
  });


  it('isBetween', function () {
    expect().toBe();
    expect().toBe();
  });


  it('scopeSetter', function () {
    scopeSetter(scope, 'field')('xxx')
    expect(scope.field).toBe('xxx');
  });


  it('saveOrUpdate', function () {
    expect().toBe();
    expect().toBe();
  });


  describe('searchQueryFunction', function () {
    var Test;
    beforeEach(inject(function (_Test_) {
      Test = _Test_;
    }));


    it('basic', function () {
      searchQueryFunction(scope, Test);
      scope.query = 'fafa';

      http.expectGET('/api/tests').respond('[{}, {}]');
      http.expectGET('/api/tests?query=fafa').respond('[{}, {}]');
      scope.$digest();
      http.flush();

      expect(scope.elements.length).toBe(2);
    });
  });


  it('loadAndInjectInternal', function () {
    expect().toBe();
    expect().toBe();
  });


  it('loadAndInject', function () {
    expect().toBe();
    expect().toBe();
  });


  describe('initializeSelect2', function () {
    it('basic', function () {
      initializeSelect2(scope, 'results', null, 'person');
    });

    it('basic', function () {
      initializeSelect2(scope, 'results', null, 'person', {
        bindId: true,
        bindEntity: 'rewrite.to'
      });
    });
  });
});

