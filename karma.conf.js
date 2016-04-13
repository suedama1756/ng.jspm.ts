// Karma configuration
// Generated on Wed Apr 13 2016 22:04:14 GMT+0100 (GMT Summer Time)
var glob = require('glob'),
    path = require('path');

module.exports = function(config) {
    // there is a bug with the systemjs plugin when resolved ** patterns, to overcome this 
    // we read the files in manually.
    var files = glob.sync(path.join(__dirname, 'jspm/tests/**/*-spec.js')).map(x => {
        return {
            pattern: x,
            watched: true,
            included: true
        }
    });
    
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'mocha'],


        // list of files / patterns to load in the browser
        files: files.concat([{
            pattern: 'jspm/**/*.js',
            watched: true,
            included: false
        }, {
            pattern: 'node_modules/chai/chai.js',
            watched: false,
            included: false
        }]),

        systemjs: {
            configFile: './src/js/jspm/config.js',
            config: {
                // provide locations of additional dependencies required for testing
                paths: {
                    systemjs: 'jspm/modules/system.src.js',
                    chai: 'node_modules/chai/chai.js'
                }
            }
        },

        proxies: {
            '/base/modules/': '/base/jspm/modules/'
        },

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'mocha'],

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
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}