/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var MessageSection = require('./MessageSection.jsx');
var React = require('react');
var ThreadSection = require('./ThreadSection.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;

var ChatApp = React.createClass({
    mixins: [RouterMixin, FluxibleMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },
    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },
    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },
    render: function() {
        return (
            <div className="chatapp">
                <ThreadSection />
                <MessageSection />
            </div>
        );
    }

});

module.exports = ChatApp;
