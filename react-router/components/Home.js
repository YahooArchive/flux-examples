/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import {contextTypes} from 'fluxible';
import Debug from 'debug';

var debug = Debug('Example');

class Home extends React.Component {
    static contextTypes = contextTypes;

    render() {
        debug("home context:", this.context);
        return <p>Welcome to the site!</p>;
    }
}

export default Home;
