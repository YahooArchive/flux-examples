/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Action:updateTodo');


module.exports = function (context, payload, done) {

    var todo = payload;

    debug('dispatching UPDATE_TODO', todo);
    context.dispatch('UPDATE_TODO', todo);

    context.service.update('todo', todo, {}, function (err, todos) {

        if (err) {
            debug('dispatching UPDATE_TODO_FAILURE', todo);
            context.dispatch('UPDATE_TODO_FAILURE', todo);
            done();
            return;
        }

        debug('dispatching UPDATE_TODO_SUCCESS', todos);
        context.dispatch('UPDATE_TODO_SUCCESS', todos);
        done();
    });
};
