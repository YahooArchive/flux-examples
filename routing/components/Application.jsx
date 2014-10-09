/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react'),
    Nav = require('./Nav.jsx'),
    Home = require('./Home.jsx'),
    About = require('./About.jsx'),
    Timestamp = require('./Timestamp.jsx'),
    RouterMixin = require('flux-router-component').RouterMixin;

var Application = React.createClass({
    mixins: [RouterMixin],
    getInitialState: function () {
        this.store = this.props.context.getStore('ApplicationStore');
        return this.store.getState();
    },
    componentDidMount: function () {
        var self = this;
        self._changeEventListener = function () {
            var state = self.store.getState();
            self.setState(state);
        };
        self.store.on('change', self._changeEventListener);
    },
    componentWillUnmount: function () {
        var self = this;
        self.store.removeListener('change', self._changeEventListener);
        self._changeEventListener = null;
    },
    render: function () {
        return (
            <div>
                <Nav selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>
                {'home' === this.state.currentPageName ? <Home/> : <About/>}
                <Timestamp context={this.props.context}/>
            </div>
        );
    }
});

module.exports = Application;
