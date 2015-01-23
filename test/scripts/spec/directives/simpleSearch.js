describe('Simple search', function () {


  it('renders correctly', function () {
    var template = compile('<div><div simple-search placeholder="test" /></div>')(scope);
    scope.$digest();
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toBe('<form class="form-inline simple-search-form ng-pristine ng-valid ng-isolate-scope" ' +
        'simple-search="" placeholder="test"><div class="input-group"><input type="text" name="query" ng-model="query" ' +
        'class="form-control ng-pristine ng-untouched ng-valid" placeholder="test"><span ng-show="$parent.__loading" ' +
        'class="fa fa-spinner fa-spin form-control-feedback ng-hide"></span><div class="input-group-btn"><button ' +
        'type="button" ng-click="clearQuery()" class="btn btn-default"><i class="fa fa-times"></i></button>' +
        '<!-- ngIf: showSearchButton --></div></div><span ng-transclude=""></span></form>');
  });


  it('clears search query', function () {
    scope.query = 'fdfsdf';

    var template = compile('<div><div simple-search query="query" placeholder="test" /></div>')(scope);
    scope.$digest();

    template.find('button').click();
    scope.$digest();

    expect(scope.query).toBe('');
  });
});
