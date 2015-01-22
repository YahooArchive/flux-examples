/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible-app/utils/createStore');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
    },
    initialize: function (dispatcher) {
        this.currentPage = null;
        this.currentRoute = null;
    },
    handleNavigate: function (route) {
        var pageName = route.config.page;

        if (pageName === this.getCurrentPageName()) {
            return;
        }

        this.currentPageName = pageName;
        this.currentPage = page;
        this.currentRoute = route;
        this.emit('change');
    },
    getCurrentPageName: function () {
        return this.currentPageName;
    },
    getState: function () {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            route: this.currentRoute
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.currentRoute = state.route;
    }
});


module.exports = ApplicationStore;
