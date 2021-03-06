describe('Form element -', function () {


  function checkGeneratedGET(htmlPart, expectedGET, expectedGET2) {
    http.expectGET(expectedGET).respond('<div class="field">field</div>');
    if (expectedGET2) {
      http.expectGET(expectedGET2).respond('<div class="field">field</div>');
    }
    var template = compile(htmlPart)(scope);
    rootScope.$digest();
    http.flush();
    expect(template.html()).toContain('<div class="field ng-scope">field</div>');
    return template;
  }


  it('basic entity field', function () {
    checkGeneratedGET('<div mt-form-part="Person"><div mt-form-field="firstName" /></div>',
        '/api/bootstrapRenderer?entityClass=Person&fieldName=firstName');
  });


  it('entity name shortcut', function () {
    checkGeneratedGET('<div mt-form-part="entityShortcut"><div mt-form-field="firstName" /></div>',
        '/api/bootstrapRenderer?entityClass=com.test.EntityShortcut&fieldName=firstName');
  });


  it('list of basic fields', function () {
    var template = checkGeneratedGET(
        '<div mt-form-part="Person"><div mt-form-field="firstName" /><div mt-form-field="lastName" /></div>',
        '/api/bootstrapRenderer?entityClass=Person&fieldName=firstName',
        '/api/bootstrapRenderer?entityClass=Person&fieldName=lastName');

    expect(template.html().split("field ng-scope").length).toBe(3);
  });


  it('custom entity name', function () {
    checkGeneratedGET('<div mt-form-part="Tool" mt-entity-name="person"><div mt-form-field="name" /></div>',
        '/api/bootstrapRenderer?entityClass=Tool&entityName=person&fieldName=name');
  });


  it('custom html field name', function () {
    checkGeneratedGET('<div mt-form-part="Company"><div mt-form-field="idOwner" mt-html-name="owner.id" /></div>',
        '/api/bootstrapRenderer?entityClass=Company&fieldName=idOwner&htmlName=owner.id');
  });


  it('with attributes', function () {
    checkGeneratedGET('<div mt-form-part="Person"><div mt-form-field="firstName" mtf-ng-disabled="true" mtf-custom-attr="xxxy"></div></div>',
        '/api/bootstrapRenderer?entityClass=Person&fieldName=firstName&mtfNgDisabled=true&mtfCustomAttr=xxxy');
  });


  it('inline', function () {
    checkGeneratedGET('<div mt-form-part="Person" mt-inline="true"><div mt-form-field="firstName"></div></div>',
        '/api/bootstrapRenderer?entityClass=Person&inline=true&fieldName=firstName');
  });


  it('single field', function () {
    checkGeneratedGET('<div mt-form-part="Person" mt-single-field="true"><div mt-form-field="firstName"></div></div>',
        '/api/bootstrapRenderer?entityClass=Person&singleField=true&fieldName=firstName');
  });

  describe('css classes -', function () {
    it('with css classes', function () {
      checkGeneratedGET('<div mt-form-part="Person" mt-css-classes="yellow big"><div mt-form-field="firstName"></div></div>',
          '/api/bootstrapRenderer?entityClass=Person&cssClasses=yellow big&fieldName=firstName');
    });

    it('with css classes', function () {
      checkGeneratedGET('<div mt-form-part="Person"><div mt-form-field="firstName" mt-css-classes="red small"></div></div>',
          '/api/bootstrapRenderer?entityClass=Person&cssClasses=red small&fieldName=firstName');
    });

    it('with css classes', function () {
      checkGeneratedGET('<div mt-form-part="Person" mt-css-classes="big"><div mt-form-field="firstName" mt-css-classes="red"></div></div>',
          '/api/bootstrapRenderer?entityClass=Person&cssClasses=big red&fieldName=firstName');
    });
  });
});

