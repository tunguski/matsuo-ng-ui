'use strict';

angular.module('mt.ui')
    .controller('TestDataCtrl', function ($scope) {
      $scope.infoData = {
        firstName: 'John',
        lastName: 'Doe',
        address: {
          street: '5th Avenue',
          town: 'New York',
          houseNumber: '10',
          apartmentNumber: '227'
        }
      };
    })
;