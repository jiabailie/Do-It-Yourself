var xlsx2json = require('xlsx-to-json');

var fs = require('fs');
var path = require('path');

var dirPath = './xlsx/';
var desPath = './json/';
var postFix = '.xlsx';

var args = process.argv;

/* Traverse the directory [dir], return files which use postFix as their file extension. */
walk = function(dir) {
  var files_under_dir = fs.readdirSync(dir);
  var files = [];
  
  files_under_dir.forEach( function(item) {
    if(fs.statSync(dir + item).isFile()) {
	  if(path.extname(item) === postFix) {
	    files.push(item);
	  }
	}
  });
  
  return files;
}

var files_under_dir = walk(dirPath);

files_under_dir.forEach( 
  function(filename) {
    var output_file = path.basename(filename, postFix) + '.json';
	xlsx2json(
	{
	  input: dirPath + filename,
	  output: desPath + output_file
	},
	function(err, result) {
	  if(err) {
	    console.error(err);
	  } else {
	    console.log("Exported:", filename + " --> " + output_file);
	  }
	});
  }
);