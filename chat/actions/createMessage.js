var debug = require('debug')('Example:createMessageAction'),
    ThreadStore = require('../stores/ThreadStore');

module.exports = function (payload, done) {
    var threadStore = this.getStore(ThreadStore),
        timestamp = Date.now();
    var message = {
        id: 'm_' + timestamp,
        threadID: threadStore.getCurrentID(),
        threadName: threadStore.getCurrentThreadName(),
        authorName: 'Bill', // hard coded for the example
        timestamp: timestamp,
        text: payload.text,
        isRead: true
    };
    debug('dispatching RECEIVE_MESSAGES', [message]);
    this.dispatch('RECEIVE_MESSAGES', [message]);
    this.fetcher.create('message', message, this.context, done);
};
