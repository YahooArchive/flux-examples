/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:showChatAction'),
    ThreadStore = require('../stores/ThreadStore'),
    openThread = require('./openThread');

module.exports = function (payload, done) {
    debug('dispatching SHOW_CHAT_START');
    this.dispatch('SHOW_CHAT_START');
    var self = this;
    debug('fetching messages');
    self.fetcher.read('message', {}, {}, function (err, messages) {
        debug('dispatching RECEIVE_MESSAGES', messages);
        self.dispatch('RECEIVE_MESSAGES', messages);

        var threadStore = self.getStore(ThreadStore);
        if (!threadStore.getCurrentID()) {
            debug('opening most recent thread');
            var allChrono = threadStore.getAllChrono();
            self.executeAction(openThread, {
                threadID: allChrono[allChrono.length - 1].id
            }, function () {
                debug('dispatching SHOW_CHAT_END');
                self.dispatch('SHOW_CHAT_END');
                done();
            });
            return;
        }
        debug('dispatching SHOW_CHAT_END');
        self.dispatch('SHOW_CHAT_END');
        done();
    });
};
