// Utilities: a Javascript class for puworld.com
// Utilities.js Copyright (c) 2009 Victor Zhu. ver: 1.01 P.H.Consultant
// 本程序需要　jQuery.js类库的支持。　

///--- 去空格
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.Occurs = function(ch) {
    return this.split(ch).length - 1;
}

String.prototype.isDigit = function() {
    var s = this.Trim();
    return (s.replace(/\d/g, "").length == 0);
}

String.prototype.isAlpha = function() {
    return (this.replace(/\w/g, "").length == 0);
}

String.prototype.isNumber = function() {
    var s = this.Trim();
    return (s.search(/^[+-]?[0-9.]*$/) >= 0);
}

String.prototype.lenb = function() {
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

///是否有中文　　
String.prototype.isInChinese = function() {
    return (this.length != this.replace(/[^\x00-\xff]/g, "**").length);
}

///邮箱格式验证　　
String.prototype.isEmail = function() {
    var str = this;

    if (!checkByteLength(str, 1, 50)) return false;
    var patn = /^\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,6}$/;
    if (patn.test(str)) {
        return true;
    } else {
        return false;
    }
}

String.prototype.isInList = function(value) {
    var str = this.split(",");

    for (var i = 0; i < str.length; i++) {
        if (str[i] == value) return true;
    }
    return false;
}

// 删除前提示
// @elementName 复选框的名称，例如： "chk_employee"
// @typeValue    需要删除的功能类别值，例如： "员工"
function onDeleteCheck(elementName, typeValue) {
    var _aryElements = document.getElementsByName(elementName);
    var flag = false;
    for (i = 0; i < _aryElements.length; i++) {
        if (_aryElements[i].checked) { flag = true; break; }
    }
    if (!flag) { alert("删除前，请选择" + typeValue + "资料。"); return false; }
    return confirm("您确认删除这些" + typeValue + "资料么？");
}

///全选
function onSelectAll(obj,elementName) {
    var aryCheck = document.getElementsByTagName("input");
    for (var i = 0; i < aryCheck.length; i++) {
        if (aryCheck[i].type == "checkbox" && aryCheck[i].name == elementName) {
            aryCheck[i].checked = (obj.checked == true) ? true : false;
        }
    }
}

function onCheckedAll(elementName) {
    $("INPUT").each(function() { if ($(this).attr("name") == elementName && $(this).attr("type") == 'checkbox') { $(this).attr("checked", 'checked'); } });
}

///
function onOperateCheck(elementName, typeValue, memo) {
    var _aryElements = document.getElementsByName(elementName);
    var flag = false;
    for (i = 0; i < _aryElements.length; i++) {
        if (_aryElements[i].checked) { flag = true; break; }
    }
    if (!flag) { alert(memo + "前，请选择" + typeValue + "资料。"); return false; }
    return confirm("您确认" + memo + "这些" + typeValue + "资料么？");
}

///按元素名称选择元素对象
var $F = function(name) {
    return document.getElementsByName ? document.getElementsByName(name) : null;
}

///按元素标签名称选择元素对象
var $Tag = function(tagName) {
    return document.getElementsByTagName ? document.getElementsByTagName(tagName) : new Array();
}

//显示提示层代码
function showhintinfo(obj, objleftoffset, objtopoffset, title, info, objheight, showtype, objtopfirefoxoffset) {

    var p = getposition(obj);

    if ((showtype == null) || (showtype == "")) {
        showtype == "up";
    }
    document.getElementById('hintiframe' + showtype).style.height = objheight + "px";


    document.getElementById('hintinfo' + showtype).innerHTML = info;
    document.getElementById('hintdiv' + showtype).style.display = 'block';

    if ((objtopfirefoxoffset != null) && !isie()) {
        document.getElementById('hintdiv' + showtype).style.top = p['y'] + objtopfirefoxoffset + "px";
    }
    else {

        if (objtopoffset == 0) {
            if (showtype == "up") {
                document.getElementById('hintdiv' + showtype).style.top = p['y'] - document.getElementById('hintinfo' + showtype).offsetHeight - 40 + "px";
            }
            else {
                document.getElementById('hintdiv' + showtype).style.top = p['y'] + obj.offsetHeight + 5 + "px";
            }
        }
        else {
            document.getElementById('hintdiv' + showtype).style.top = p['y'] + objtopoffset + "px";
        }
    }
    document.getElementById('hintdiv' + showtype).style.left = (p['x'] + objleftoffset - 55) + "px";
}

//隐藏提示层代码
function hidehintinfo() {
    document.getElementById('hintdivup').style.display = 'none';
    document.getElementById('hintdivdown').style.display = 'none';
}

//得到字符串长度
function getLen(str) {
    var totallength = 0;

    for (var i = 0; i < str.length; i++) {
        var intCode = str.charCodeAt(i);
        if (intCode >= 0 && intCode <= 128) {
            totallength = totallength + 1; //非中文单个字符长度加 1
        }
        else {
            totallength = totallength + 2; //中文字符长度则加 2
        }
    }
    return totallength;
}

