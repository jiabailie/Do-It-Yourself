var xmlHttp;

showHint = function(str) {
  if(str.length == 0) {
    document.getElementById('txtHint').innerHTML = "";
	return;
  }
  
  xmlHttp = GetXmlHttpObject();
  if(xmlHttp == null) {
    alert('Browser does not support HTTP request');
	return;
  }
  
  var url = 'gethint.php';
  url = url + '?q=' + str;
  url = url + '&sid=' + Math.random();
  
  xmlHttp.onreadystatechange = stateChanged;
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

stateChanged = function() {
  if(xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete') {
    document.getElementById('txtHint').innerHTML = xmlHttp.responseText;
  }
}

GetXmlHttpObject = function() {
  var xmlHttp = null;
  try {
    // firefox, opera9.0+, safari
	xmlHttp = new XMLHttpRequest();
  } catch(e) {
    // ie
	try {
	  xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
	} catch(e) {
	  xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
  }
  return xmlHttp;
}