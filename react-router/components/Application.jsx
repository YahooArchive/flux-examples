/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');
var Timestamp = require('./Timestamp.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var StoreMixin = require('fluxible-app').StoreMixin;
var RouteHandler = require('react-router').RouteHandler;

var Application = React.createClass({
    mixins: [StoreMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },

    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },
    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },
    render: function () {
        return (
            <div>
                <Nav />
                    <RouteHandler />
                <Timestamp context={this.props.context}/>
            </div>
        );
    }
});

module.exports = Application;
