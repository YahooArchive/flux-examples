var showChat = require('../actions/showChat');
var debug = require('debug')('routes');

module.exports = {
  home: {
    path: '/',
    method: 'get',
    action: function (context, payload, done) {
      debug('home');
      context.executeAction(showChat, {}, done);
    }
  },
  thread_pageload: {
    path: '/thread/:id',
    method: 'get',
    navigate: {
      type: "pageload",
    },
    action: function (context, payload, done) {
      debug('thread pageload');
      context.executeAction(showChat, {}, function() {
        context.dispatch('OPEN_THREAD', { threadID: payload.params.id });
        done();
      });
    }
  },
  thread_click: {
    path: '/thread/:id',
    method: 'get',
    navigate: {
      type: "click",
    },
    action: function (context, payload, done) {
      debug('thread click');
      context.dispatch('OPEN_THREAD', { threadID: payload.params.id });
      done();
    }
  }
};
