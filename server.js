/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });
var http = require('http'),
    express = require('express'),
    expressState = require('express-state'),
    React = require('react/addons'),
    Dispatchr = require('dispatchr'),
    ApplicationStore = require('./stores/ApplicationStore'),
    TimeStore = require('./stores/TimeStore'),
    Application = require('./components/Application.jsx');

Dispatchr.registerStore(ApplicationStore);
Dispatchr.registerStore(TimeStore);

var app = express();
expressState.extend(app);
app.set('state namespace', 'App');
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    var dispatcher = new Dispatchr(req.context || {});

    dispatcher.dispatch('NAVIGATE', {
        url: req.url
    }, function (err) {
        if (err) {
            next(err);
            return;
        }
        var appComponent = Application({dispatcher: dispatcher});
        var html = React.renderComponentToString(appComponent);
        res.expose(dispatcher.toJSON(), 'Dispatcher');
        res.render('layout', {
            html: html
        }, function (err, markup) {
            res.send(markup);
        });
    });
});

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);
console.log('Listening on port ' + port);
