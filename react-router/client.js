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
var navigateAction = require('./actions/navigate');

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var mountNode = document.getElementById('app');

    var firstRender = true;
    Router.run(app.getAppComponent(), HistoryLocation, function (Handler, state) {
        if (firstRender) {
            // Don't call the action on the first render on top of the server rehydration
            // Otherwise there is a race condition where the action gets executed before
            // render has been called, which can cause the checksum to fail.
            bootstrapDebug('React Rendering');
            React.withContext(context.getComponentContext(), function () {
                React.render(React.createFactory(Handler)(), mountNode, function () {
                    bootstrapDebug('React Rendered');
                });
            });
            firstRender = false;
        } else {
            context.executeAction(navigateAction, state, function () {
                bootstrapDebug('React Rendering');
                React.withContext(context.getComponentContext(), function () {
                    React.render(React.createFactory(Handler)(), mountNode, function () {
                        bootstrapDebug('React Rendered');
                    });
                });
            });
        }
    });
});
