angular.module('mt.ui')
    .directive('infoTable', [ function() {
      return {
        replace: false,
        restrict: 'EA',
        link: function ( scope, element, attrs ) {
          element.addClass("table table-condensed details-table");
        }
      };
    }])
    .directive('row', [ function() {
      return {
        replace: false,
        restrict: 'EA',
        scope: {
          first: '=',
          second: '=',
          third: '='
        },
        templateUrl: 'template/infoTable/tableRow.html',
        link: function ( scope, element, attrs ) {
        }
      };
    }])
    .run(["$templateCache", function($templateCache) {
      $templateCache.put("template/infoTable/tableRow.html",
          '<td ng-bind-html="first"></td><td ng-bind-html="second"></td><td ng-if="third"  ng-bind-html="third"></td>');
    }])
;

