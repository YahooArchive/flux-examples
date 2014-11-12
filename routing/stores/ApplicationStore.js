/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var util = require('util');
var BaseStore = require('fluxible-app/utils/BaseStore');
var debug = require('debug')('Example:ApplicationStore');

function ApplicationStore(dispatcher) {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = {
        home: {
            text: 'Home',
            route: 'home'
        },
        about: {
            text: 'About',
            route: 'about'
        }
    };
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
};

util.inherits(ApplicationStore, BaseStore);

ApplicationStore.prototype.handleNavigate = function (route) {
    var pageName = route.config.page;
    var page = this.pages[pageName];

    if (pageName === this.getCurrentPageName()) {
        return;
    }

    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emit('change');
};

ApplicationStore.prototype.getCurrentPageName = function () {
    return this.currentPageName;
};

ApplicationStore.prototype.getState = function () {
    return {
        currentPageName: this.currentPageName,
        currentPage: this.currentPage,
        pages: this.pages,
        route: this.currentRoute
    };
};

ApplicationStore.prototype.dehydrate = function () {
    return this.getState();
};

ApplicationStore.prototype.rehydrate = function (state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
};

module.exports = ApplicationStore;
