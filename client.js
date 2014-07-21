/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
'use strict';
var React = require('react/addons'),
    Dispatchr = require('dispatchr')(),
    ApplicationStore = require('./stores/ApplicationStore'),
    TimeStore = require('./stores/TimeStore'),
    Application = require('./components/Application.jsx'),
    debug = require('debug'),
    bootstrapDebug = debug('Example:bootstrap');

window.React = React; // For chrome dev tool support
debug.enable('*');

Dispatchr.registerStore(ApplicationStore);
Dispatchr.registerStore(TimeStore);

var dispatcher = new Dispatchr({});
bootstrapDebug('rehydrating dispatcher');
dispatcher.rehydrate(App.Dispatcher);

bootstrapDebug('dispatching BOOTSTRAP action');
dispatcher.dispatch('BOOTSTRAP', {}, function () {
    var app = Application({dispatcher: dispatcher}),
        mountNode = document.getElementById('app');

    bootstrapDebug('React Rendering');
    React.renderComponent(app, mountNode, function () {
        bootstrapDebug('React Rendered');
    });
});
