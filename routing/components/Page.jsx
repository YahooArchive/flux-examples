/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var PageStore = require('../stores/PageStore');
var StoreMixin = require('fluxible').StoreMixin;

var Page = React.createClass({
    mixins: [StoreMixin],
    statics: {
        storeListeners: [PageStore]
    },
    getInitialState: function () {
        return this.getStore(PageStore).getState();
    },
    onChange: function () {
        var state = this.getStore(PageStore).getState();
        this.setState(state);
    },
    render: function() {
        return (
            <p>{this.state.content}</p>
        );
    }
});

module.exports = Page;
