var EventEmitter = require('events').EventEmitter;
var emitStream = require('emit-stream');
var JSONStream = require('JSONStream');
var net = require('net');

var em = new EventEmitter;

var server = net.createServer(function(socket) {
	var es = emitStream(em).pipe(JSONStream.stringify()); 
	es.pipe(socket);
});

server.listen(8080);

setInterval(function() {
	em.emit('beep', 'boop');
}, 100);
