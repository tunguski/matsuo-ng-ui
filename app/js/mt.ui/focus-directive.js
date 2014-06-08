'use strict';

angular.module('mt.ui')
    .directive('ngFocusModel', function($timeout) {
      return {
        link: function ( scope, element, attrs ) {
          scope.$watch( attrs.ngFocusModel, function ( val ) {
            log(attrs.ngFocusModel + ' : ' + val);
            if ( angular.isDefined( val ) && val ) {
              $timeout( function () {
                if (element.select2) {
                  element.select2('focus');
                } else {
                  element[0].focus();
                }
              });
            }
          }, true);

          element.bind('blur', function () {
            attrs.ngFocusModel = false;
            if ( angular.isDefined( attrs.ngFocusLost ) ) {
              scope.$apply( attrs.ngFocusLost );

            }
          });
        }
      };
    });