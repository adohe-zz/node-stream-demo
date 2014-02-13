var http = require('http');
var Model = require('scuttlebutt/model');

var am = new Model;

var server = http.createServer(function(req, res) {
	if(req.url === '/_replicate') {
		req.pipe(am.createStream()).pipe(res);
		return;
	}

	var key = req.url.split('=')[0];
	var value = req.url.split('=')[1];

	if(value === undefined) {
		res.end(am.get(key) + '\n');	
	} else {
		am.set(key, value);
		res.end(key + ' = ' + value + '\n');
	}
});

server.listen(Number(process.argv[2]));
console.log('server start at port: 8080');
