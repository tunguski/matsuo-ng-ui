angular.module('mt.ui')
    .config(function($translateProvider) {
      // polish translation
      $translateProvider.translations('pl', {

        dialogService: {
          changeStatus: {
            success: 'Zmieniono status'
          }
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