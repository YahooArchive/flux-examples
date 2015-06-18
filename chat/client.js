/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window, location */
'use strict';
var React = require('react');
var debug = require('debug');
var bootstrapDebug = debug('Example');
var app = require('./app');
var dehydratedState = window.App || {}; // Sent from the server
var RouteStore = require('./stores/RouteStore');
var navigateAction = require('fluxible-router').navigateAction;

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }

    window.context = context; // For debugging

    bootstrapDebug('React Rendering');
    var mountNode = document.getElementById('app');
    React.render(context.createElement(), mountNode, function () {
        bootstrapDebug('React Rendered');
    });

    // If server did not load data, fire off the navigateAction
    if (!context.getStore(RouteStore).getCurrentRoute()) {
        setTimeout(function () {
            context.executeAction(navigateAction, { url: window.location.pathname + window.location.search, type: 'pageload' }, function (err) {
                if (err) {
                    if (err.statusCode && err.statusCode === 404) {
                        next();
                    } else {
                        next(err);
                    }
                    return;
                }
            });
        }, 1000);
    }
});
