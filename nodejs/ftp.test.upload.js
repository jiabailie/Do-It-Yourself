var ftp = require('ftp');
var fs = require('fs');

var client = new ftp();

var filepath = './upload/upload.txt';

client.on('ready', function() {
  client.put(filepath, 'upload.remote.copy.txt', function(err) {
    if(err) {
	  throw err;
	}
	client.end();
  });
});

client.connect();