'use strict';

function formatResult(printFn) {
  return function (element) {
    if (element) {
      try {
        return printFn(element);
      } catch (e) {
        return '' + element;
      }
    } else {
      return '';
    }
  };
}


function formatResultByField(fieldName) {
  return formatResult(function (element) {
    return '' + element[fieldName];
  });
}


//formatowanie wyników wyszukiwania dowolnych podmiotów
var partyFormatResult = formatResult(function (party) {
  if (party.firstName) {
    return '' + party.firstName + ' ' + party.lastName;
  } else if (party.fullName) {
    return '' + party.fullName;
  }
});
// formatowanie wyników wyszukiwania osób
var personFormatResult = formatResult(function (person) {
  return '' + person.firstName + ' ' + person.lastName + ' ' + person.pesel;
});
// formatowanie wyników wyszukiwania simpleParty
var simplePartyFormatResult = formatResultByField('name');


function extractEventEndDate(element) {
  if (element.endDate) {
    return moment(element.endDate).toDate();
  } else {
    return moment(element.startDate).add('minutes', parseInt(element.duration)).toDate();
  }
}

// =============================================================================
// formatting
// =============================================================================


function formatDate(date) {
  date = parseDate(date);
  if (!date || isNaN(date.getFullYear()) || isNaN(date.getMonth()) || isNaN(date.getDate())) {
    return '';
  } else {
    return date.getFullYear() + '-' + lpad(date.getMonth() + 1, 2) + '-' + lpad(date.getDate(), 2);
  }
}


function formatTime(date) {
  date = parseDate(date);
  if (date) {
    return lpad(date.getHours(), 2) + ':' + lpad(date.getMinutes(), 2);
  } else {
    return '';
  }
}


function formatDateTime(date) {
  return formatDate(date) + ' ' + formatTime(date);
}


function formatDayMoment(date) {
  return moment(parseDate(date)).format('dddd HH:mm');
}


function parseDate(date) {
  if (date) {
    if (moment(date).isValid()) {
      return moment(date).toDate();
    } else if (moment(date, 'HH:mm').isValid()) {
      return moment(date, 'HH:mm').toDate();
    } else if (moment(date, 'YYYY-MM-DD HH:mm').isValid()) {
      return moment(date, 'YYYY-MM-DD HH:mm').toDate();
    } else if (moment(date, 'YYYY-MM-DD').isValid()) {
      return moment(date, 'YYYY-MM-DD').toDate();
    }
  }
}


function lpad(n, p, c) {
  var pad_char = typeof c !== 'undefined' ? c : '0';
  var pad = new Array(1 + p).join(pad_char);
  return (pad + n).slice(-pad.length);
}


/**
 * Value is considered empty if it is undefined, it is null, or (trimmed) 
 * matches ''. Function matches broader - 0 is empty too.
 */
function empty(value) {
  if( typeof value !== 'undefined' ) {
    return !value || !!value.trim();
  } else {
    return true;
  }
}


function lastUrlElement(headers) {
  var url = headers('Location');
  return url.substring(url.lastIndexOf('/') + 1);
}


function clearObject(object) {
  _.keys(object).forEach(function (key) {
    delete object[key];
  });
}


var weekdayLabel = new Array(7);
weekdayLabel[0]='Niedziela';
weekdayLabel[1]='Poniedziałek';
weekdayLabel[2]='Wtorek';
weekdayLabel[3]='Środa';
weekdayLabel[4]='Czwartek';
weekdayLabel[5]='Piątek';
weekdayLabel[6]='Sobota';

//=============================================================================
//messages and console logging
//=============================================================================

/**
 * Interfejs zgodny z wymaganiami dla funkji ajax.error.
 */
function showXhrError(jqXHR, textStatus, errorThrown) {
  log('xhr error: ' + textStatus + '; ' + errorThrown);
}


$(document).ready(function() {
  $.ajaxSetup({ error: showXhrError });
});

function log(msg) {
  if (window.console && console.log) {
    console.log(msg);
  } else {
    $('#logBox').append(msg);
  }
}


function err(msg){
  if (window.console && console.log) {
    console.log(msg);
    console.trace();
//  } else {
//    $('#logBox').append(msg);
  }
}

function isBetween(date, from, to) {
  var dateMoment = moment(date);
  return dateMoment.isAfter(moment(from)) && dateMoment.isBefore(moment(to));
}


function scopeSetter(scope, propertyName) {
  return function (data) { Object.setByPath(scope, propertyName, data); }
}


