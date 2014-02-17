//For backward compatibility with Node.js prior to v0.10, use the 
//npm module readable-stream to polyfill. If stream.Duplex does not 
//exist (old Node.js) then use Duplex from readable-stream
var stream = require('stream');
var util = require('util');
var Duplex = stream.Duplex || require('readable-stream').Duplex;

//Custom duplex stream constructor
function CustomStream(options) {
	if(!(this instanceof CustomStream)) {
		return new CustomStream(options);
	}

	Duplex.call(this, options);

	this.readArr = [];
	this.timer = setInterval(addTime, 1000, this.readArr);
}
util.inherits(CustomStream, Duplex);

function addTime(readArr) {
	readArr.push((new Date()).toString());
}

CustomStream.prototype._read = function readBytes(bytes) {
	var self = this;
	while(this.readArr.length) {
		var chunk = this.readArr.shift();
		if(!self.push(chunk)) {
			break;
		}
	}

	if(this.timer) {
		setTimeout(readBytes.bind(self), 1000, bytes);
	} else {
		self.push(null);
	}
}

CustomStream.prototype.stopTimer = function() {
	if(this.timer) clearInterval(this.timer);
	this.timer = null;
}

CustomStream.prototype._write = function(chunk, encoding, cb) {
	console.log('chunk: ' + chunk.toString());
	cb();
}

var duplex = new CustomStream();
duplex.on('readable', function() {
	var chunk;
	while(null !== (chunk = duplex.read())) {
	}
});

duplex.write('hello world \n', function() {
	console.log('call _write method...');
});
duplex.write('beep boop');
duplex.end();

setTimeout(function() {
	duplex.stopTimer();
}, 3000);
