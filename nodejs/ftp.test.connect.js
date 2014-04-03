var ftp = require('ftp');

var client = new ftp();

client.on('ready', function() {
  client.list(function(err, list) {
    if(err) {
	  throw err;
	}
	console.dir(list);
	client.end();
  });
});

client.connect();