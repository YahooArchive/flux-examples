/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var Fluxible = require('fluxible');

var app = new Fluxible({
    component: require('./components/Routes.jsx')
});

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/TimeStore'));
app.registerStore(require('./stores/PageStore'));

module.exports = app;
