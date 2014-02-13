var Model = require('scuttlebutt/model');

var am = new Model;
var bm = new Model;

var as = am.createStream();
var bs = bm.createStream();

as.pipe(bs).pipe(as);

bm.on('update', function(key, value, source) {
	if(source != this.id) {
		console.log(key + ' ->' + bm.get('beep') + ' from: ' + source);
	} else {
	}
});

am.set('beep', 374);
