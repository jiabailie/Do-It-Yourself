var xlsx2json = require('xlsx-to-json');

var fs = require('fs');
var path = require('path');

var dirPath = './xlsx/';
var desPath = './json/';
var postFix = '.xlsx';

var args = process.argv;
var params = args.length;

if(params <= 2) {
  console.log("Please input the file name.");
} else {
  var files_to_export = args.slice(2);
  
 files_to_export.forEach(
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
		}
	  );
	}
 );
}