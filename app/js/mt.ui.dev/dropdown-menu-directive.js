'use strict';

/**
 * Unsued
 */

angular.module('mt.ui.dev')
    .directive('dropdownMenu', [ function() {
      return {
        replace: true,
        transclude: true,
        restrict: 'EA',
        templateUrl: 'template/dropdownmenu/dropdownMenu.html'
      };
    }])
    .directive('dropdownToggle', [ function() {
      return {
        replace: true,
        restrict: 'EA',
        templateUrl: 'template/dropdownmenu/dropdownToggle.html',
        link: function ( scope, element, attrs ) {
          if (attrs.dropdownToggle) {
            element.html('<a class="' + attrs.dropdownToggle + '"></a>');
          }
        }
      };
    }])
    .directive('dropdownElements', [ function() {
      return {
        replace: true,
        restrict: 'EA',
        link: function ( scope, element, attrs ) {
          element.addClass('dropdown-menu');
          angular.forEach(element.children(), function (child) {
            child = angular.element(child);
            if (child.text()) {
              child.html('<a>' + child.text() + '</a>');
            }
            angular.element(child.children()[0]).attr('ng-click', child.attr('ng-click'));
            angular.element(child.children()[0]).attr('href', child.attr('href'));
          });
        }
      };
    }])
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('template/dropdownmenu/dropdownMenu.html',
          '<div class="btn-group" ng-transclude></div>');
    }])
    .run(['$templateCache', function($templateCache) {
      $templateCache.put('template/dropdownmenu/dropdownToggle.html',
          '<a class="btn btn-small dropdown-toggle" data-toggle="dropdown" href="#"></a>');
    }])
;
