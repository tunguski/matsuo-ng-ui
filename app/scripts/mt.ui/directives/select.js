'use strict';

angular.module('mt.ui')
    .directive('uiSelect', function factory($http) {
      return {
        require: ['uiSelect', 'ngModel'],
        link: function (scope, iElement, iAttrs, ctrls) {
          var $select = ctrls[0];
          var modelCtrl = ctrls[1];

          scope.options = {
            placeholderText: 'select.placeholderText',
            minimumInputLength: 3
          };

          if (iAttrs.mtSelectOptions) {
            scope.options = $.extend(true, scope.options, scope.$parent.$eval(iAttrs.mtSelectOptions));
          }

          // shortcut
          var opts = scope.options;

          // bindId - when select's value changed, rewrite object's id to field described by path int bindId attr
          if (opts.bindId) {
            modelCtrl.$viewChangeListeners.push(function () {
              var n = modelCtrl.$modelValue;
              // id entity
              var value = (typeof n === 'object') && ('id' in n) ? n.id : null;
              if (n.$promise) {
                n.$promise.then(function() {
                  _.setByPath(scope, opts.bindId, value);
                });
              } else {
                _.setByPath(scope, opts.bindId, value);
              }
            });
          }

          if (opts.definedElements) {
            if (_.isFunction(opts.definedElements)) {
              var fn = opts.definedElements;
              opts.definedElements = [];
              fn(opts.definedElements);
            }

            opts.minimumInputLength = 0;
            opts.url = false;
          }

          if (opts.tags) {
            opts.minimumInputLength = 0;
          }



          scope.formatElement = opts.formatElement;

          scope.searchElements = function (searchText) {
            if (opts.url && opts.minimumInputLength <= searchText.length) {
              $http.get(opts.url + '?' + _.toUrlParams({ query : searchText }))
                  .success(function (data) {
                    scope.elements = data;
                  });
            }
          };

          scope.elements = opts.definedElements ? opts.definedElements : [];
        }
      };
    });
