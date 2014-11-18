/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({ extension: '.jsx' });
var express = require('express');
var favicon = require('serve-favicon');
var expressState = require('express-state');
var bodyParser = require('body-parser');
var React = require('react');
var app = require('./app');
var showTodos = require('./actions/showTodos');
var HeadComponent = React.createFactory(require('./components/Head.jsx'));


var server = express();
expressState.extend(server);
server.set('state namespace', 'App');
server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use(bodyParser.json());


// Get access to the fetchr plugin instance
var fetchrPlugin = app.getPlugin('FetchrPlugin');

// Register our todos REST service
fetchrPlugin.registerService(require('./services/todo'));

// Set up the fetchr middleware
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

// Every other request gets the app bootstrap
server.use(function (req, res, next) {
    var context = app.createContext({
        req: req // The fetchr plugin depends on this
    });

    context.executeAction(showTodos, {}, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                return next();
            }
            else {
                return next(err);
            }
        }

        var head = React.renderToStaticMarkup(HeadComponent());
        var html = React.renderToString(app.getAppComponent()({
            context: context.getComponentContext()
        }));

        res.expose(app.dehydrate(context), 'App');

        res.write('<html>');
        res.write(head);
        res.write('<body>');
        res.write('<section id="todoapp">'+ html +'</section>');
        res.write('<footer id="info">');
        res.write('<p>Double-click to edit a todo</p>');
        res.write('<p>Some assets from <a href="http://todomvc.com">TodoMVC</a></p>');
        res.write('<p>Some code inspried by <a href="http://todomvc.com/examples/react/">TodoMVC React (Pete Hunt)</a></p>');
        res.write('<p>Showing off <a href="http://fluxible.io">Fluxible</a></p>');
        res.write('</footer>');
        res.write('</body>');
        res.write('<script>' + res.locals.state + '</script>');
        res.write('<script src="/public/js/client.js" defer></script>');
        res.write('</html>');
        res.end();
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
