'use strict';

/**
 * Permissions service for UI. It shows/hides parts of view. It does not force security, only visibility. Data
 * security needs to be forced on server side.
 */
angular.module('mt.ui')
    .factory('permissionService', function($rootScope, $http, $q) {
      var permissionService = {
        checkedPermissions: {},

        isPermitted: function (permissionString) {
          var deferred = $q.defer();

          if (permissionString in permissionService.checkedPermissions) {
            deferred.resolve(permissionService.checkedPermissions[permissionString]);
          } else {
            permissionService.lookupPermissions([ permissionString ]).success(function (data) {
              deferred.resolve(permissionService.checkedPermissions[permissionString]);
            });
          }

          return deferred.promise;
        },

        lookupPermissions: function (permissionsStrings) {
          return $http.post('/api/login/permissions', permissionsStrings).success(function (data) {
            angular.forEach(permissionsStrings, function (element, index) {
              permissionService.checkedPermissions[element] = data[index];
            });
          });
        },

        reloadPermissions: function () {
          permissionService.lookupPermissions(_.keys(permissionService.checkedPermissions));
        }
      };

      $rootScope.$on('loggedIn', permissionService.reloadPermissions);

      return permissionService;
    })
    // eager loading
    .run(function (permissionService) {})
;

