/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @jsx React.DOM
 */

var React = require('react');
var MessageStore = require('../stores/MessageStore');
var ThreadListItem = require('../components/ThreadListItem.jsx');
var ThreadStore = require('../stores/ThreadStore');
//var UnreadThreadStore = require('../stores/UnreadThreadStore');

var ThreadSection = React.createClass({

    getInitialState: function() {
        var context = this.props.context;
        this.ThreadStore = context.getStore(ThreadStore);
        this.MessageStore = context.getStore(MessageStore);
//        this.UnreadThreadStore = context.getStore(UndreadThreadStore);
        return this.getStateFromStores();
    },

    getStateFromStores: function () {
        return {
            threads: this.ThreadStore.getAllChrono(),
            currentThreadID: this.ThreadStore.getCurrentID(),
            unreadCount: 0 //this.UnreadThreadStore.getCount()
        };
    },

    componentDidMount: function() {
        this.ThreadStore.addChangeListener(this._onChange);
//    this.UnreadThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        this.ThreadStore.removeChangeListener(this._onChange);
//    this.UnreadThreadStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var threadListItems = this.state.threads.map(function(thread) {
            return (
                <ThreadListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.state.currentThreadID}
                    context={this.props.context}
                />
            );
        }, this);
        var unread =
            this.state.unreadCount === 0 ?
                null :
                <span>Unread threads: {this.state.unreadCount}</span>;
        return (
            <div className="thread-section">
                <div className="thread-count">
                {unread}
                </div>
                <ul className="thread-list">
                {threadListItems}
                </ul>
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the stores
     */
    _onChange: function() {
        this.setState(this.getStateFromStores());
    }

});

module.exports = ThreadSection;
