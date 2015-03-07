/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global document, window */
'use strict';
var React = require('react');
var app = require('./app');


var dehydratedState = window.App; // sent from the server
window.React = React; // for chrome dev tool support


app.rehydrate(dehydratedState, function (err, context) {

    if (err) {
        throw err;
    }

    window.context = context;

    var mountNode = document.getElementById('todoapp');

    React.render(
        app.getComponent()({
          context:context.getComponentContext()
        }),
        mountNode
    );
});
