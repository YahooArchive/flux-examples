/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
import React from 'react';
import debug from 'debug';
import app from './app';

const bootstrapDebug = debug('Example');
const dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    const mountNode = document.getElementById('app');

    bootstrapDebug('React Rendering');
    React.render(context.createElement(), mountNode, () => {
        bootstrapDebug('React Rendered');
    });
});
