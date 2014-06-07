angular.module('mt.ui')
    .factory('$dialog', ['$rootScope', '$modal', '$http', function($rootScope, $modal, $http) {

      function dialog(modalOptions, resultFn) {
        var dialog = $modal.open(modalOptions);
        if (resultFn) dialog.result.then(resultFn);
        dialog.values = modalOptions;
        return dialog;
      }

      function modalOptions(templateUrl, controller, scope) {
        return { templateUrl:  templateUrl, controller: controller, scope: scope }; }

      var dialogProvider = {
        /**
         * Creates and opens dialog.
         */
        dialog: dialog,

        /**
         * Returns 0-parameter function that opens dialog on evaluation.
         */
        simpleDialog: function(templateUrl, controller, resultFn) {
          return function () { return dialog(modalOptions(templateUrl, controller), resultFn); };
        },

        /**
         * Opens simple generic dialog presenting title, message (any html) and provided buttons.
         */
        messageBox: function(title, message, buttons, resultFn) {
          var scope = angular.extend($rootScope.$new(false), { title: title, message: message, buttons: buttons });
          return dialog(modalOptions("template/messageBox/message.html", 'MessageBoxController', scope), function (result) {
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

          function successFn(entity, headers) { modalInstance.close('OK'); };

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
              var title = 'Potwierdź zmianę statusu';
              var msg = 'Status zostanie zmieniony na <b translate="{{ entityPartUrl + ".changeStatus." + fnType }}"></b>';
              var btns = [{result:'CANCEL', label: 'Cancel'}, {result:'OK', label: 'OK', cssClass: 'btn-primary'}];

              dialogProvider.messageBox(title, msg, btns, function(result) {
                if (result === 'OK') {
                  $http.post("/api/" + entityPartUrl + "/" + entity.id + "/" + fnType).success(function(data) {
                    entity[opts.statusField || 'status'] = data.replace(/"/g, '');
                    toastr.success(scope.translate('dialogService.changeStatus.success'));
                  });
                }
              });
            }
          }
        }
      };

      return dialogProvider;
    }])
    .run(["$templateCache", function($templateCache) {
      $templateCache.put("template/messageBox/message.html",
          '<div class="modal-header"><h3>{{ title }}</h3></div>\n' +
          '<div class="modal-body"><p ng-bind-html="message"></p></div>\n' +
          '<div class="modal-footer"><button ng-repeat="btn in buttons" ng-click="close(btn.result)" class="btn" ng-class="btn.cssClass">{{ btn.label }}</button></div>\n');
    }])
    .controller('MessageBoxController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
      $scope.close = function (result) { $modalInstance.close(result); }
    }]);

