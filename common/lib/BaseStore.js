var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    CHANGE_EVENT = 'change';

function BaseStore(context) {
    this.context = context;
    if (this.getInitialState) {
        this.getInitialState();
    }
}

util.inherits(BaseStore, EventEmitter);

BaseStore.prototype.addChangeListener = function(callback) {
  this.on(CHANGE_EVENT, callback);
};

BaseStore.prototype.removeChangeListener = function(callback) {
  this.removeListener(CHANGE_EVENT, callback);
};

BaseStore.prototype.emitChange = function() {
  this.emit(CHANGE_EVENT);
};

module.exports = BaseStore;