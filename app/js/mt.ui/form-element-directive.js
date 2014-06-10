'use strict';

angular.module('mt.ui')
    .directive('mtFormPart', function () {
      return {
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>',
        scope: {
          entityClass: '@mtFormPart',
          entityName: '@mtEntityName',
          inline: '@mtInline',
          singleField: '@mtSingleField',
          cssClasses: '@mtCssClasses'
        },
        controller: function ($scope) {
          this.baseParams = function () {
            return {
              entityClass: $scope.entityClass,
              entityName: $scope.entityName,
              inline: $scope.inline,
              singleField: $scope.singleField,
              cssClasses: $scope.cssClasses
            };
          }
        }
      };
    })

    .directive('mtFormField', function () {
      return {
        require: '^mtFormPart',
        replace: true,
        template: '<ng-include src="fieldUrl()" />',
        scope: {
          fieldName: '@mtFormField',
          htmlName: '@mtHtmlName',
          cssClasses: '@mtCssClasses'
        },
        link: function (scope, iElement, iAttrs, ctrl) {
          scope.fieldUrl = function () {
            var params = ctrl.baseParams();
            params.fieldName = scope.fieldName;
            params.htmlName = scope.htmlName;
            if (scope.cssClasses) {
              params.cssClasses = (params.cssClasses ? params.cssClasses + ' ' : '') + scope.cssClasses;
            }

            angular.forEach(_.filter(_.keys(iAttrs.$attr), function (key) { return key.indexOf('mtf') == 0; }),
                function (key) {
                  params[key] = iAttrs[key];
                });


            return "/field/url.html?" + _.toUrlParams(params);
          };

        }
      };
    })
;