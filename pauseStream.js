var http = require('http');
var fs = require('fs');
var pauseStream = require('pause-stream');

/*var server = http.createServer(function(req, res) {
	var ws = fs.createWriteStream(__dirname + '/output.txt');	
	req.pipe(ws);

	req.on('end', function() {
		res.end('ok\n');
	});
});*/
/*var server = http.createServer(function(req, res) {
	var id = Math.random().toString(16).slice(2);
	var dir = __dirname + '/data/' + id;

	fs.mkdir(dir, function(err) {
		if(err)
			res.end('err\n');
		
		var ws = fs.createWriteStream(dir + '/output.txt');
		res.pipe(ws);

		req.on('end', function() {
			res.end('ok\n');
		});
	});
});*/
var server = http.createServer(function(req, res) {
	var id = Math.random().toString(16).slice(2);
	var dir = __dirname + '/data/' + id;
	
	var ps = pauseStream();
	ps.pause();
	req.pipe(ps);
	
	fs.mkdir(dir, function(err) {
		if(err)
			res.end('err\n');

		var ws = fs.createWriteStream(dir + '/output.txt');
		ps.pipe(ws);

		ps.on('end', function() {
			res.end(id + '\n');
		});

		ps.resume();
	});
});
server.listen(8080);
