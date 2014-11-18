/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var TodoStore = require('../stores/TodoStore');


module.exports = function (context, payload, done) {
    var todoStore = context.getStore(TodoStore);
    var todo = todoStore.createTodo({
        timestamp: Date.now(),
        text: payload.text
    });

    context.dispatch('CREATE_TODO', todo);

    context.service.create('todo', todo, {}, function (err, todos) {
        if (err) {
            context.dispatch('CREATE_TODO_FAILURE', todo);
            done();
            return;
        }

        context.dispatch('CREATE_TODO_SUCCESS', todos);
        done();
    });
};
