/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Action:createTodo');
var TodoStore = require('../stores/TodoStore');


module.exports = function (context, payload, done) {

    var todoStore = context.getStore(TodoStore);
    var todo = todoStore.createTodo({
        timestamp: Date.now(),
        text: payload.text
    });

    debug('dispatching CREATE_TODO', todo);
    context.dispatch('CREATE_TODO', todo);

    context.service.create('todo', todo, {}, function (err, todos) {

        if (err) {
            debug('dispatching CREATE_TODO_FAILURE', todo);
            context.dispatch('CREATE_TODO_FAILURE', todo);
            done();
            return;
        }

        debug('dispatching CREATE_TODO_SUCCESS', todos);
        context.dispatch('CREATE_TODO_SUCCESS', todos);
        done();
    });
};
