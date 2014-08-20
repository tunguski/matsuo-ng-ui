'use strict';

angular.module('mt.ui')
    .directive('mtDatepicker', function() {
      return {
        restrict: 'A',
        scope: {
          opts: '=mtDatepicker',
          ngModel: '='
        },
        link: function(scope, element) {
          scope.opts = scope.opts || {};
          scope.inputHasFocus = false;

          element.datepicker(scope.opts).on('changeDate', function(e) {
            var value = moment(e.date).format(scope.opts.momentFormat);
            return scope.$apply(function() {
              return scope.ngModel = value;
            });
          });
          element.find('input').on('focus', function() {
            return scope.inputHasFocus = true;
          }).on('blur', function() {
            return scope.inputHasFocus = false;
          });
          return scope.$watch('ngModel', function(newValue) {
            if (!scope.inputHasFocus) {
              return element.datepicker('update', newValue);
            }
          });
        }
      };
    });
