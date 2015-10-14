/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {contextTypes} from 'fluxible';
import Nav from './Nav';
import Timestamp from './Timestamp';
import ApplicationStore from '../stores/ApplicationStore';


class Application extends React.Component {

    static contextTypes = contextTypes;

    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <Nav />
                {this.props.children}
                <Timestamp />
            </div>
        );
    }
}

export default Application;
