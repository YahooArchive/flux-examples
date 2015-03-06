/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Nav = React.createClass({
    getDefaultProps: function () {
        return {
            selected: 'home',
            links: {}
        };
    },
    render: function() {
        var selected = this.props.selected,
            links = this.props.links,
            context = this.props.context,
            linkHTML = Object.keys(links).map(function (name) {
                var className = '',
                    link = links[name];

                //print only link with label
                if(link.label) {
                    if (selected === name) {
                        className = 'pure-menu-selected';
                    }

                    return (
                        <li className={className} key={link.path}>
                            <NavLink routeName={link.page}>{link.label}</NavLink>
                        </li>
                    );
                }

            });
        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                {linkHTML}
            </ul>
        );
    }
});

module.exports = Nav;
