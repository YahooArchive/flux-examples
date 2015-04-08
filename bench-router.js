require('babel/register');
var Benchmark = require('benchmark');
var Promise = require('bluebird');
var React = require('./react/stock');
var ReactOpt = require('./react/optimized');
var navigateAction = require('fluxible-router').navigateAction;
var context, contextOpt;

var ReactPromise = new Promise (function (resolve) {
    var app = require('./fluxible-router/app');
    context = app.createContext();
    context.executeAction(navigateAction, {
        url: '/'
    }, function (err) {
        resolve();
    });
});


var ReactOptPromise = new Promise (function (resolve) {
    var appShim = require('./fluxible-router-optimized/app');
    contextOpt = appShim.createContext();
    contextOpt.executeAction(navigateAction, {
        url: '/'
    }, function (err) {
        resolve();
    });
});

Promise.all([ReactPromise, ReactOptPromise]).then(function () {
    var suite = new Benchmark.Suite();
    var output, outputShim;
    global.React = React;
    global.ReactOpt = ReactOpt;
    global.context = context;
    global.contextOpt = contextOpt;
    output = React.renderToStaticMarkup(context.createElement());
    //outputShim = ReactOpt.renderToStaticMarkup(contextOpt.createElement());
    if (output !== outputShim) {
        throw new Error('Output not the same');
    }

    // add tests
    suite.add('React', function() {
        React.renderToString(context.createElement());
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
