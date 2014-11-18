/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Action:showTodos');


module.exports = function (context, payload, done) {

    debug('fetching todos');
    context.service.read('todo', {}, {}, function (err, todos) {

        debug('RECEIVE_TODOS', todos);
        context.dispatch('RECEIVE_TODOS', todos);
        done();
    });
};
