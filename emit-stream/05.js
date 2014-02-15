var EventEmitter = require('events').EventEmitter;
var em = new EventEmitter;

var emitStream = require('emit-stream');
var JSONStream = require('JSONStream');

var net = require('net');
var server = net.createServer(function(socket) {
	var es = emitStream(em).pipe(JSONStream.stringify());
	es.pipe(socket);
});

server.listen(8000);

server.on('listening', function() {
	var stream = net.connect(8000);
	var e = emitStream(stream.pipe(JSONStream.parse([true])));
	e.on('beep', function(x) {
		console.log('beep: ' + x);
	});
});

setInterval(function() {
	em.emit('beep', 'boop');
}, 100);
