/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';


var _todos = [];


module.exports = {
    name: 'todo',
    // at least one of the CRUD methods is required
    read: function (req, resource, params, config, callback) {

        callback(null, JSON.parse(JSON.stringify(_todos)));
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

            var keepItem = true;
            for (var i = 0 ; i < params.ids.length ; i++) {
                if (params.ids[i] === todo.id) {
                    keepItem = false;
                    break;
                }
            }

            return keepItem;
        });

        callback(null, _todos);
    }
};
