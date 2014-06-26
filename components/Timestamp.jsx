/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react/addons');

var Timestamp = React.createClass({
    getInitialState: function () {
        this.store = this.props.dispatcher.getStore('TimeStore');
        return this.store.getState();
    },
    componentDidMount: function() {
        var self = this;
        this.store.on('update', function () {
            var state = self.store.getState();
            self.setState(state);
        });
    },
    onReset: function (event) {
        this.props.dispatcher.dispatch('RESET_TIMER');
    },
    render: function() {
        return (
            <em onClick={this.onReset} style={{'font-size': '.8em'}}>{this.state.time}</em>
        );
    }
});

module.exports = Timestamp;
