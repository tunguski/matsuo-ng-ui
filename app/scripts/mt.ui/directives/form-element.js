'use strict';

angular.module('mt.ui')
    .value('mtFormConfig', {
      bootstrapUrlBase: '/api/bootstrapRenderer'
    })
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
          };
        }
      };
    })

    .directive('mtFormField', function ($http, $compile, mtFormConfig) {
      return {
        require: '^mtFormPart',
        replace: true,
        template: '<div ng-bind-html="fieldBody"></div>',
        scope: true,
        link: function (scope, iElement, iAttrs, ctrl) {
          function fieldUrl() {
            // get basic params from outer mt-form-part
            var params = ctrl.baseParams();
            // basic parameters
            params.fieldName = iAttrs.mtFormField;
            params.htmlName = iAttrs.mtHtmlName;
            if (iAttrs.mtCssClasses) {
              params.cssClasses = (params.cssClasses ? params.cssClasses + ' ' : '') + iAttrs.mtCssClasses;
            }

            // rewrite all attributes which name starts from mtf to params
            angular.forEach(_.filter(_.keys(iAttrs.$attr), function (key) { return key.indexOf('mtf') === 0; }),
                function (key) {
                  params[key] = iAttrs[key];
                });

            // add url prefix
            return mtFormConfig.bootstrapUrlBase + '?' + _.toUrlParams(params);
          }

          $http.get(fieldUrl()).success(function (html) {
            // cleanup of template
            html = html.trim();
            if (html.indexOf('"') == 0) {
              html = html.substr(1, html.length - 2).trim();
            }
            html = html.replace(/\\"/g, '"').replace(/\\n/g, '');
            //iElement.html(html);
            scope.fieldBody = $compile(html)(scope).get();
          });
        }
      };
    })
;
