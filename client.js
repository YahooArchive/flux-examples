/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
'use strict';
var React = require('react/addons'),
    Context = require('./lib/Context'),
    ApplicationStore = require('./stores/ApplicationStore'),
    TimeStore = require('./stores/TimeStore'),
    Application = require('./components/Application.jsx'),
    debug = require('debug'),
    bootstrapDebug = debug('Example:bootstrap'),
    navigateAction = require('flux-router-component').navigateAction;

window.React = React; // For chrome dev tool support
debug.enable('*');

Context.registerStore(ApplicationStore);
Context.registerStore(TimeStore);

var context = new Context();
bootstrapDebug('rehydrating dispatcher');
context.rehydrate(App.Context);

bootstrapDebug('dispatching BOOTSTRAP action');
context.getActionContext().executeAction(navigateAction, {}, function () {
    var app = Application({context: context.getComponentContext()}),
        mountNode = document.getElementById('app');

    bootstrapDebug('React Rendering');
    React.renderComponent(app, mountNode, function () {
        bootstrapDebug('React Rendered');
    });
});
