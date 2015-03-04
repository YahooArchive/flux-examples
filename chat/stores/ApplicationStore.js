/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_SUCCESS' : 'handleNavigate'
    },
    initialize: function () {
        this.currentRoute = null;
    },
    handleNavigate: function (route) {
        this.currentRoute = route;
        this.emitChange();
    },
    getState: function () {
        return {
            route: this.currentRoute,
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentRoute = state.route;
    }
});

module.exports = ApplicationStore;
