var ftp = require('ftp');
var fs = require('fs');

var client = new ftp();

var upload = './upload/';

client.on('ready', function() {
  client.get('1.txt', function(err, stream) {
    if(err) {
	  throw err;
	}
	stream.once('close', function() { client.end(); });
	stream.pipe(fs.createWriteStream(upload + '1.local.copy.txt'));
  });
});

client.connect();