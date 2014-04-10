// http get
var http = require('http');

http.get({host: '127.0.0.1:3000'}, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(data) {
    console.log(data);
  });
});
