/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible-app/utils/createStore');


module.exports = createStore({
    storeName: 'TodoStore',
    handlers: {
        'RECEIVE_TODOS_SUCCESS': '_receiveTodos',
        'CREATE_TODO_SUCCESS': '_receiveTodos',
        'UPDATE_TODO_SUCCESS': '_receiveTodos',
        'DELETE_TODO_SUCCESS': '_receiveTodos',
        'TOGGLE_ALL_TODO_SUCCESS': '_receiveTodos'
    },
    initialize: function () {
        this.todos = [];
    },
    _receiveTodos: function (todos) {
        this.todos = todos;
        this.emitChange();
    },
    getAll: function () {
        return this.todos;
    },
    createTodo: function(details) {
        return {
            id: 'td_' + details.timestamp,
            editing: false,
            completed: false,
            text: details.text
        };
    },
    dehydrate: function () {
        return {
            todos: this.todos
        };
    },
    rehydrate: function (state) {
        this.todos = state.todos;
    }
});