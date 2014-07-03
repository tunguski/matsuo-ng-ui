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
                    '<div class="input-group">' +
                      '<input type="text" name="query" ng-model="query" class="form-control">' +
                      '<div class="input-group-btn">' +
                        '<button type="button" ng-click="clearQuery()" class="btn btn-default"><i class="fa fa-times"></i></button>' +
                        '<button type="button" ng-if="showSearchButton" ng-click="searchFn({query: query})" class="btn btn-default" translate="form.search"></button>' +
                      '</div>' +
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
