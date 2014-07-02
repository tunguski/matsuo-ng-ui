"use strict";

describe('Validation module', function () {
  describe('validationService', function () {
    var _validationService, _dialog;

    beforeEach(inject(function (validationService, $dialog) {
      _validationService = validationService;
      _dialog = $dialog;
    }));


    it('should show field errors', function () {
      _validationService(scope)({ data: { fieldErrors: {
        field_1: "error_1",
        field_2: "error_2"
      }}});
      expect(scope.form.entity_field_1.serverError).toBe("validation.error.error_1");
      expect(scope.form.entity_field_2.serverError).toBe("validation.error.error_2");
    });


    it('should clear errors on next invocation', function () {
      _validationService(scope)({ data: { fieldErrors: {
        field_1: "error_1",
        field_2: "error_2"
      }}});
      _validationService(scope)({ data: { fieldErrors: {}}});

      expect(scope.form.entity_field_1.serverError).toBe(undefined);
      expect(scope.form.entity_field_2.serverError).toBe(undefined);
    });


    it('should show global errors', function () {
      spyOn(_dialog, 'messageBox');
      _validationService(scope)({ data: { globalErrors: [ "error_1", "error_2" ]}});
      expect(_dialog.messageBox).toHaveBeenCalled();
    });
  });
});

