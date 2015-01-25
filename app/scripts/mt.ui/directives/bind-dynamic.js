'use strict';

angular.module('mt.ui')
    .directive('bindDynamic', function () {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          scope.$watch(attrs.bindDynamic, function (content) {
            element.empty();
            element.append(content);
          });
        }
      };
    })
    ;
