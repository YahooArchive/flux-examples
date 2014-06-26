/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    debug = require('debug')('TimeStore');

function TimeStore(context, initialState) {
    initialState = initialState || {};
    this.time = initialState.time;
    if (!this.time) {
        this.time = new Date();
    }
}

TimeStore.storeName = 'TimeStore';

util.inherits(TimeStore, EventEmitter);

TimeStore.prototype.reset = function (callback) {
    var self = this;
    // Simulate async API call
    setTimeout(function () {
        var date = new Date();
        self.time = date.toString();
        debug('time updated');
        self.emit('update');
        callback();
    }, 100);
};

TimeStore.prototype.handleReset = function (payload, done) {
    var self = this;
    self.reset(function () {
        done();
    });
};

TimeStore.prototype.handleBootstrap = function (payload, done) {
    var self = this;
    // Simulate polling/push state
    setInterval(function () {
        self.reset(function () {});
    }, 5000);
    done();
};

TimeStore.handlers = {
    'RESET_TIMER': 'handleReset',
    'BOOTSTRAP': 'handleBootstrap'
};

TimeStore.prototype.getState = function () {
    return {
        time: this.time
    };
};

module.exports = TimeStore;
