var Router = require('react-router');

module.exports = function (options) {
    var routes = options.routes;
    var location = options.location || Router.HistoryLocation;
    var router = Router.create({
        routes: routes,
        location: location
    });
    return {
        name: 'ReactRouterPlugin',
        plugContext: function plugContext(contextOptions) {
            return {
                plugActionContext: function () {

                }
            };
        }
    };
};