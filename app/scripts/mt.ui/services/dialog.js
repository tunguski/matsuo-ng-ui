'use strict';

angular.module('mt.ui')
    .factory('$dialog', ['$rootScope', '$modal', '$http', '$compile', function($rootScope, $modal, $http, $compile) {

      function modalOptions(templateUrl, controller, scope) {
        return { templateUrl:  templateUrl, controller: controller, scope: scope }; }

      var dialogProvider = {
        /**
         * Creates and opens dialog.
         */
        dialog: function (modalOptions, resultFn) {
          var dialogInstance = $modal.open(modalOptions);
          if (resultFn) { dialogInstance.result.then(resultFn); }
          dialogInstance.values = modalOptions;
          return dialogInstance;
        },

        /**
         * Returns 0-parameter function that opens dialog on evaluation.
         */
        simpleDialog: function(templateUrl, controller, resultFn) {
          return function () { return dialogProvider.dialog(modalOptions(templateUrl, controller), resultFn); };
        },

        /**
         * Opens simple generic dialog presenting title, message (any html) and provided buttons.
         */
        messageBox: function(title, message, buttons, resultFn) {
          var scope = angular.extend($rootScope.$new(false), { title: title, message: message, buttons: buttons });
          //scope.message = $compile(message)(scope);
          return dialogProvider.dialog(modalOptions('template/messageBox/message.html', 'MessageBoxCtrl', scope),
              function (result) {
                var value = resultFn ? resultFn(result) : undefined;
                scope.$destroy();
                return value;
              });
        },

        /**
         * Configures save and cancel functions on passed scope.
         */
        saveAndCancelFn: function(scope, modalInstance, opts) {
          opts = opts || {};

          scope.close = function(result) { modalInstance.close(result); };

          function successFn(entity, headers) { modalInstance.close('OK'); }

          var entityName = opts.entityName || 'entity';
          var saveFn = opts.saveFn || successFn;
          var updateFn = opts.updateFn || successFn;

          scope.save = saveOrUpdate(scope, entityName, saveFn, updateFn);
        },

        /**
         * Creates change status confirmation dialog with simple generic AJAX function invoked when confirmed.
         */
        changeStatusConfirmationFn: function(scope, entityPartUrl, opts) {
          opts = opts || {};
          return function (fnType) {
            return function(entity) {
              var title = 'dialog.statusChange.confirmTitle';
              var msg = $compile('<span><span translate="dialog.statusChange.confirmStatus"></span>' +
                  '<b translate="' + entityPartUrl + '.changeStatus.' + fnType + '"></b></span>')(scope);
              var btns = [
                { result:'CANCEL', label: 'cancel', cssClass: 'btn-default' },
                { result:'OK',     label: 'confirm',     cssClass: 'btn-primary' }
              ];

              return dialogProvider.messageBox(title, msg, btns, function(result) {
                if (result === 'OK') {
                  $http.post('/api/' + entityPartUrl + '/' + entity.id + '/' + fnType).success(function(data) {
                    toastr.success(scope.translate('dialog.statusChange.successText'));
                    if (opts.resultFn) {
                      opts.resultFn(data.replace(/['"]/g, ''));
                    } else {
                      entity[opts.statusField || 'status'] = data.replace(/['"]/g, '');
                    }
                  });
                }
              });
            };
          };
        }
      };

      return dialogProvider;
    }])
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('template/messageBox/message.html',
          '<div class="modal-header"><h3 translate="{{title}}"></h3></div>\n' +
          '<div class="modal-body"><p ng-bind-html="message"></p></div>\n' +
          '<div class="modal-footer"><button ng-repeat="btn in buttons" ng-click="close(btn.result)" class="btn" ' +
              'ng-class="btn.cssClass" translate="{{btn.label}}"></button></div>\n');
    }])
    .controller('MessageBoxCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.close = function (result) { $modalInstance.close(result); };
    }]);

