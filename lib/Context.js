var Dispatcher = require('dispatchr')(),
    Router = require('routr'),
    routes = require('../configs/routes');

function Context() {
    this.dispatcher = new Dispatcher({});
    this.router = new Router(routes);
    this.actionContext = this.getActionContext();
    this.componentContext = this.getComponentContext();
}

Context.registerStore = Dispatcher.registerStore.bind(Dispatcher);

Context.prototype.getComponentContext = function () {
    var self = this;
    return {
        executeAction: function (actionController, payload) {
            actionController.call(self.actionContext, payload, function (err) {
                if (err) {
                    console.error(err);
                }
            });
        },
        getStore: self.dispatcher.getStore.bind(self.dispatcher),
        makePath: self.router.makePath.bind(self.router)
    }
};

Context.prototype.getActionContext = function () {
    var self = this;
    return {
        dispatch: self.dispatcher.dispatch.bind(self.dispatcher),
        executeAction: function (actionController, payload, done) {
            actionController.call(self.actionContext, payload, done);
        },
        getStore: self.dispatcher.getStore.bind(self.dispatcher),
        router: this.router
    }
};

Context.prototype.dehydrate = function () {
    return {
        dispatcher: this.dispatcher.dehydrate()
    };
};

Context.prototype.rehydrate = function (obj) {
    this.dispatcher.rehydrate(obj.dispatcher || {});
};

module.exports = Context;
