/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('babel/register');
var express = require('express');
var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var navigateAction = require('./actions/navigate');
var debug = require('debug')('Example');
var React = require('react');
var app = require('./app');
var createElement = require('./create-element');
var HtmlComponent = React.createFactory(require('./components/Html'));
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Location = require('react-router/lib/Location');

var server = express();
server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var context = app.createContext();

    debug('Executing navigate action');
    var location = new Location(req.originalUrl);
    Router.run(app.getComponent(), location, function (err, initialState, transition) {
        context.executeAction(navigateAction, initialState, function(err) {
            debug('Exposing context state');
            var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

            debug('Rendering Application component into html');

            var RouterComponent = React.createElement(
              Router,
              {
                createElement: createElement(context),
                children: app.getComponent(),
                location: initialState.location,
                branch: initialState.branch,
                components: initialState.components,
                params: initialState.params
              }
            );
            var html = React.renderToStaticMarkup(HtmlComponent({
                context: context.getComponentContext(),
                state: exposed,
                markup: React.renderToString(RouterComponent)
            }));

            debug('Sending markup');
            res.send(html);
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