function saveOrUpdate($scope, field, saveFn, updateFn) {
  var validationFn = $scope.getService('validationService')($scope);

  function successFn(invokeFn) {
    return function (entity, headers) {
      validationFn();
      invokeFn(entity, headers);
    }
  }

  return function() {
    var entity = $scope[field];
    return entity.isNew() ? entity.$save({}, successFn(saveFn), validationFn)
        : entity.$update({}, successFn(updateFn), validationFn);
  }
}


/**
 * options
 *        .listField - string: pole na którym ma być przypisywana lista
 *        .refreshMethod - string: nazwa pola na scopie, na które zostanie przypisana funkcja odświeżająca listę
 *                                 wraz ze zmianą treści 'query'
 *        .queryField - string: nazwa pola na scopie na którym znajduje się wyrazenie filtrowania
 *        .minLength - int: minimalna liczba znaków dla filtrowania
 *        .afterLoadFn - function(elements): funkcja wywoływana po wczytaniu nowej listy elementów; jako argument zostaje
 *                                           przekazana owa lista elementów
 *
 * Konfiguruje funkcję obsługującą filtrowanie danych na bazie dyrektywy simple-search.
 */
function searchQueryFunction($scope, Resource, options) {
  options = options || {};
  var listField = options.listField || 'elements';
  var refreshMethod = options.refreshMethod || 'refresh';
  var queryField = options.queryField || 'query';

  $scope[listField] = [];

  $scope[refreshMethod] = function(n, o) {
    if (options.minLength && (!n || n.length < options.minLength)) {
      $scope[listField].length = 0;
      return;
    }

    Resource.query({ query: $scope.query }, function(data) {
      $scope[listField].length = 0;
      $scope[listField].pushArray(data);

      if (options.afterLoadFn) {
        options.afterLoadFn(data);
      }
    });
  }
  $scope[refreshMethod]();

  $scope.$watch(queryField, $scope[refreshMethod]);
}


/**
 * Jeśli napis zaczyna się od cyfry, dokleja do niego podkreślenie. Każda kropka zostaje zamieniona
 * na podkreślenie.
 */
function normalizeToI18nCode(text) {
  return (/^[0-9]/.test(text) ? '_' : '') + text.replace(/\./g, '_');
}


function getIdFromLocation(headers) {
  var location = headers('Location');
  return parseInt(location.substring(location.lastIndexOf('/') + 1));
}


function loadAndInjectInternal(elementsList, resourceService, elementGetter, elementName, idResultGetter, resultFn) {
  var elementIds = {};

  angular.forEach(elementsList, function(element) {

    if (Object.getByPath(element, elementGetter)) {
      elementIds['' + Object.getByPath(element, elementGetter)] = '';
    }
  });

  if (!_.isEmpty(_.keys(elementIds))) {
    resourceService.listByIds({ ids: _.keys(elementIds) }, function(data) {
      angular.forEach(data, function(resultElement) {
        angular.forEach(elementsList, function(element) {
          if (Object.getByPath(element, elementGetter) === resultElement[idResultGetter]) {
            Object.setByPath(element, elementName, resultElement);
          }
        });
      });

      if (resultFn) {
        resultFn(data);
      }
    });
  }
}


function loadAndInject(elementsList, resourceService, elementName, idResultGetter, resultFn) {
  loadAndInjectInternal(elementsList, resourceService, 'id' + elementName.capitalize(),
      elementName, idResultGetter, resultFn);
};


/**
 * optionsExtensions
 *                  .bindId - boolean, string:Resource
 *                  .bindEntity - string:path, function
 *                  .removeProperties - array[string]: atrybuty domyślne do usunięcia
 *                  .definedElements - lista elementów selecta (wyłączone wczytywanie ajaxowe)
 *                  .additionalQueryParams - obiekt parametrów dodawanych do requesta
 *
 * Typowy błąd w konsoli:
 *     'query function not defined for Select2 undefined'
 * oznacza, że w jspku zdefiniowane zostały błędne referencje
 *     select2='[field].options'
 *     ng-model='[field].value'
 * Nie zgadzają się z definicją selecta - initializeSelect2().
 */
