/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Example:showChatAction');
var ThreadStore = require('../stores/ThreadStore');
var openThread = require('./openThread');

module.exports = function (context, payload, done) {
    context.dispatch('SHOW_CHAT_START');
    debug('fetching messages');
    context.service.read('message', {}, {}, function (err, messages) {
        context.dispatch('RECEIVE_MESSAGES', messages);

        var threadStore = context.getStore(ThreadStore);
        if (!threadStore.getCurrentID()) {
            debug('opening most recent thread');
            var allChrono = threadStore.getAllChrono();
            context.executeAction(openThread, {
                threadID: allChrono[allChrono.length - 1].id
            }, function () {
                context.dispatch('SHOW_CHAT_END');
                done();
            });
            return;
        }
        debug('dispatching SHOW_CHAT_END');
        context.dispatch('SHOW_CHAT_END');
        done();
    });
};
