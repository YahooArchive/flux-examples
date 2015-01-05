/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Example:openThreadAction');

module.exports = function (context, payload, done) {
    debug('dispatching OPEN_THREAD', payload);
    context.dispatch('OPEN_THREAD', payload);
    done();
};
