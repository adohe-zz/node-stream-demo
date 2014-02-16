var spawn = require('child_process').spawn;
var ps = spawn('grep', ['ee']);

var fs = require('fs');
var rs = fs.createReadStream('words.txt');
var ws = fs.createWriteStream('ee.txt');

var duplexer = require('duplexer');
var s = duplexer(ps.stdin, ps.stdout);

rs.on('data', function(buf) {
	s.write(buf);
});

rs.on('end', function() {
	s.end();
});

s.pipe(ws);
