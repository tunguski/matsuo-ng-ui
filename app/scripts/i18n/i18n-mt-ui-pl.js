'use strict';

angular.module('mt.ui')
    .config(function($translateProvider) {
      // polish translation
      $translateProvider.translations('pl', {

        dialog: {
          changeStatus: {
            successText: 'Zmieniono status'
          },
          remindPassword: {
            title: 'Zapomniałem hasła',
            provideUserNameText: 'Podaj nazwę użytkownika któremu zostanie przesłany link aktywacyjny',
            sendLink: 'Wyślij przypomnienie',
            success: 'Przesłano email z linkiem. Proszę kliknąć w link aby zmienić hasło.'
          },
          createAccount: {
            success: 'Przesłano email z linkiem. Proszę kliknąć w link aby potwierdzić zgodność adresu email.'
          }
        },

        login: {
          login: 'Login',
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
        },

        cancel: 'Anuluj'

      });
    });
