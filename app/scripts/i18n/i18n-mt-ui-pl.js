'use strict';

angular.module('mt.ui')
    .config(function($translateProvider) {
      // polish translation
      $translateProvider.translations('pl', {

        dialog: {
          changeStatus: {
            successText: 'Zmieniono status'
          }
        },

        login: {
          success: 'Zalogowano do systemu'
        },

        form: {
          download: {
            pdf: 'Pobierz',
            xls: 'Pobierz xls'
          },
          print: 'Drukuj',
          send: {
            email: 'Wyślij mailem'
          },
          search: 'Wyszukaj'
        }
      });
    });
