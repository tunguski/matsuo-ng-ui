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


// general party formating function
var partyFormatResult = formatResult(function (party) {
  if (party.firstName) {
    return '' + party.firstName + ' ' + party.lastName;
  } else if (party.fullName) {
    return '' + party.fullName;
  }
});
// person formating function
var personFormatResult = formatResult(function (person) {
  return '' + person.firstName + ' ' + person.lastName + (person.pesel ? ' ' + person.pesel : '');
});
// simpleParty search results formating function
var simplePartyFormatResult = formatResultByField('name');


// fixme: move to upper project
function extractEventEndDate(element) {
  if (element.endDate) {
    return moment(element.endDate).toDate();
  } else {
    return moment(element.startDate).add(parseInt(element.duration), 'minutes').toDate();
  }
}

// =============================================================================
// formatting
// =============================================================================


function parseDate(date) {
  if (date) {
    if (moment.isMoment(date)) {
      return date;
    } else if (moment(date).isValid()) {
      return moment(date);
    } else if (moment(date, 'HH:mm').isValid()) {
      return moment(date, 'HH:mm');
    }
  }
}


//=============================================================================
//messages and console logging
//=============================================================================

function log(msg) {
  if (window.console && console.log) {
    console.log(msg);
  } else {
    $('#logBox').append(msg);
  }
}


function err(msg) {
  if (window.console && console.log) {
    console.log(msg);
    console.trace();
//  } else {
//    $('#logBox').append(msg);
  }
}


$(document).ready(function() {
  $.ajaxSetup({ error: function (jqXHR, textStatus, errorThrown) {
    log('xhr error: ' + textStatus + '; ' + errorThrown);
  } });
});


function isBetween(date, from, to) {
  var dateMoment = moment(date);
  return dateMoment.isAfter(moment(from)) && dateMoment.isBefore(moment(to));
}


function saveOrUpdate($scope, field, saveFn, updateFn, requestParamsFn) {
  var validationFn = $scope.getService('validationService')($scope);

  function successFn(invokeFn) {
    return function (entity, headers) {
      validationFn();
      invokeFn(entity, headers);
    };
  }

  return function() {
    var entity = $scope[field];
    var requestParams = requestParamsFn ? requestParamsFn() : {};
    var fn = entity.isNew() ? (entity.save || entity.$save) : (entity.update || entity.$update);
    return fn.call(entity, requestParams, successFn(entity.isNew() ? saveFn : updateFn), validationFn);
  };
}


/**
 * options
 *        .listField - string: field to which result list will be put
 *        .refreshMethod - string: scope param with function invoked at each 'query' text change
 *        .queryField - string: scope field containing filter query
 *        .minLength - int: minimum query chars to start ajax invocations
 *        .afterLoadFn - function(elements): function invoked after loading query results
 *
 * Configure query function for simple-search directive
 */
function searchQueryFunction($scope, Resource, options) {
  options = options || {};
  var listField = options.listField || 'elements';
  var refreshMethod = options.refreshMethod || 'refresh';
  var queryField = options.queryField || 'query';

  $scope[listField] = [];

  var searchPromise;

  $scope[refreshMethod] = function(n, o) {
    if (options.minLength && (!n || n.length < options.minLength)) {
      $scope[listField].length = 0;
      return;
    }

    var $timeout = $scope.getService('$timeout');

    if (searchPromise) {
      log('Cancelling query ' + n);
      var cancelled = $timeout.cancel(searchPromise);
      log('Did properly cancel: ' + cancelled);
      searchPromise = null;
    }

    searchPromise = $timeout(function () {
      log('Loading data with query ' + n);
      $scope.__loading = true;
      searchPromise = null;
      Resource.query({ query: $scope.query }, function(data) {
        try {
          $scope[listField].length = 0;
          $scope[listField].pushArray(data);

          if (options.afterLoadFn) {
            options.afterLoadFn(data);
          }
        } finally {
          $scope.__loading = false;
        }
      }, function () {
        $scope.__loading = false;
      });
    }, 500);
  };
  $scope[refreshMethod]();

  $scope.$watch(queryField, $scope[refreshMethod]);
}


function loadAndInjectInternal(elementsList, resourceService, elementGetter, elementName, idResultGetter, resultFn) {
  var elementIds = {};

  angular.forEach(elementsList, function(element) {

    if (_.getByPath(element, elementGetter)) {
      elementIds['' + _.getByPath(element, elementGetter)] = '';
    }
  });

  if (!_.isEmpty(_.keys(elementIds))) {
    resourceService.listByIds({ ids: _.keys(elementIds) }, function(data) {
      angular.forEach(data, function(resultElement) {
        angular.forEach(elementsList, function(element) {
          if (_.getByPath(element, elementGetter) === resultElement[idResultGetter]) {
            _.setByPath(element, elementName, resultElement);
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
  loadAndInjectInternal(elementsList, resourceService, 'id' + _.capitalize(elementName),
      elementName, idResultGetter, resultFn);
}
