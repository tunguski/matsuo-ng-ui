describe('Bootstrap basic format elements', function () {


  it('horizontal rule', function () {
    var template = compile("<div><div hr /></div>")(scope);
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toBe('<div class="row-fluid" hr=""><div class="span12"><hr></div></div>');
  });


  it('header 4', function () {
    var template = compile("<div><div h4 /></div>")(scope);
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toBe('<div class="row-fluid" h4=""><div class="span12"><h4 ng-transclude=""></h4></div></div>');
  });


  it('header 5', function () {
    var template = compile("<div><div h5 /></div>")(scope);
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toBe('<div class="row-fluid" h5=""><div class="span12"><h5 ng-transclude=""></h5></div></div>');
  });
});

