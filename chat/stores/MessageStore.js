/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var util = require('util');
var BaseStore = require('fluxible-app/utils/BaseStore');
var debug = require('debug')('Example:MessageStore');
var ThreadStore = require('./ThreadStore');

function MessageStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.messages = {};
    this.sortedByDate = [];
}

MessageStore.storeName = 'MessageStore';
MessageStore.handlers = {
    'RECEIVE_MESSAGES': 'receiveMessages',
    'OPEN_THREAD': 'openThread'
};

util.inherits(MessageStore, BaseStore);

MessageStore.prototype.receiveMessages = function (messages) {
    var self = this;
    messages.forEach(function (message) {
        self.messages[message.id] = message;
    });
    self.sortedByDate = Object.keys(self.messages);
    self.sortedByDate.sort(function(a, b) {
        if (self.messages[a].date < self.messages[b].date) {
            return -1;
        } else if (self.messages[a].date > self.messages[b].date) {
            return 1;
        }
        return 0;
    });
    self.emitChange();
};

MessageStore.prototype.openThread = function (payload) {
    var self = this;
    // Mark all read
    Object.keys(self.messages).forEach(function (key) {
        var message = self.messages[key];
        if (message.threadID === payload.threadID) {
            message.isRead = true;
        }
    });
    self.emitChange();
};

MessageStore.prototype.getAll = function () {
    return this.messages;
};

MessageStore.prototype.get = function (id) {
    return this.messages[id];
};

MessageStore.prototype.getAllForThread = function(threadID) {
    var self = this;
    var threadMessages = [];
    self.sortedByDate.forEach(function (key) {
        var message = self.messages[key];
        if (message.threadID === threadID) {
            threadMessages.push(message);
        }
    });
    return threadMessages;
};

MessageStore.prototype.getAllForCurrentThread = function() {
    var currentThreadID = this.dispatcher.getStore(ThreadStore).getCurrentID();
    return this.getAllForThread(currentThreadID);
};

MessageStore.prototype.dehydrate = function () {
    return {
        messages: this.messages,
        sortedByDate: this.sortedByDate
    };
};

MessageStore.prototype.rehydrate = function (state) {
    this.messages = state.messages;
    this.sortedByDate = state.sortedByDate;
};

module.exports = MessageStore;
