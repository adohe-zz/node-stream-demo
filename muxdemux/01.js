var MuxDemux = require('mux-demux');
var md = new MuxDemux;

md.pipe(process.stdout);

var a = md.createWriteStream();
var b = md.createWriteStream();

var fs = require('fs');
fs.createReadStream('01.txt', {encoding: 'utf-8'}).pipe(a);
fs.createReadStream('02.txt', {encoding: 'utf-8'}).pipe(b);
