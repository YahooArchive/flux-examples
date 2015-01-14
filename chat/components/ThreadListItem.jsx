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
var cx = require('react/lib/cx');

var ReactPropTypes = React.PropTypes;

var ThreadListItem = React.createClass({

    propTypes: {
        thread: ReactPropTypes.object,
        currentThreadID: ReactPropTypes.string
    },

    render: function() {
        var thread = this.props.thread;
        var lastMessage = thread.lastMessage;
        return (
            <li
                className={cx({
                    'thread-list-item': true,
                    'active': thread.id === this.props.currentThreadID
                })}
                >

                <h5 className="thread-name">{thread.name}</h5>
                <div className="thread-time">
                    {(new Date(lastMessage.timestamp)).toTimeString()}
                </div>
                <div className="thread-last-message">
                    {lastMessage.text}
                </div>
            </li>
        );
    },
});

module.exports = ThreadListItem;
