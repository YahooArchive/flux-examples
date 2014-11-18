/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var FluxibleApp = require('fluxible-app');
var fetchrPlugin = require('fluxible-plugin-fetchr');


var app = new FluxibleApp({
    appComponent: React.createFactory(require('./components/TodoApp.jsx'))
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));


app.registerStore(require('./stores/TodoStore'));


module.exports = app;
