'use strict';

angular.module('mt.ui')
    .directive('downloadButton', function factory() {
      return {
        replace: true,
        scope: {
          model: '=downloadButton',
          fileName: '@fileName'
        },
        template: '<div class="btn-group">' +
            '<a class="btn btn-info" class="btn btn-info" ng-href="{{pdfHref()}}" target="_blank" translate>form.download</a>' +
            '<button class="btn btn-info dropdown-toggle" data-toggle="dropdown">' +
            '<span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu">' +
            '<li><a tabindex="-1" ng-click="printFile(pdfHref())" translate>form.print</a></li>' +
            // xls version only for reports
            '<li><a tabindex="-1" ng-show="fileName" ng-href="{{xlsHref()}}" target="_blank" translate>form.download.xml</a></li>' +
            '<li><a tabindex="-1" translate>form.send.email</a></li>' +
            '</ul>' +
            '</div>',
        link: function (scope, iElement, iAttrs) {
          scope.showButton = function () {
            return scope.fileName || scope.model.id;
          };

          function generateLink(type) { return function () {
            if (scope.model) {
              return scope.fileName ? '/api/reports/' + type + '/' + scope.fileName + '?' + _.toUrlParams(scope.model)
                  : '/api/prints/' + scope.model.id;
            } else {
              return '';
            }
          }}

          scope.pdfHref = generateLink('pdf');
          scope.xlsHref = generateLink('xls');
        }
      };
    });
