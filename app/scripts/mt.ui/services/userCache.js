'use strict';

/**
 * Permissions service for UI. It shows/hides parts of view. It does not force security, only visibility. Data
 * security needs to be forced on server side.
 */
angular.module('mt.ui')
    .service('userCache', function(User) {
      var userCache = {
        users: {},
        loadIfAbsent: function (idUser) {
          function doLoadUser (id) {
            if (!userCache.users['' + id]) {
              User.get({ idUser: id }, function (user) {
                userCache.users['' + id] = user;
              });
            }
          }

          if (angular.isArray(idUser)) {
            angular.forEach(idUser, doLoadUser);
          } else {
            doLoadUser(idUser);
          }
        }
      };

      return userCache;
    });

