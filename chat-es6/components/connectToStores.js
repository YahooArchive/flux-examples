/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var objectAssign = require('object-assign');

/**
 * Registers change listeners and retrieves state from stores using `getStateFromStores`
 * method. Concept provided by Dan Abramov via
 * https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
 * @method connectToStores
 * @param {React.Component} Component component to pass state as props to
 * @param {array} stores List of stores to listen for changes
 * @param {function} getStateFromStores function that receives all stores and should return
 *      the full state object. Receives `stores` hash and component `props` as arguments
 * @returns {React.Component}
 */
module.exports = function connectToStores(Component, stores, getStateFromStores) {
    var componentName = Component.displayName || Component.name;
    class StoreConnector extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.props = props;
            this.context = context;
            this.state = this.getStateFromStores(this.props);

            this._onStoreChange = this._onStoreChange.bind(this);
        }
        componentDidMount() {
            stores.forEach(function storesEach(Store) {
                this.context.getStore(Store).addChangeListener(this._onStoreChange);
            }, this);
        }
        componentWillUnmount() {
            stores.forEach(function storesEach(Store) {
                this.context.getStore(Store).removeChangeListener(this._onStoreChange);
            }, this);
        }
        getStateFromStores() {
            if ('function' === typeof getStateFromStores) {
                var storeInstances = {};
                stores.forEach(function (store) {
                    var storeName = store.name || store.storeName || store;
                    storeInstances[storeName] = this.context.getStore(store);
                }, this);
                return getStateFromStores(storeInstances, this.props);
            }
            var state = {};
            //@TODO deprecate?
            Object.keys(getStateFromStores).forEach(function (storeName) {
                var stateGetter = getStateFromStores[storeName];
                var store = this.context.getStore(storeName);
                objectAssign(state, stateGetter(store, this.props));
            }, this);
            return state;
        }
        _onStoreChange() {
            this.setState(this.getStateFromStores());
        }
        render() {
            return React.createElement(Component, objectAssign({}, this.props, this.state));
        }
    }
    StoreConnector.displayName = componentName + 'StoreConnector';
    StoreConnector.contextTypes = {
        getStore: React.PropTypes.func
    };

    return StoreConnector;
};