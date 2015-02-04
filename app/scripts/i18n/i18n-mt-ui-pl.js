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

        validation: {
          error: {
            NotNull: 'Pole nie może być puste',
            NotEmpty: 'Pole nie może być puste',
            PESEL: 'Nieprawidłowy pesel',
            no_cash_register_set: 'Nie wybrano kasy',
            PWZ: 'Nieprawidłowy numer PWZ'
          }
        },

        select: {
          placeholderText: 'Wybierz element ...'
        },

        cancel: 'Anuluj',
        back: 'Powrót',
        save: 'Zapisz',
        create: 'Utwórz'

      });
    });
