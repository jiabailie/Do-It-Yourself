// http-request.js

var http = require('http');

var querystring = require('querystring');

var contents = querystring.stringify({
  name: 'Gabriel',
  email: 'yrg@gmail.com',
  address: 'shanghai',
});

var options = {
  host: 'www.gmail.com',
  path: '/post.html',
  method: 'POST',
  headers: {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Content-Length' : contents.length
  }
};

var req = http.request(options, function(res) {
  res.setEncoding('utf-8');
  res.on('data', function(data) {
    console.log(data);
  });
});

req.write(contents);
req.end();
