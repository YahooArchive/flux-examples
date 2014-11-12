/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var util = require('util');
var BaseStore = require('fluxible-app/utils/BaseStore');
var debug = require('debug')('Example:UnreadThreadStore');
var ThreadStore = require('./ThreadStore');

function UnreadThreadStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.messages = {};
}

UnreadThreadStore.storeName = 'UnreadThreadStore';
UnreadThreadStore.handlers = {
    'RECEIVE_MESSAGES': 'receiveMessages',
    'OPEN_THREAD': 'openThread'
};

util.inherits(UnreadThreadStore, BaseStore);

UnreadThreadStore.prototype.receiveMessages = function (messages) {
    this.emitChange();
};

UnreadThreadStore.prototype.openThread = function (payload) {
    this.emitChange();
};

UnreadThreadStore.prototype.getCount = function () {
    var threads = this.dispatcher.getStore(ThreadStore).getAll();
    var unreadCount = 0;
    for (var id in threads) {
        if (!threads[id].lastMessage.isRead) {
            unreadCount++;
        }
    }
    return unreadCount;
};

UnreadThreadStore.prototype.dehydrate = function () {
    return {};
};

UnreadThreadStore.prototype.rehydrate = function (state) {
    return;
};

module.exports = UnreadThreadStore;
