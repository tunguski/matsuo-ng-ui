'use strict';

angular.module('mt.ui')
    .config(function($translateProvider) {
      // english translation
      $translateProvider.translations('en', {

        dialog: {
          changeStatus: {
            successText: 'Status changed'
          }
        },

        login: {
          success: 'Logged in'
        },

        form: {
          download: {
            pdf: 'Download',
            xls: 'Download xls'
          },
          print: 'Print',
          send: {
            email: 'Send email'
          },
          search: 'Search'
        }
      });
    });
