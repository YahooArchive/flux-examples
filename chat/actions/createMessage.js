/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:createMessageAction'),
    ThreadStore = require('../stores/ThreadStore');

// `this` is the action controller context with `dispatch`, `getStore`, and `executeAction` methods
module.exports = function (payload, done) {
    var threadStore = this.getStore(ThreadStore),
        timestamp = Date.now();
    var message = {
        id: 'm_' + timestamp,
        threadID: threadStore.getCurrentID(),
        threadName: threadStore.getCurrentThreadName(),
        authorName: 'Bill', // hard coded for the example
        timestamp: timestamp,
        text: payload.text,
        isRead: true
    };
    debug('dispatching RECEIVE_MESSAGES', [message]);
    this.dispatch('RECEIVE_MESSAGES', [message]);
    this.fetcher.create('message', message, this.context, done);
};