function getposition(obj) {
    var r = new Array();
    r['x'] = obj.offsetLeft;
    r['y'] = obj.offsetTop;
    while (obj = obj.offsetParent) {
        r['x'] += obj.offsetLeft;
        r['y'] += obj.offsetTop;
    }
    return r;
}

///时间大小判断　
///如果 date2 <= date1 返回 false;
function CompareDate(date1, date2) {

    var _aryFrom = date1.split("-");
    var _valid_from = new Date(parseInt(_aryFrom[0]), parseInt(_aryFrom[1]), parseInt(_aryFrom[2]), 0, 0, 0);

    var _aryTo = date2.split("-");
    var _valid_to = new Date(parseInt(_aryTo[0]), parseInt(_aryTo[1]), parseInt(_aryTo[2]), 0, 0, 0);

    if (_valid_to.getTime() <= _valid_from.getTime()) {
        return false;
    }
    else {
        return true;
    }
}

//输入框的全选或否
function selectChanged(obj, id) {
    var x = document.getElementsByName(id);
    for (var i = 0; i <= x.length - 1; i++) {
        if (obj.checked) {
            x[i].checked = true;
        }
        else {
            x[i].checked = false;
        }
    }
}

function checkByteLength(str, minlen, maxlen) {
    if (str == null) return false;
    var l = str.length;
    var blen = 0;
    for (i = 0; i < l; i++) {
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            blen++;
        }
        blen++;
    }
    if (blen > maxlen || blen < minlen) {
        return false;
    }
    return true;
}

//选择卡切换
function onTab(index) {
    $(".tablist").find("A").each(function() { $(this).removeClass(); });
    $("DIV[id^='content']").each(function() { $(this).hide(); });
    $("#A" + index).addClass("current");
    $("#content" + index).show();
}

///设置单选选中操作
/// elementName -- 当前radio的name。
/// radioValue     -- 需要被选中项的值。
function onRadioChecked(elementName, radioValue) {
    $("INPUT").each(function() { if ($(this).attr("type") == "radio" && $(this).attr("name") == elementName && $(this).val() == radioValue) { $(this).attr("checked", 'checked'); } });
}

///设置下柆框选中操作
/// elementName -- 当前radio的name。
/// radioValue     -- 需要被选中项的值。
function onSelectSelected(elementId, selectValue) {
    $("#" + elementId).attr("value", selectValue); 
}

///设置单复选选框选中操作
/// elementName -- 当前radio的name。
/// radioValue     -- 需要被选中项的值。
function onCheckBoxChecked(elementId, checkValue) {
    if ($("#" + elementId).attr("type") == "checkbox" && $("#" + elementId).val() == checkValue) $("#" + elementId).attr("checked", 'checked');
}

///设置多复选选框选中操作
/// elementName -- 当前radio的name。
/// radioValue     -- 需要被选中项的值。
function onCheckBoxListChecked(elementName, aryValue) {
    var chk_layout = document.getElementsByName(elementName);
    var aryLayout = aryValue.split(',');
    for (var i = 0; i < aryLayout.length; i++) {
        for (var k = 0; k < chk_layout.length; k++) {
            if (aryLayout[i] != "" && chk_layout[k].value == aryLayout[i]) {
                chk_layout[k].checked = true;
            }
        }
    }
}

///显示obj里已经输入了多少文字
///elementID为显示区域ID
///maxLength为最大可输入字符数
function CheckNum(obj, elementID, maxLength) {
    document.getElementById(elementID).innerHTML = "当前输入" + obj.value.length + " / " + maxLength + " 个字符";
}

//返回URL的Request值
function GetRequestValue(url, requestKey) {
    if (url.indexOf("?") > -1) {
        var ss = url.split("?");
        var requests = ss[1].split("&");

        for (var i = 0; i <= requests.length - 1; i++) {
            var x = requests[i].split("=");
            if (x[0] == requestKey) {
                return x[1];
            }
        }
    }
    return "";
}

function GetRadioButtonValue(element, defaultValue) {
    var ary = document.getElementsByName(element);
    for (var i = 0; i <= ary.length - 1; i++) {
        if (ary[i].checked) {
            return ary[i].value;
        }
    }

    return defaultValue;
}

//设置多选框的值
//element为多选框的name值
//value为多选框的选中值，用逗号分隔
function setCheckBoxChecked(element, value) {
    if (value != null && value.Trim() != "") {
        var ss = value.split(',');
        var array = document.getElementsByName(element);

        for (var i = 0; i <= ss.length - 1; i++) {
            for (var j = 0; j <= array.length - 1; j++) {
                if (ss[i] == array[j].value) {
                    array[j].checked = true;
                }
            }
        }
    }
}
