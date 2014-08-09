/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });
var http = require('http'),
    express = require('express'),
    expressState = require('express-state'),
    React = require('react/addons'),
    Context = require('./lib/Context'),
    ApplicationStore = require('./stores/ApplicationStore'),
    TimeStore = require('./stores/TimeStore'),
    Application = require('./components/Application.jsx'),
    navigateAction = require('flux-router-component').navigateAction,
    debug = require('debug')('flux-example:server');

Context.registerStore(ApplicationStore);
Context.registerStore(TimeStore);

var app = express();
expressState.extend(app);
app.set('state namespace', 'App');
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/build'));

app.use(function (req, res, next) {
    debug('Creating context');
    var context = new Context();

    debug('Executing navigate action');
    context.getActionContext().executeAction(navigateAction, {
        path: req.url
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }
        debug('Creating Application component');
        var appComponent = Application({context: context.getComponentContext()});
        debug('Rendering Application component');
        var html = React.renderComponentToString(appComponent);
        debug('Exposing context state');
        res.expose(context.dehydrate(), 'Context');
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
