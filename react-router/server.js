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
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var Router = require('react-router');

var server = express();
server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var context = app.createContext();

    debug('Executing navigate action');
    Router.run(app.getComponent(), req.path, function (Handler, state) {
        context.executeAction(navigateAction, state, function () {
            debug('Exposing context state');
            var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

            debug('Rendering Application component into html');
            var Component = React.createFactory(Handler);
            var html = React.renderToStaticMarkup(HtmlComponent({
                state: exposed,
                markup: React.renderToString(Component({context:context.getComponentContext()}))
            }));

            debug('Sending markup');
            res.send(html);
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
