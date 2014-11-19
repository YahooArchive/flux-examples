/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');


var Component = React.createClass({
    render: function() {
        return (
            <head>
                <meta charSet="utf-8" />
                <title>{this.props.title}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="/public/base.css" />
                <link rel="stylesheet" href="/public/styles.css" />
            </head>
        );
    }
});


module.exports = Component;
