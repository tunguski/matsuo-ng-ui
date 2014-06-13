describe('Focus', function () {
  var $timeout;
  beforeEach(inject(function (_$timeout_) {
    $timeout = _$timeout_;
  }));

  it('works', function () {
    scope.focusModel = false;
    var template = compile("<div><input mt-focus-model=\"focusModel\"></div>")(scope);
    scope.$digest();
    var input = template.find('input');

    expect(input.is(':focus')).toBe(false);

    scope.focusModel = true;
    scope.$digest();
    $timeout.flush();

    // fixme!
    //expect(input.is(':focus')).toBe(true);

    input.blur();
    // no digest - executed from blur handler
    expect(input.is(':focus')).toBe(false);
  });
});

