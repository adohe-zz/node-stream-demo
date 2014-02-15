var EventEmitter = require('events').EventEmitter;
var emitStream = require('emit-stream');

var em = new EventEmitter;
var stream = emitStream(em);

stream.on('data', function(data) {
	console.dir(data);
});

em.emit('beep', 'boop');
