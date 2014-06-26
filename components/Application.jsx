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

var Application = React.createClass({
    getInitialState: function () {
        this.store = this.props.dispatcher.getStore('ApplicationStore');
        return this.store.getState();
    },
    onNavigate: function (payload) {
        this.props.dispatcher.dispatch('NAVIGATE', payload);
    },
    componentDidMount: function() {
        var self = this;
        this.store.on('update', function () {
            var state = self.store.getState();
            self.setState(state);
        });
    },
    componentDidUpdate: function(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            window.history.pushState({}, '', this.state.url);
        }
    },
    render: function() {
        return (
            <div>
                <Nav selected={this.state.page} links={this.state.pages} onNavigate={this.onNavigate} />
                {'home' === this.state.page ? <Home/> : <About/>}
                <Timestamp dispatcher={this.props.dispatcher}/>
            </div>
        );
    }
});

module.exports = Application;
