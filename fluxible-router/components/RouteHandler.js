/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';

class RouteHandler extends React.Component {
    render() {
        if (!this.props.currentRoute) {
            return null;
        }
        return React.createElement(this.props.currentRoute.handler);
    }
}

export default RouteHandler;
