var EventEmitter = require('events').EventEmitter;
var emitStream = require('emit-stream');
var JSONStream = require('JSONStream');

var em = new EventEmitter;
var stream = emitStream(em).pipe(JSONStream.stringify());

stream.on('data', function(data) {
	console.dir(data);
});

setInterval(function() {
	em.emit('beep', 'boop');
}, 100);
