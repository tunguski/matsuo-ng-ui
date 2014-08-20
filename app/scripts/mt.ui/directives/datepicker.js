'use strict';

angular.module('mt.ui')
    .directive('mtDatepicker', function() {
      return {
        restrict: 'A',
        scope: {
          opts: '=mtDatepicker',
          ngModel: '='
        },
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          scope.opts = scope.opts || {};
          scope.inputHasFocus = false;

          ngModelCtrl.$formatters.push(function(modelValue) {
            return moment.isMoment(modelValue) ? modelValue.format('DD-MM-yyyy') : modelValue;
          });
          ngModelCtrl.$parsers.push(function(viewValue) {
            var result = moment(viewValue, 'DD-MM-YYYY');
            return result.isValid() ? result : undefined;
          });

          element.datepicker(scope.opts).on('changeDate', function(e) {
            return scope.$apply(function() {
              return scope.ngModel = moment(e.date);
            });
          });
          element.find('input').on('focus', function() {
            return scope.inputHasFocus = true;
          }).on('blur', function() {
            return scope.inputHasFocus = false;
          });
          return scope.$watch('ngModel', function(newValue) {
            if (!scope.inputHasFocus) {
              return element.datepicker('update', ngModelCtrl.$viewValue);
            }
          });
        }
      };
    });
