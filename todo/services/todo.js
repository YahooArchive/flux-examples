/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';


var _todos = [];


module.exports = {
    name: 'todo',
    read: function (req, resource, params, config, callback) {
        callback(null, _todos.concat());
    },
    create: function (req, resource, params, body, config, callback) {
        _todos.push({
            id: params.id,
            text: params.text
        });

        callback(null, _todos);
    },
    update: function (req, resource, params, body, config, callback) {
        if (resource === 'todo.toggleAll') {
            _todos.forEach(function (todo, index) {
                todo.completed = params.checked;
            });
        }
        else {
            _todos.forEach(function (todo, index) {
                if (params.id === todo.id) {
                    todo.text = params.text;
                    todo.completed = params.completed;
                    _todos[index] = todo;
                }
            });
        }

        callback(null, _todos);
    },
    delete: function(req, resource, params, config, callback) {
        _todos = _todos.filter(function (todo, index) {
            return params.ids.indexOf(todo.id) === -1;
        });

        callback(null, _todos);
    }
};
