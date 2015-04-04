/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import Nav from './Nav';
import Timestamp from './Timestamp';
import ApplicationStore from '../stores/ApplicationStore';
import {connectToStores, provideContext} from 'fluxible/addons';
import {handleHistory} from 'fluxible-router';

class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidUpdate(prevProps) {
        let newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
    render() {
        var Handler = this.props.currentRoute.get('handler');
        //render content
        return (
            <div>
                <Nav />
                <Handler />
                <Timestamp />
            </div>
        );
    }
}

Application.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

Application = provideContext(
    handleHistory(
        connectToStores(Application, [ApplicationStore], {
            ApplicationStore: (store) => { store.getState() }
        }),
        {enableScroll: false})
);

export default Application;
