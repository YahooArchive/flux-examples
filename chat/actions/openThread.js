var debug = require('debug')('Example:openThreadAction'),
    ThreadStore = require('../stores/ThreadStore');

module.exports = function (payload, done) {
    debug('dispatching OPEN_THREAD', payload);
    this.dispatch('OPEN_THREAD', payload);
    done();
};
