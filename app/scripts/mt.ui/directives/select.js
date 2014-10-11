'use strict';

angular.module('mt.ui')
    .directive('uiSelect', function factory() {
      return {
        require: 'uiSelect',
        link: function (scope, iElement, iAttrs, $select) {

          scope.placeholderText = function () {
            return 'Input: ' + $select.selected;
          };
        }
      };
    });
