/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var FluxibleApp = require('fluxible-app');
var routrPlugin = require('fluxible-plugin-routr');

var app = new FluxibleApp({
    appComponent: React.createFactory(require('./components/Application.jsx'))
});

app.plug(routrPlugin({
    routes: require('./configs/routes')
}));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/TimeStore'));

module.exports = app;
