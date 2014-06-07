angular.module('mt.ui')
    .directive('hr', function factory() {
      return {
        restrict: 'A',
        replace: true,
        template: '<div class="row-fluid">' +
                    '<div class="span12">' +
                      '<hr />' +
                    '</div>' +
                  '</div>'
      };
    })
    .directive('h4', function factory() {
      return {
        restrict: 'A',
        transclude: true,
        replace: true,
        template: '<div class="row-fluid">' +
                    '<div class="span12">' +
                      '<h4 ng-transclude></h4>' +
                    '</div>' +
                  '</div>'
      };
    })
    .directive('h5', function factory() {
      return {
        restrict: 'A',
        transclude: true,
        replace: true,
        template: '<div class="row-fluid">' +
                    '<div class="span12">' +
                      '<h5 ng-transclude></h5>' +
                    '</div>' +
                  '</div>'
      };
    })
;