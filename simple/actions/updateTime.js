// `this` is the action controller context with `dispatch`, `getStore`, and `executeAction` methods
module.exports = function (payload, done) {
    this.dispatch('UPDATE_TIME');
    done();
};
