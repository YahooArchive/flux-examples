/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('fluxible-router').NavLink;

var Nav = React.createClass({
    render: function() {
        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                <li><NavLink routeName="home" activeStyle={{backgroundColor: '#ccc'}}>Home</NavLink></li>
                <li><NavLink routeName="about" activeStyle={{backgroundColor: '#ccc'}}>About</NavLink></li>
            </ul>
        );
    }
});

module.exports = Nav;
