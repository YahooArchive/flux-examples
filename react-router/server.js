/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });
var express = require('express');
var favicon = require('serve-favicon');
var expressState = require('express-state');
var navigateAction = require('./actions/navigate');
var debug = require('debug')('Example');
var React = require('react');
var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var Router = require('react-router');

var server = express();
expressState.extend(server);
server.set('state namespace', 'App');
server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var context = app.createContext();

    debug('Executing navigate action');
    Router.run(app.getAppComponent(), req.path, function (Handler, state) {
        context.executeAction(navigateAction, state, function () {
            debug('Exposing context state');
            res.expose(app.dehydrate(context), 'App');

            debug('Rendering Application component into html');
            var html = React.renderToStaticMarkup(HtmlComponent({
                state: res.locals.state,
                markup: React.renderToString(Handler({
                    context: context.getComponentContext()
                }))
            }));

            debug('Sending markup');
            res.write(html);
            res.end();
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
