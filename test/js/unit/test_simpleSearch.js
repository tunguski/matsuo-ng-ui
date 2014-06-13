describe('Simple search', function () {


  it('works', function () {
    var template = compile("<div><div simple-search /></div>")(scope);
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toBe('<form class="form-inline ng-isolate-scope ng-pristine ng-valid" simple-search=""><div class="input-append"><input type="text" name="query" ng-model="query" class="input-medium ng-pristine ng-valid"><button type="button" ng-click="clearQuery()" class="btn btn-small"><i class="icon-remove"></i></button><!-- ngIf: showSearchButton --></div><span ng-transclude=""></span></form>');
  });
});

