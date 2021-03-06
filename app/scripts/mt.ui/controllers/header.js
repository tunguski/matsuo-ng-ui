'use strict';

angular.module('mt.ui')
    /**
     * @ngdoc function
     * @name mt.ui.controller:HeaderCtrl
     * @description
     * # HeaderCtrl
     * Controller of the mt.ui
     */
    .controller('HeaderCtrl', function ($scope, $location, $dialog) {

      $scope.showHelp = function() {
        log('Show help for: ' + $location.path());

        function cleanPath() {
          return _.reduce($location.path().split('/'), function (memo, element) {
            return memo + (parseInt(element) ? '' : '/' + element); }, '').substr(1);
        }

        $dialog.simpleDialog('help' + cleanPath() + 'Help.html', 'HelpModalCtrl')();
      };
    })
;
