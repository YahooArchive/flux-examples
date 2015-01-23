var showChat = require('../actions/showChat');

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
            context.executeAction(showChat, {}, function() {
                context.dispatch('OPEN_THREAD', { threadID: payload.params.id });
                done();
            });
        }
    }
};
