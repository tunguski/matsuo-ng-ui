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
    });
  });
});

