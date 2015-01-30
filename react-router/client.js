/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
'use strict';
var React = require('react');
var debug = require('debug');
var bootstrapDebug = debug('Example');
var app = require('./app');
var dehydratedState = window.App; // Sent from the server
var Router = require('react-router');
var HistoryLocation = Router.HistoryLocation;

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var mountNode = document.getElementById('app');

    bootstrapDebug('React Rendering');

    Router.run(app.getAppComponent(), HistoryLocation, function (Handler, state) {
        React.render(Handler({
            context: context.getComponentContext()
        }), mountNode, function () {
            bootstrapDebug('React Rendered');
        });
    });
});
