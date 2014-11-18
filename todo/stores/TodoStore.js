/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var util = require('util');
var BaseStore = require('fluxible-app/utils/BaseStore');


function TodoStore(dispatcher) {

    this.dispatcher = dispatcher;
    this.todos = [];
}


TodoStore.storeName = 'TodoStore';


TodoStore.handlers = {
    'RECEIVE_TODOS': 'receiveTodos',
    'CREATE_TODO_SUCCESS': 'receiveTodos',
    'UPDATE_TODO_SUCCESS': 'receiveTodos',
    'DELETE_TODO_SUCCESS': 'receiveTodos',
    'TOGGLE_ALL_TODO_SUCCESS': 'receiveTodos'
};


util.inherits(TodoStore, BaseStore);


TodoStore.prototype.receiveTodos = function (todos) {

    this.todos = todos;
    this.emitChange();
};


TodoStore.prototype.updateTodo = function (todo) {

    this.emitChange();
};


TodoStore.prototype.receiveNewTodo = function (todo) {

    this.todos.push(todo);
    this.emitChange();
};


TodoStore.prototype.getAll = function () {

    return this.todos;
};


TodoStore.prototype.createTodo = function(details) {

    return {
        id: 'td_' + details.timestamp,
        editing: false,
        completed: false,
        text: details.text
    };
};


TodoStore.prototype.dehydrate = function () {

    return {
        todos: this.todos
    };
};

TodoStore.prototype.rehydrate = function (state) {

    this.todos = state.todos;
};


module.exports = TodoStore;