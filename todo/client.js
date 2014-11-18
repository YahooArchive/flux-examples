/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global document, window */
'use strict';
var React = require('react');
var debug = require('debug');
var app = require('./app');


var dehydratedState = window.App; // sent from the server
var bootstrapDebug = debug('Example');
debug.enable('*');
window.React = React; // for chrome dev tool support


bootstrapDebug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {

    if (err) {
        throw err;
    }

    window.context = context;

    var mountNode = document.getElementById('todoapp');

    bootstrapDebug('React Rendering');
    React.render(
        app.getAppComponent()({ context: context.getComponentContext() }),
        mountNode,
        function () {
            bootstrapDebug('React Rendered');
        }
    );
});
