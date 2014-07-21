/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    Router = require('routr'),
    TimeStore = require('./TimeStore'),
    routes = require('../configs/routes'),
    debug = require('debug')('ApplicationStore');

function ApplicationStore(context, initialState) {
    initialState = initialState || {};
    this.page = initialState.page || null;
    this.url = initialState.url || null;
    this.router = new Router(routes);
    this.pages = initialState.pages || {
        home: {
            text: 'Home',
            url: this.router.makePath('home')
        },
        about: {
            text: 'About',
            url: this.router.makePath('about')
        }
    };
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'NAVIGATE': 'handleNavigate'
};

util.inherits(ApplicationStore, EventEmitter);

ApplicationStore.prototype.setDispatcher = function (dispatcher) {
    this.dispatcher = dispatcher;
};

ApplicationStore.prototype.handleNavigate = function (payload, done) {
    var self = this,
        route = this.router.getRoute(payload.path, {navParams: payload.params}),
        timeStore = this.dispatcher.getStore(TimeStore),
        newPageName = (route && route.config.page) || null,
        newPage = (newPageName && this.pages[newPageName]) || null;

    if (newPage && newPageName !== self.page) {
        self.route = route;
        self.navigateType = payload.type;
        self.page = newPageName;
        self.url = newPage.url;
        timeStore.reset(function () {
            debug('page switched to ' + self.page);
            self.emit('change'); // Store may be listening for changes to state
            done();
        });
    } else {
        done(); // Action has been fully handled
    }
};

ApplicationStore.prototype.getState = function () {
    return {
        page: this.page,
        pages: this.pages,
        route: this.route,
        navigateType: this.navigateType,
        url: this.url
    };
};

module.exports = ApplicationStore;
