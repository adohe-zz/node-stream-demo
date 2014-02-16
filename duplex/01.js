var spawn = require('child_process').spawn;
var ps = spawn('grep', ['ee']);

var fs = require('fs');
var rs = fs.createReadStream('words.txt');
var ws = fs.createWriteStream('ee.txt');

rs.pipe(ps.stdin);
ps.stdout.pipe(ws);
