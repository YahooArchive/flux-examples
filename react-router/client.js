/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
'use strict';
var React = require('react');
var debug = require('debug');
var bootstrapDebug = debug('Example');
var app = require('./app');
var createElement = require('./create-element');
var dehydratedState = window.App; // Sent from the server
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var BrowserHistory = require('react-router/lib/BrowserHistory').default;
var navigateAction = require('./actions/navigate');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');

window.React = React; // For chrome dev tool support
debug.enable('*');

bootstrapDebug('rehydrating app');


function RenderApp(context, state){
    bootstrapDebug('React Rendering');
    function navigate() {
        context.executeAction(navigateAction, state)
    }

    var mountNode = document.getElementById('app');
    var RouterComponent = (<Router
                                createElement={createElement(context)}
                                children={app.getComponent()}
                                history={new BrowserHistory()}
                                onUpdate={navigate} />);

    React.render(
        RouterComponent,
        mountNode,
        function () {
            bootstrapDebug('React Rendered');
        }
    );
}

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;

    Router.run(app.getComponent(),
        window.location,
        function (error, state, transition) {
            RenderApp(context, state);
        }
    );
});
