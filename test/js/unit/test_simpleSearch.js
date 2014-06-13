describe('Simple search', function () {


  it('renders correctly', function () {
    var template = compile('<div><div simple-search placeholder="test" /></div>')(scope);
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toBe('<form class="form-inline ng-isolate-scope ng-pristine ng-valid" simple-search="" placeholder="test">' +
        '<div class="input-append"><input type="text" name="query" ng-model="query" class="input-medium ng-pristine ng-valid" placeholder="test">' +
        '<button type="button" ng-click="clearQuery()" class="btn btn-small"><i class="icon-remove"></i></button>' +
        '<!-- ngIf: showSearchButton --></div><span ng-transclude=""></span></form>');
  });


  it('clears search query', function () {
    scope.query = 'fdfsdf';

    var template = compile('<div><div simple-search query="query" placeholder="test" /></div>')(scope);
    scope.$digest();

    template.find('input + button').click();
    scope.$digest();

    expect(scope.query).toBe('');
  });
});
