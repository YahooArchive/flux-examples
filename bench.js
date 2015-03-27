require('babel/register');
var Benchmark = require('benchmark');
var Promise = require('bluebird');
var React = require('./node_modules/react');
var ReactShim = require('./fluxible-router-shim/node_modules/react');
var navigateAction = require('fluxible-router').navigateAction;
var context, contextShim;

var ReactPromise = new Promise (function (resolve) {
    var app = require('./fluxible-router/app');
    context = app.createContext();
    context.executeAction(navigateAction, {
        url: '/'
    }, function (err) {
        resolve();
    });
});


var ReactShimPromise = new Promise (function (resolve) {
    var appShim = require('./fluxible-router-shim/app');
    contextShim = appShim.createContext();
    contextShim.executeAction(navigateAction, {
        url: '/'
    }, function (err) {
        resolve();
    });
});

Promise.all([ReactPromise, ReactShimPromise]).then(function () {
    var suite = new Benchmark.Suite();
    var output, outputShim;
    global.React = React;
    global.ReactShim = ReactShim;
    global.context = context;
    global.contextShim = contextShim;
    console.log(React.renderToStaticMarkup(context.createElement()));
    console.log(ReactShim.renderToStaticMarkup(contextShim.createElement()));

    // add tests
    suite.add('React', function() {
        output = React.renderToString(context.createElement());
    })
    .add('ReactShim', function() {
        outputShim = ReactShim.renderToString(contextShim.createElement());
    })
    // add listeners
    .on('error', function (e) {
        throw e.target.error;
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
        if (output !== outputShim) {
            throw new Error('Output not the same');
        }
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ async: true, defer: true});
}).catch(function (e) {
    console.log(e.stack || e);
});
