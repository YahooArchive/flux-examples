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

var MessageComposer = require('./MessageComposer.jsx');
var MessageListItem = require('./MessageListItem.jsx');
var MessageStore = require('../stores/MessageStore');
var React = require('react');
var ThreadStore = require('../stores/ThreadStore');

function getMessageListItem(message) {
    return (
        <MessageListItem
        key={message.id}
        message={message}
        />
        );
}

var MessageSection = React.createClass({

    getInitialState: function() {
        var context = this.props.context;
        this.ThreadStore = context.getStore(ThreadStore);
        this.MessageStore = context.getStore(MessageStore);
        return this.getStateFromStores();
    },

    getStateFromStores: function () {
        return {
            messages: this.MessageStore.getAllForCurrentThread(),
            thread: this.ThreadStore.getCurrent()
        };
    },

    componentDidMount: function() {
        this._scrollToBottom();
        this.MessageStore.addChangeListener(this._onChange);
        this.ThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        this.MessageStore.removeChangeListener(this._onChange);
        this.ThreadStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var messageListItems = this.state.messages.map(getMessageListItem);
        return (
            <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>
                <ul className="message-list" ref="messageList">
          {messageListItems}
                </ul>
                <MessageComposer context={this.props.context} />
            </div>
            );
    },

    componentDidUpdate: function() {
        this._scrollToBottom();
    },

    _scrollToBottom: function() {
        var ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    },

    /**
     * Event handler for 'change' events coming from the MessageStore
     */
    _onChange: function() {
        this.setState(this.getStateFromStores());
    }

});

module.exports = MessageSection;
