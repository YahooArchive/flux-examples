/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';


module.exports = function (context, payload, done) {
    var todo = payload;

    context.dispatch('DELETE_TODO', todo);

    context.service.delete('todo', todo, {}, function (err, todos) {
        if (err) {
            context.dispatch('DELETE_TODO_FAILURE', todo);
            done();
            return;
        }

        context.dispatch('DELETE_TODO_SUCCESS', todos);
        done();
    });
};
