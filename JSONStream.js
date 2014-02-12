var fs = require('fs');
var JSONStream = require('JSONStream');

var parser = JSONStream.parse(['rows', true, 'value']);

parser.on('data', function(value) {
	console.dir(value);	
});

fs.createReadStream('data.json').pipe(parser);
