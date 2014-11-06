'use strict';

angular.module('mt.ui')
    .directive('mtFocusModel', function($timeout) {
      return {
        link: function ( scope, element, attrs ) {
          scope.$watch( attrs.mtFocusModel, function ( val ) {
//            log(attrs.mtFocusModel + ' : ' + val);
            if ( angular.isDefined( val ) && val ) {
              $timeout(element.focus);
            }
          }, true);

          element.bind('blur', function () {
            attrs.mtFocusModel = false;
            if ( angular.isDefined( attrs.mtFocusLost ) ) {
              scope.$apply( attrs.mtFocusLost );

            }
          });
        }
      };
    });