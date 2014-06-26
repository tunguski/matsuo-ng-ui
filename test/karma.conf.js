// Karma configuration
// Generated on Fri May 30 2014 13:51:14 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/underscore/underscore.js',
      'bower_components/moment/moment.js',
      'bower_components/moment/lang/pl.js',
      'bower_components/select2/select2.js',

      'bower_components/angular/angular.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
      'bower_components/angular-ui-select2/src/select2.js',
      //'bower_components/angular-translate/angular-translate.js',
      'app/scripts/external/angular-translate-fix.js',

      'bower_components/matsuo-js-util/matsuo-js-util.js',
      'bower_components/matsuo-ng-resource/matsuo-ng-resource.js',
      'bower_components/matsuo-ng-route/matsuo-ng-route.js',

      'bower_components/angular-mocks/angular-mocks.js',

      'app/scripts/mt.ui/ui.js',
      'app/scripts/**/*.js',

      // tests
      'test/scripts/lib/*.js',
      'test/scripts/unit/*.js'
    ],

    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "app/scripts/mt.ui/*.js": "coverage"
    },


    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    },


    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress',
      'coverage'
    ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
