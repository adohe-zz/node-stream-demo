var fs = require('fs');
var Stream = require('stream');

/*var rs = fs.createReadStream('/etc/password');
rs.pipe(process.stdout, {end: false});*/

var rs = new Stream;
rs.readable = true;

var counter = 0;
var iv = setInterval(function() {
	rs.emit('data', String(counter++));	
}, 100);

setTimeout(function() {
	clearInterval(iv);
	rs.emit('end');
}, 2000);

rs.pipe(process.stdout, {end: false});
