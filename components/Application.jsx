/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react/addons'),
    Nav = require('./Nav.jsx'),
    Home = require('./Home.jsx'),
    About = require('./About.jsx'),
    Timestamp = require('./Timestamp.jsx');
    RouterMixin = require('flux-router-component').RouterMixin;

var Application = React.createClass({
    mixins: [RouterMixin],
    getInitialState: function () {
        this.store = this.props.dispatcher.getStore('ApplicationStore');
        return this.store.getState();
    },
    componentDidMount: function() {
        var self = this;
        self._updateEventListener = function () {
            var state = self.store.getState();
            self.setState(state);
        };
        self.store.on('update', self._updateEventListener);
    },
    componentWillUnmount: function() {
        var self = this;
        self.store.removeListener('update', self._updateEventListener);
        self._updateEventListener = null;
    },
    render: function() {
        return (
            <div>
                <Nav selected={this.state.page} links={this.state.pages} dispatcher={this.props.dispatcher}/>
                {'home' === this.state.page ? <Home/> : <About/>}
                <Timestamp dispatcher={this.props.dispatcher}/>
            </div>
        );
    }
});

module.exports = Application;
