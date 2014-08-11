/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var Context = require('./lib/Context'),
    ApplicationStore = require('./stores/ApplicationStore'),
    TimeStore = require('./stores/TimeStore'),
    Application = require('./components/Application.jsx'),
    debug = require('debug'),
    bootstrapDebug = debug('ExampleApplication');

Context.registerStore(ApplicationStore);
Context.registerStore(TimeStore);

function App(initialState) {
    debug('Creating context');
    this.context = new Context();
    if (initialState) {
        bootstrapDebug('rehydrating context');
        this.context.rehydrate(initialState);
    }
}

App.prototype.getComponent = function () {
    debug('Creating Application component');
    var appComponent = Application({context: this.context.getComponentContext()});
    debug('Rendering Application component');
    return appComponent;
}

module.exports = App;
