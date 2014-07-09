/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react/addons'),
    NavLink = require('flux-router-component').NavLink;

var Nav = React.createClass({
    getInitialState: function () {
        return {
            selected: 'home',
            links: {}
        };
    },
    render: function() {
        var self = this,
            selected = this.props.selected || this.state.selected,
            links = this.props.links || this.state.links,
            dispatcher = this.props.dispatcher,
            linkHTML = Object.keys(links).map(function (name) {
                var className = '',
                    link = links[name];
                if (selected === name) {
                    className = 'pure-menu-selected';
                }
                return (
                    <li className={className} key={name}>
                        <a href={link.url} dispatcher={dispatcher}>{link.text}</a>
                    </li>
                );
            });
        return (
            <div className="pure-menu pure-menu-open pure-menu-horizontal">
                {linkHTML}
            </div>
        );
    }
});

module.exports = Nav;
