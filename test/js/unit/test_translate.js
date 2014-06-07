describe('Modified translation module', function () {


  describe('validationService', function () {
    var _translate;
    beforeEach(inject(function ($translate) {
      _translate = $translate;
    }));


    it('should translate keys', function () {
      expect(_translate.instant('value.first')).toBe('one');
      expect(_translate.instant('value.second')).toBe('two');
    });


    it('scope should translate keys', function () {
      expect(scope.translate('value.first')).toBe('one');
      expect(scope.translate('value.second')).toBe('two');
    });
  });
});

