/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });
var http = require('http');
var express = require('express');
var expressState = require('express-state');
var navigateAction = require('flux-router-component').navigateAction;
var debug = require('debug')('Example');
var React = require('react');
var app = require('./app');

var server = express();
expressState.extend(server);
server.set('state namespace', 'App');
server.set('views', __dirname + '/templates');
server.set('view engine', 'jade');

server.use(express.static(__dirname + '/build'));

server.use(function (req, res, next) {
    var context = app.createContext();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        path: req.path
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }
        debug('Rendering Application component');
        var html = React.renderToString(app.getAppComponent()({
            context: context.getComponentContext()
        }));
        debug('Exposing context state');
        res.expose(app.dehydrate(context), 'App');
        debug('Rendering application into layout');
        res.render('layout', {
            html: html
        }, function (err, markup) {
            if (err) {
                next(err);
            }
            debug('Sending markup');
            res.send(markup);
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
