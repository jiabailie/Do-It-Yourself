// dummy.js

// basic imports
var events = require('events');

Dummy = function() {
  events.EventEmitter.call(this);
}

// inherit events.EventEmitter
Dummy.super_ = events.EventEmitter;
Dummy.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: Dummy,
    enumerable: false
  }
});

Dummy.prototype.cooking = function(chicken) {
  var self = this;
  self.chicken = chicken;
  self.cook = cook();
  self.cook(chicken, function(cooked_chicken) {
    self.chicken = cooked_chicken;
    self.emit('cooked', self.chicken);
  });

  return self;
}

// for us to do a require later
module.exports = Dummy;
