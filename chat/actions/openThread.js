/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:openThreadAction'),
    ThreadStore = require('../stores/ThreadStore');

// `this` is the action controller context with `dispatch`, `getStore`, and `executeAction` methods
module.exports = function (payload, done) {
    debug('dispatching OPEN_THREAD', payload);
    this.dispatch('OPEN_THREAD', payload);
    done();
};
