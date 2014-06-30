'use strict';

angular.module('mt.ui')
    .directive('simpleSearch', function factory() {
      return {
        replace: true,
        transclude: true,
        scope: {
          query: '=query',
          searchFn: '&?search'
        },
        template: '<form class="form-inline">' +
                    '<div class="input-append">' +
                      '<input type="text" name="query" ng-model="query" class="input-medium">' +
                      '<button type="button" ng-click="clearQuery()" class="btn btn-small"><i class="fa fa-times"></i></button>' +
                      '<button type="button" ng-if="showSearchButton" ng-click="searchFn({query: query})" class="btn btn-small" translate="form.search"></button>' +
                    '</div>' +
                    '<span ng-transclude></span>' +
                  '</form>',
        link: function (scope, iElement, iAttrs) {
          scope.clearQuery = function() {
            scope.query = '';
          };

          scope.showSearchButton = iAttrs.search;

          if (iAttrs.placeholder) {
            // form -> div -> input
            iElement.find('input').attr('placeholder', iAttrs.placeholder);
          }
        }
      };
    });
