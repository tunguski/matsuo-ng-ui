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
  });
});

