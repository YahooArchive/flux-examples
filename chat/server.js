/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });
var http = require('http'),
    express = require('express'),
    expressState = require('express-state'),
    bodyParser = require('body-parser'),
    debug = require('debug')('Example'),
    React = require('react'),
    Application = require('./app'),
    showChat = require('./actions/showChat'),
    Fetcher = require('fetchr');

var app = express();
expressState.extend(app);
app.set('state namespace', 'App');
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/css'));

app.use(bodyParser.json());

Fetcher.registerFetcher(require('./fetchers/message'));
app.use(Application.config.xhrPath, Fetcher.middleware());

app.use(function (req, res, next) {
    var fetcher = new Fetcher({
        req: req
    });
    var application = new Application({
        fetcher: fetcher
    });

    debug('Executing showChat action');
    application.context.getActionContext().executeAction(showChat, {}, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }
        debug('Rendering Application component');
        var html = React.renderComponentToString(application.getComponent());
        debug('Exposing context state');
        res.expose(application.context.dehydrate(), 'Context');
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
http.createServer(app).listen(port);
console.log('Listening on port ' + port);
