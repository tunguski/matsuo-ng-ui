'use strict';

angular.module('mt.ui')
    .config(function($translateProvider) {
      // english translation
      $translateProvider.translations('en', {

        dialog: {
          changeStatus: {
            successText: 'Status changed'
          },
          remindPassword: {
            title: 'Forgotten password',
            provideUserNameText: 'Provide username for which activation link should be sent',
            sendLink: 'Send reminder',
            success: 'Email with activation link was sent. Please click on link to change the password.'
          },
          createAccount: {
            success: 'Email with activation link was sent. Please click on link for next step.'
          }
        },

        login: {
          login: 'Login',
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
        },

        validation: {
          error: {
            NotNull: 'Field cannot be empty',
            NotEmpty: 'Field cannot be empty',
            PESEL: 'Incorrect ID number',
            no_cash_register_set: 'No cash register set',
            PWZ: 'Incorrect PWZ number'
          }
        },

        select: {
          placeholderText: 'Select option ...'
        },

        cancel: 'Cancel',
        back: 'Back',
        save: 'Save',
        create: 'Create'

      });
    });
