'use strict';

angular.module('mt.ui')
    .config(function($translateProvider) {
      // polish translation
      $translateProvider.translations('en', {

        dialogService: {
          changeStatus: {
            success: 'Status changed'
          }
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
