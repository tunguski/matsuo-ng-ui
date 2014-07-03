describe('Download button', function () {


  it('for report works', function () {
    var template = compile("<div download-button='form' file-name='testReport'></div>")(scope);

    scope.$digest();

    var templateAsHtml = template.html();

    expect(templateAsHtml).not.toContain('/api/reports/pdf/testReport?');
    expect(templateAsHtml).toContain('printFile(pdfHref())');
    expect(templateAsHtml).not.toContain('/api/reports/xls/testReport?');
  });


  it('for report with form works', function () {
    scope.form = {
      // '2014-04-13T22:00:00.000Z'
      a: moment(1397426400000).toDate(),
      b: 'test_value'
    };

    var template = compile("<div download-button='form' file-name='testReport'></div>")(scope);

    scope.$digest();

    var templateAsHtml = template.html();

    expect(templateAsHtml).toContain('/api/reports/pdf/testReport?a=2014-04-13T22:00:00.000Z&amp;b=test_value');
    expect(templateAsHtml).toContain('printFile(pdfHref())');
    expect(templateAsHtml).toContain('/api/reports/xls/testReport?a=2014-04-13T22:00:00.000Z&amp;b=test_value');

    scope.form.c = 77;

    scope.$digest();

    var templateAsHtml = template.html();

    expect(templateAsHtml).toContain('/api/reports/pdf/testReport?a=2014-04-13T22:00:00.000Z&amp;b=test_value&amp;c=77');
    expect(templateAsHtml).toContain('printFile(pdfHref())');
    expect(templateAsHtml).toContain('/api/reports/xls/testReport?a=2014-04-13T22:00:00.000Z&amp;b=test_value&amp;c=77');
  });


  it('for print works', function () {
    scope.entity = {
      id: 10
    };

    var template = compile("<div download-button='entity'></div>")(scope);

    scope.$digest();

    var templateAsHtml = template.html();

    expect(templateAsHtml).toContain('/api/prints/10');
    expect(templateAsHtml).toContain('printFile(pdfHref())');
  });
});

