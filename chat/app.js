/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin = require('fluxible-plugin-routr');

var app = new Fluxible({
    component: React.createFactory(require('./components/ChatApp.jsx'))
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.plug(routrPlugin({
    routes: require('./configs/routes')
}));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/MessageStore'));
app.registerStore(require('./stores/ThreadStore'));
app.registerStore(require('./stores/UnreadThreadStore'));

module.exports = app;
