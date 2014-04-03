var xlsx = require('xlsx');

/* The file location which will be processed. */
var path = './xlsx/special.xlsx';

/* Excel file object which will be analysed. */
var dest = xlsx.readFile(path);

/* The excel file's sheet names. */
var sheet_name_list = dest.SheetNames;

dest.SheetNames.forEach(function(sheetName) {
  for(var column in dest.Sheets[sheetName]) {
    if(column[0] === '!') {
	  continue;
	}
	
	console.log(sheetName + "!" + column + "=" + JSON.stringify(dest.Sheets[sheetName][column].v));
  }
});

//console.log(sheet_name_list);