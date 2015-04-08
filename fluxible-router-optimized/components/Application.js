/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import Nav from './Nav';
import Timestamp from './Timestamp';
import ApplicationStore from '../stores/ApplicationStore';
import RouteHandler from './RouteHandler';
import {FluxibleMixin} from 'fluxible';
import {RouterComponent} from 'fluxible-router';

class Application extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = context.getStore(ApplicationStore).getState();
        this._changeListener = this._onStoreChange.bind(this);
    }
    componentDidMount() {
        this.context.getStore(ApplicationStore).addChangeListener(this._changeListener);
    }
    componentWillUnmount() {
        this.context.getStore(ApplicationStore).removeChangeListener(this._changeListener);
    }
    _onStoreChange() {
        this.setState(this.context.getStore(ApplicationStore).getState());
    }
    componentDidUpdate(prevProps, prevState) {
        let newState = this.state;
        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }
        document.title = newState.pageTitle;
    }
    render() {
        //render content
        return (
            <RouterComponent>
                <div>
                    <Nav />
                    <RouteHandler />
                    <Timestamp />
                </div>
            </RouterComponent>
        );
    }
}

Application.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};


export default Application;
