module.exports = function (payload, done) {
    this.dispatch('UPDATE_TIME');
    done();
};
