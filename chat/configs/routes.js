var showChat = require('../actions/showChat');
var openThread = require('../actions/openThread');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        action: function (context, payload, done) {
            context.executeAction(showChat, {}, done);
        }
    },
    thread: {
        path: '/thread/:id',
        method: 'get',
        action: function (context, payload, done) {
            context.executeAction(showChat, { threadID: payload.params.id }, function() {
                context.executeAction(openThread, { threadID: payload.params.id }, function() {
                    done();
                })
            });
        }
    }
};
