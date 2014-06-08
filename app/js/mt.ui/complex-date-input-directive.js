'use strict';

angular.module('mt.ui')
    .directive('complexDate', [ '$document', '$timeout', function($document, $timeout) {
      return {
        replace: true,
        restrict: 'EA',
        templateUrl: '/views/template/complexDate/complexDate.jsp',
        controller: function($scope) {
          $scope.choose = function (type) {
            $scope.complexDateType = type;
          }
        },
        link: function ( scope, element, attrs) {
          scope.complexDate = { isOpen: false };

          var documentClickBind = function(event) {
            if (scope.complexDate.isOpen && $(event.target).closest($(element[0])).length == 0) {
              scope.$apply(function() {
                scope.complexDate.isOpen = false;
                $document.unbind('click', documentClickBind);
              });
            }
          };

          element.click(function (e) {
            scope.$apply(function () {
              if (!scope.complexDate.isOpen) {
                scope.complexDate.isOpen = true;
                scope.complexDateType = 'singlePeriod';
                $timeout(function() {
                  $document.bind('click', documentClickBind);
                });
              }
            });
          });
        }
      };
    }])
;

