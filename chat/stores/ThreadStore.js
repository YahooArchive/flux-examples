/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var util = require('util'),
    BaseStore = require('dispatchr/utils/BaseStore'),
    debug = require('debug')('Example:ThreadStore');

function ThreadStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.currentID = null;
    this.threads = {};
}

ThreadStore.storeName = 'ThreadStore';
ThreadStore.handlers = {
    'RECEIVE_MESSAGES': 'receiveMessages',
    'OPEN_THREAD': 'openThread'
};

util.inherits(ThreadStore, BaseStore);

ThreadStore.prototype.openThread = function (payload) {
    this.currentID = payload.threadID;
    this.emitChange();
};

/**
 * @param {string} id
 */
ThreadStore.prototype.get = function(id) {
    return this.threads[id];
};

ThreadStore.prototype.getAll = function() {
    return this.threads;
};

ThreadStore.prototype.getAllChrono = function() {
    var self = this,
        orderedThreads = [];

    Object.keys(this.threads).forEach(function (key) {
        var thread = self.threads[key];
        orderedThreads.push(thread);
    });

    orderedThreads.sort(function(a, b) {
        if (a.lastMessage.date < b.lastMessage.date) {
            return -1;
        } else if (a.lastMessage.date > b.lastMessage.date) {
            return 1;
        }
        return 0;
    });
    return orderedThreads;
};

ThreadStore.prototype.getCurrentID = function() {
    return this.currentID;
};

ThreadStore.prototype.getCurrentThreadName = function() {
    return this.threads[this.currentID].name;
};

ThreadStore.prototype.getCurrent = function() {
    return this.get(this.getCurrentID());
};

ThreadStore.prototype.receiveMessages = function (messages) {
    var self = this;
    this.dispatcher.waitFor('MessageStore', function () {
        messages.forEach(function(message) {
            var threadID = message.threadID;
            var thread = self.threads[threadID];
            if (thread && thread.lastTimestamp > message.timestamp) {
                return;
            }
            self.threads[threadID] = {
                id: threadID,
                name: message.threadName,
                lastMessage: message
            };
        });
        self.emitChange();
    });
};

ThreadStore.prototype.dehydrate = function () {
    return {
        currentID: this.currentID,
        threads: this.threads
    };
};

ThreadStore.prototype.rehydrate = function (state) {
    this.currentID = state.currentID;
    this.threads = state.threads;
};

module.exports = ThreadStore;
