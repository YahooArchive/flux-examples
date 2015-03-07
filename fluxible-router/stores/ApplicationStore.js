/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/addons').createStore;

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'UPDATE_PAGE_TITLE'    : 'updatePageTitle'
    },
    initialize: function () {
        this.pageTitle = '';
    },
    updatePageTitle: function (payload) {
        this.pageTitle = payload.pageTitle;
        this.emitChange();
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    getState: function () {
        return {
            pageTitle: this.pageTitle
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.pageTitle = state.pageTitle;
    }
});


module.exports = ApplicationStore;
