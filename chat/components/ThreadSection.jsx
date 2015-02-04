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
 */
'use strict';
var React = require('react');
var MessageStore = require('../stores/MessageStore');
var ThreadListItem = require('../components/ThreadListItem.jsx');
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');
var FluxibleMixin = require('fluxible').Mixin;
var NavLink = require('flux-router-component').NavLink;

var ThreadSection = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: {
            _onChange: [ThreadStore, MessageStore, UnreadThreadStore]
        }
    },

    getInitialState: function() {
        return this.getStateFromStores();
    },

    getStateFromStores: function () {
        return {
            threads: this.getStore(ThreadStore).getAllChrono(),
            currentThreadID: this.getStore(ThreadStore).getCurrentID(),
            unreadCount: this.getStore(UnreadThreadStore).getCount()
        };
    },

    render: function() {
        var threadListItems = this.state.threads.map(function(thread) {
            return (
                <NavLink href={"/thread/" + thread.id} key={thread.id}>
                    <ThreadListItem
                        key={thread.id}
                        thread={thread}
                        currentThreadID={this.state.currentThreadID}
                    />
                </NavLink>
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
