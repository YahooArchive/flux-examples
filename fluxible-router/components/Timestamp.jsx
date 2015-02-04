/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var updateTime = require('../actions/updateTime');
var TimeStore = require('../stores/TimeStore');
var FluxibleMixin = require('fluxible').Mixin;

var Timestamp = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [TimeStore]
    },
    getInitialState: function () {
        return this.getStore(TimeStore).getState();
    },
    onChange: function () {
        var state = this.getStore(TimeStore).getState();
        this.setState(state);
    },
    onReset: function (event) {
        this.executeAction(updateTime);
    },
    render: function() {
        return (
            <em onClick={this.onReset} style={{fontSize: '.8em'}}>{this.state.time}</em>
        );
    }
});

module.exports = Timestamp;
