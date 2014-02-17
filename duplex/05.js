var fs = require('fs');
var util = require('util');
var stream = require('stream');

var Duplex = stream.Duplex || require('readable-stream').Duplex;
var PassThrough = stream.PassThrough || require('readable-stream').PassThrough;

function DuplexThrough(options) {
	if(!(this instanceof DuplexThrough)) {
		return new DuplexThrough(options);
	}

	Duplex.call(this, options);
	this.inRStream = new PassThrough();
	this.outWStream = new PassThrough();
}

util.inherits(DuplexThrough, Duplex);
