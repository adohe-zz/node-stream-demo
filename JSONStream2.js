var fs = require('fs');
var JSONStream = require('JSONStream');

var parser = JSONStream.parse(['rows', true, 'value']);

parser.on('data', function(value) {
	//You can modify value here
});

var stringify = JSONStream.stringify();
parser.pipe(stringify);

stringify.pipe(fs.createWriteStream('value.json'));
fs.createReadStream('data.json').pipe(parser);
