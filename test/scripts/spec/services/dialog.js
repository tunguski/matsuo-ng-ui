


describe('Dialog service -', function () {
  var $dialog;
  var Test;

  beforeEach(inject(function (_$dialog_, _Test_) {
    $dialog = _$dialog_;
    Test = _Test_;
  }));


  it('base dialog works', function () {
    var resultOk = false;

    var dialog = $dialog.dialog({
      templateUrl:  'test/dialog.html',
      controller: 'TestModalCtrl',
      testValue: 'testValue'
    }, function (result) {
      expect(result).toBe('testResult');
      resultOk = true;
    });

    scope.$digest();

    dialog.close('testResult');

    scope.$digest();

    expect(resultOk).toBe(true);
  });


  it('simple dialog works', function () {
    var resultOk = false;

    var dialogFunction = $dialog.simpleDialog('test/dialog.html', 'TestSimpleModalCtrl', function (result) {
      expect(result).toBe('testResult');
      resultOk = true;
    });
    var dialog = dialogFunction();

    scope.$digest();

    dialog.close('testResult');

    scope.$digest();

    expect(resultOk).toBe(true);
  });


  it('message box works', function () {
    var resultOk = false;

    var dialog = $dialog.messageBox('test.dialog.title', 'test.dialog.message',
        [{ result: 'testOK', cssClass: 'testCssClass', label: 'testLabel' }]
        , function (result) {
      expect(result).toBe('testResult');
      resultOk = true;
    });

    scope.$digest();

    dialog.close('testResult');

    scope.$digest();

    expect(resultOk).toBe(true);
  });


  it('saveAndCancelFn works', function () {
    var resultOk = false;

    scope.testName = new Test({ id: 7, name: 'testObject' });

    var modalInstance = {
      close: function (result) {
        expect(result).toBe('OK');
        resultOk = true;
      }
    };

    $dialog.saveAndCancelFn(scope, modalInstance, { entityName: 'testName' });

    scope.save();
  });

  it('changeStatusConfirmationFn works', function () {
    var resultOk = false;

    var entity = new Test({ id: 7, name: 'testObject' });

    var statusChangeBuilder = $dialog.changeStatusConfirmationFn(scope, 'squirells', {});
    var cancelFunction = statusChangeBuilder('cancel');
    var dialog = cancelFunction(entity);

    scope.$digest();

    http.expectPOST('/api/squirells/7/cancel').respond('OK');

    dialog.close('OK');

    http.flush();

  });
});

