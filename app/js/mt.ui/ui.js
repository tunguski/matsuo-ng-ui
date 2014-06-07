angular.module('mt.ui', ['ui.bootstrap', 'ui.select2', 'mt.translate'])

    .filter('formatDate', function() { return formatDate; })
    .filter('formatTime', function() { return formatTime; })
    .filter('formatDateTime', function() { return formatDateTime; })
    .filter('formatDayMoment', function() { return formatDayMoment; })
    .filter('weekdayLabel', function() { return function(input) {
      return weekdayLabel[parseDate(input).getDay()];
    }})


    .filter('addressPresenter', function() {
      return function (address) {
        if (!address) {
          return;
        }
        var result = "";

        if (address.zipCode) {
          result = result + address.zipCode + " ";
        }
        result = result + address.town + "<br/>";
        result = result + address.street;
        if (address.houseNumber) {
          result = result + " " + address.houseNumber;
        }
        if (address.apartmentNumber) {
          result = result + " / " + address.apartmentNumber;
        }

        return result
      }
    })


    .run(function ($rootScope, $http, $compile, $timeout, $location) {
      // set page title
      $rootScope.setTitle = function(title, scope) {
        if (scope) {
          // assignment does not work if it changes another compiled part
          $rootScope.title = "";
          $timeout(function() {
            $rootScope.title = $compile(title)(scope).get();
          });
        } else {
          $rootScope.title = title;
        }
      };

      // default date configuration
      $rootScope.dateOptions = {
        appendToBody: true//,
        //dateFormat: 'yy-mm-dd'
      };

      /**
       * Actual year value.
       */
      $rootScope.actualYear = moment().format('YYYY');

      /**
       * Printing file. Appends iframe with url to file.
       */
      $rootScope.printFile = function printFile(urlOfFile) {
        var path = $location.protocol() + "://" + $location.host() + ":" + $location.port() + urlOfFile;
        // print
        var iframe = document.createElement('iframe');
        iframe.src = path;
        iframe.style.display = "none";
        var iFrameLoaded = function() {
          iframe.contentWindow.print();
          iframe.parentNode.removeChild(iframe);
        };
        if (iframe.attachEvent) iframe.attachEvent('onload', iFrameLoaded); // for IE
        else if(iframe.addEventListener) iframe.addEventListener('load', iFrameLoaded, false); // for most other browsers
        else iframe.onload = iFrameLoaded; // just in case there's a browser not covered by the first two

        document.body.appendChild(iframe);
      }
    });
