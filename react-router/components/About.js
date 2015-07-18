/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {contextTypes} from 'fluxible';
import Debug from 'debug';

var debug = Debug('Example');


class About extends React.Component {
    static contextTypes = contextTypes;

    render() {
        debug("about context:", this.context);
        return <p>This is a description of the site.</p>;
    }
}

export default About;
