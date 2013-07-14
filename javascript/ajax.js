function Ajax(file, fun) {
    var xmlObj = CreateHttpRequest();
    xmlObj.onreadystatechange = function () {
        if (xmlObj.readyState == 4) {
            if (xmlObj.status == 200) {
                obj = xmlObj.responseXML;
                eval(fun);
            }
            else {
                alert("读取文件出错,错误号为 [" + xmlObj.status + "]");
            }
        }
    }
    xmlObj.open('GET', file, true);
    xmlObj.send(null);
}

function CreateHttpRequest() {
  if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	} else if(window.ActiveXObject){
		return new ActiveXObject("Microsoft.XMLHTTP");
	} 
	throw new Error("XMLHttp object could be created.");
}

function GetWebService(url,querystring,paramtype) {
    var xmlHttp = CreateHttpRequest();
    xmlHttp.open('POST', url, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(querystring);
    var Result = xmlHttp.responseXML; //返回XML中的节点内容
    return Result;
}
