// events1.js

var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('Event A', function(arg1, arg2) {
  console.log('listener 1,', arg1, arg2);
});

emitter.on('Event B', function(arg1, arg2) {
  console.log('listener 2,', arg1, arg2);
});

emitter.emit('Event A', 1, 2);
emitter.emit('Event B', 3, 4);
