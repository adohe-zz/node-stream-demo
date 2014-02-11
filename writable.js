var fs = require('fs');
var Stream = require('stream');

//var ws = fs.createWriteStream('helloworld.txt');
/*ws.write('hello\n');
ws.write('world\n');
ws.end();*/

//process.stdin.pipe(rs);

var ws = new Stream;
ws.writable = true;
ws.bytes = 0;

ws.write = function(buf) {
	ws.bytes += buf.length;
};

ws.end = function(buf) {
	if(arguments.length) ws.write(buf);	
	ws.writable = false;

	console.log('length: ' + ws.bytes);
};

ws.destory = function() {
	ws.writable = false;
};

//process.stdin.pipe(ws);
fs.createReadStream('helloworld.txt').pipe(ws);
