var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  var post = '';

  req.on('data', function(chunk) {
    post += chunk;
  });

  req.on('end', function() {
    post = querystring.parse(post);

    res.write("Display the post contents:");
    res.write("<p>Title:" + post.title + "</p>");
    res.write("<p>Text:" + post.text + "</p>");
    res.end();
  });
}).listen(3000);

console.log('HTTP server is listening at port 3000.');
