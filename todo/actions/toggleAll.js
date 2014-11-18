/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Action:toggleAll');


module.exports = function (context, payload, done) {

    debug('dispatching TOGGLE_ALL_TODO', payload);
    context.dispatch('TOGGLE_ALL_TODO', payload);

    context.service.update('todo.toggleAll', payload, {}, function (err, todos) {

        if (err) {
            debug('dispatching TOGGLE_ALL_TODO_FAILURE', payload);
            context.dispatch('TOGGLE_ALL_TODO_FAILURE', payload);
            done();
            return;
        }

        debug('dispatching TOGGLE_ALL_TODO_SUCCESS', todos);
        context.dispatch('TOGGLE_ALL_TODO_SUCCESS', todos);
        done();
    });
};
