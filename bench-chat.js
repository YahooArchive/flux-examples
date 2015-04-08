require('babel/register');
var Benchmark = require('benchmark');
var Promise = require('bluebird');
var React = require('./react/stock');
var ReactOpt = require('./react/optimized');
var navigateAction = require('fluxible-router').navigateAction;
var context, contextES6, contextOpt;

var ReactPromise = new Promise (function (resolve) {
    var app = require('./chat/app');
    var fetchrPlugin = app.getPlugin('FetchrPlugin');
    fetchrPlugin.registerService(require('./chat/services/message'));
    context = app.createContext();
    context.executeAction(navigateAction, {
        url: '/'
    }, function (err) {
        resolve();
    });
});

var ReactES6Promise = new Promise (function (resolve) {
    var app = require('./chat-es6/app');
    var fetchrPlugin = app.getPlugin('FetchrPlugin');
    fetchrPlugin.registerService(require('./chat-es6/services/message'));
    contextES6 = app.createContext();
    contextES6.executeAction(navigateAction, {
        url: '/'
    }, function (err) {
        resolve();
    });
});


var ReactOptPromise = new Promise (function (resolve) {
    var app = require('./chat-optimized/app');
    var fetchrPlugin = app.getPlugin('FetchrPlugin');
    fetchrPlugin.registerService(require('./chat-optimized/services/message'));
    contextOpt = app.createContext();
    contextOpt.executeAction(navigateAction, {
        url: '/'
    }, function (err) {
        resolve();
    });
});

Promise.all([ReactPromise, ReactES6Promise, ReactOptPromise]).then(function () {
    var suite = new Benchmark.Suite();
    var output, outputShim, outputES6;
    global.React = React;
    global.ReactOpt = ReactOpt;
    global.context = context;
    global.contextOpt = contextOpt;
    output = React.renderToStaticMarkup(context.createElement());
    outputES6 = ReactOpt.renderToStaticMarkup(contextES6.createElement());
    outputShim = ReactOpt.renderToStaticMarkup(contextOpt.createElement());
    if (output !== outputShim || output !== outputES6) {
        throw new Error('Output not the same');
    }

    // add tests
    suite.add('React', function() {
        React.renderToString(context.createElement());
    })
        .add('ReactES6', function() {
            React.renderToString(contextES6.createElement());
        })
        .add('ReactOpt', function() {
            ReactOpt.renderToString(contextOpt.createElement());
        })
    // add listeners
    .on('error', function (e) {
        throw e.target.error;
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ async: true, defer: true});
}).catch(function (e) {
    console.log(e.stack || e);
});
