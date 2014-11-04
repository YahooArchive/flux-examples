/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:createMessageAction'),
    ThreadStore = require('../stores/ThreadStore');

module.exports = function (context, payload, done) {
    var threadStore = context.getStore(ThreadStore),
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
    debug('dispatching RECEIVE_MESSAGES', message);
    context.dispatch('RECEIVE_MESSAGES', [message]);
    context.service.create('message', message, {}, function (err) {
        if (err) {
            debug('dispatching RECEIVE_MESSAGES_FAILURE', message);
            context.dispatch('RECEIVE_MESSAGES_FAILURE', [message]);
            done();
            return;
        }
        debug('dispatching RECEIVE_MESSAGES_SUCCESS', message);
        context.dispatch('RECEIVE_MESSAGES_SUCCESS', [message]);
        done();
    });
};
