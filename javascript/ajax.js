/*
 * eg: Ajax("http://[site name]/set/a.aspx?p1=value", "show(obj,...)");
 * Which means sending request to certain page, and get its response,
 * using eval() to call the javascript function in the context to deal with the response content.
 */
function Ajax(url, fun) {
    var xmlObj = CreateHttpRequest();

    xmlObj.onreadystatechange = function () {
        if (xmlObj.readyState == 4) {
            if (xmlObj.status == 200) {
                obj = xmlObj.responseXML;
                eval(fun);
            }
            else {
                alert("Read file error, Error Code [" + xmlObj.status + "]");
            }
        }
    }
    xmlObj.open('GET', url, true);
    xmlObj.send(null);
}

function CreateHttpRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }

    throw new Error("XMLHttp object could be created.");
}

function GetWebService(url, querystring) {
    var xmlHttp = CreateHttpRequest();

    xmlHttp.open('POST', url, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(querystring);

    var Result = xmlHttp.responseXML; // return the response content.

    return Result;
}
