'use strict';

/**
 * Displaying validation errors in forms.
 */
angular.module('mt.ui')
    .factory('validationService', function($dialog) {


      /**
       * Clear validation errors.
       */
      function clearValidationErrors($scope, formName) {
        var form = $scope[formName];
        for (var fieldName in form) {
          if (fieldName.indexOf('$') != 0 && typeof form[fieldName].serverError === 'string') {
            delete form[fieldName].serverError;
          }
        }
      }


      return function ($scope, formName, entityName) {
        return function(errorResponse) {
          errorResponse = errorResponse || { data: {} };

          formName = formName || 'form';
          entityName = entityName || 'entity';
          var entity = $scope[entityName];

          var json = errorResponse.data || errorResponse;
          // ??? WTF ???
          while (_.isString(json)) {
            json = JSON.parse(json);
          }

          clearValidationErrors($scope, formName);

          // process field errors
          if (json.fieldErrors) {
            $.each(json.fieldErrors, function(key, value) {
              var validationField = _.getOrCreate($scope, formName + '.' + (entityName + '.' + key).replace(/\./g, '_'));
              validationField.serverError = $scope.translate('validation.error.' + value);
            });
          }

          // process global errors
          if (json.globalErrors && json.globalErrors.length > 0) {
            var msg = '<ul>';

            angular.forEach(json.globalErrors, function (error) {
              msg = msg + '<li><b>' + $scope.translate('validation.error.' + error) + '</b></li>';
            });

            msg = msg + '</ul>';

            $dialog.messageBox('Błąd', msg, [{result:'OK', label: 'Zamknij', cssClass: 'btn-primary'}]);
          }
        };
      };
    });

