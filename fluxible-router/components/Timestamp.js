/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import React from 'react';
import updateTime from '../actions/updateTime';
import TimeStore from '../stores/TimeStore';

class Timestamp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = context.getStore(TimeStore).getState();
        this._changeListener = this._onStoreChange.bind(this);
    }
    componentDidMount() {
        this.context.getStore(TimeStore).addChangeListener(this._changeListener);
    }
    componentWillUnmount() {
        this.context.getStore(TimeStore).removeChangeListener(this._changeListener);
    }
    _onStoreChange() {
        this.setState(this.context.getStore(TimeStore).getState());
    }
    onReset() {
        this.context.executeAction(updateTime);
    }
    render() {
        return (
            <em onClick={this.onReset.bind(this)} style={{fontSize: '.8em'}}>{this.state.time}</em>
        );
    }
}

Timestamp.contextTypes = {
    getStore: React.PropTypes.func,
    executeAction: React.PropTypes.func
};

export default Timestamp;