function initializeSelect2($scope, path, url, formatPrefix, optionsExtensions) {
  optionsExtensions = optionsExtensions || {};
  var fieldName = path.split('.').slice(-1)[0];
  var obj = Object.getOrCreate($scope, fieldName);

  // bindId - przy zmianie wybranego elementu selecta, autoatycznie przepisz id do pola w path
  if (optionsExtensions.bindId) {
    $scope.$watch(fieldName + '.value', function(n, o) {
      // zabezpieczenie przed nieskończoną pętlą wywołań
      if (n && Object.getByPath($scope, path) !== n.id) {
        var value = (typeof n === 'object') && ('id' in n) ? n.id : null;
        if (n.$promise) {
          n.$promise.then(function() {
            Object.setByPath($scope, path, value);
          });
        } else {
          Object.setByPath($scope, path, value);
        }
      } else if (!n && o) {
        Object.setByPath($scope, path, null);
      }
    });

    // jeśli wartością bindId jest napis, to oznacza jakiego serwisu Resource użyć, aby pobrać
    // wartość pola przy zmianie id'ka w obiekcie. w efekcie możliwe jest ustawienie selecta po
    // wczytaniu encji modelu
    if (typeof optionsExtensions.bindId === 'string') {
      $scope.$watch(path, function(n, o) {
        // zabezpieczenie przed nieskończoną pętlą wywołań
        if (n && Object.getByPath($scope, fieldName + '.value.id') !== n) {
          var query = {};
          query['id' + optionsExtensions.bindId] = Object.getByPath($scope, path);
          var instance = $scope.getService(optionsExtensions.bindId).get(query, function() {
            Object.setByPath($scope, fieldName + '.value', instance);
          });
        } else if (!n && o) {
          Object.setByPath($scope, fieldName + '.value', null);
        }
      });
    }
  }

  // bindEntity - przy zmianie wybranego elementu selecta, automatycznie przepisz obiekt do pola,
  //              do którego prowadzi ścieżka path w atrybucie bindEntity='path'
  if (optionsExtensions.bindEntity) {
    $scope.$watch(fieldName + '.value', function(n, o) {
      // wartość przed i po jest pusta - nie wykonuje pustej operacji
      if ((_.isUndefined(n) || n == null) && (_.isUndefined(o) || o == null)) {
        return;
      }

      if (angular.isString(optionsExtensions.bindEntity)) {
        Object.setByPath($scope, optionsExtensions.bindEntity, n);
      } else if (angular.isFunction(optionsExtensions.bindEntity)) {
        optionsExtensions.bindEntity(n);
      }
    });
  }

  if (optionsExtensions.definedElements) {
    if (_.isFunction(optionsExtensions.definedElements)) {
      var fn = optionsExtensions.definedElements;
      optionsExtensions.definedElements = [];
      fn(optionsExtensions.definedElements);
    }

    optionsExtensions.minimumInputLength = 0;
    optionsExtensions.query = function(query) { query.callback({ results: optionsExtensions.definedElements }); };
    url = false;
  }


  obj.options = $.extend(true, {
    minimumInputLength : 3,
    // instead of writing the function to execute the request we use Select2's convenient helper
    ajax : {
      url: url,
      dataType: 'json',
      // FIXME: nie działa?
      quietMillis: 500,
      data: function(term, page) {
        var params = {
          query : term, // search term
          page_limit : 100,
          page: page
        };

        if (optionsExtensions.additionalQueryParams) {
          $.extend(true, params, optionsExtensions.additionalQueryParams);
        }

        return params;
      },
      // parse the results into the format expected by Select2.
      // since we are using custom formatting functions we do not need to alter remote JSON data
      results : function(data, page) { return { results : data }; }
    },
    // omitted for brevity, see the source of this page
    formatResult : formatPrefix ? eval(formatPrefix + 'FormatResult') : null,
    // omitted for brevity, see the source of this page
    formatSelection : formatPrefix ? eval(formatPrefix + 'FormatResult') : null,
    // apply css that makes the dropdown taller
    dropdownCssClass : 'bigdrop',
    // we do not want to escape markup since we are displaying html in results
    escapeMarkup : function(m) { return m; }
  }, optionsExtensions);

  if (!url) {
    delete obj.options.ajax;
  }

  if (optionsExtensions && optionsExtensions.removeProperties) {
    $.forEach(optionsExtensions.removeProperties, function(element) {
      delete obj.options[element];
    });
  }


  function initializeEnumSelect2($scope, $http, name, options) {
    options = options || {};
    initializeSelect2($scope, 'form.' + name, null, name, $.extend(true, {
      minimumInputLength: 0,
      bindId: true,
      definedElements: loadEnum($http, name + 'Enum')
    }, options));
  }
}

