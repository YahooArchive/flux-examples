/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
'use strict';
var React = require('react'),
    debug = require('debug'),
    bootstrapDebug = debug('Example'),
    Fetcher = require('fetchr'),
    Application = require('./app'),
    fetcher = new Fetcher({
        xhrPath: Application.config.xhrPath
    }),
    dehydratedState = App && App.Context; // Sent from the server

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');
var application = new Application({
    fetcher: fetcher,
    initialState: dehydratedState
});
window.context = application.context;

var app = application.getComponent(),
    mountNode = document.getElementById('app');

bootstrapDebug('React Rendering');
React.renderComponent(app, mountNode, function () {
    bootstrapDebug('React Rendered');
});
