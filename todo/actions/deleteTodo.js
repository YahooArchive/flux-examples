/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Action:deleteTodo');


module.exports = function (context, payload, done) {

    var todo = payload;

    debug('dispatching DELETE_TODO', todo);
    context.dispatch('DELETE_TODO', todo);

    context.service.delete('todo', todo, {}, function (err, todos) {

        if (err) {
            debug('dispatching DELETE_TODO_FAILURE', todo);
            context.dispatch('DELETE_TODO_FAILURE', todo);
            done();
            return;
        }

        debug('dispatching DELETE_TODO_SUCCESS', todos);
        context.dispatch('DELETE_TODO_SUCCESS', todos);
        done();
    });
};
