describe('Info table', function () {


  it('empty', function () {
    var template = compile("<div><table info-table><tbody></tbody></table></div>")(scope);
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toContain('<table ');
    expect(templateAsHtml).toContain('class="table table-condensed details-table"');
  });


  it('with row', function () {
    var template = compile(
        "<div><table info-table><tbody><tr row first=\"'blabla1'\" second=\"'blabla2'\" third=\"'blabla3'\" /></tbody></table></div>")(scope);
    scope.$digest();
    var templateAsHtml = template.html();
    expect(templateAsHtml).toContain('<table ');
    expect(templateAsHtml).toContain('class="table table-condensed details-table"');
    expect(templateAsHtml).toContain('<tr row=""');
    expect(templateAsHtml.split('<td').length).toBe(4);
  });
});

