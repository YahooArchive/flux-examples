/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import PageStore from '../stores/PageStore';

class Page extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = context.getStore(PageStore).getState();
        this._changeListener = this._onStoreChange.bind(this);
    }
    componentDidMount() {
        this.context.getStore(PageStore).addChangeListener(this._changeListener);
    }
    componentWillUnmount() {
        this.context.getStore(PageStore).removeChangeListener(this._changeListener);
    }
    _onStoreChange() {
        this.setState(this.context.getStore(PageStore).getState());
    }
    render() {
        return (
            <p>{this.state.content}</p>
        );
    }
}

Page.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

export default Page;