//************************************************************************************************************
//************************************************************************************************************
//****************************************FunctionTools Class*************************************************
//************************************************************************************************************
//************************************************************************************************************
var FunctionTools = {
    Version: "1.0",
    Develop: "Function Tools",

    SetTextValue: function (id, requestKey) { },
    SetSelectValue: function (id, requestKey) { },
    SetCheckBoxChecked: function (element, value) { },

    ClearCheckBox: function (element) { },

    GetRequestValue: function (url, requestKey) { },
    onSelectSelected: function (elementId, selectValue) { },

    CheckMobile: function (value) { },
    CheckEmail: function (value) { },
    CheckPostCode: function (value) { },
    CheckChinese: function (value) { },
    CheckNum: function (obj, elementID, maxLength) { },

    GetStringLength: function (value) { },
    GetNvarcharStringLength: function (value) { },
    GetUrlEncode: function (value) { }
};

//设置某输入框的值
FunctionTools.SetTextValue = function (id, requestKey) {
    document.getElementById(id).value = decodeURI(FunctionTools.GetRequestValue(document.URL, requestKey));
}

//设置某下拉框的值
FunctionTools.SetSelectValue = function (id, requestKey) {
    FunctionTools.onSelectSelected(id, FunctionTools.GetRequestValue(document.URL, requestKey));
}

//设置多选框的值
//element -- 多选框的name值
//value -- 多选框的选中值，用逗号分隔
FunctionTools.SetCheckBoxChecked = function (element, value) {
    if (value != null && value.Trim() != "") {
        var ss = value.split(',');
        var array = document.getElementsByName(element);

        for (var i = 0; i <= ss.length - 1; i++) {
            for (var j = 0; j <= array.length - 1; j++) {
                if (ss[i] != "" && ss[i] == array[j].value) {
                    array[j].checked = true;
                }
            }
        }
    }
}

FunctionTools.ClearCheckBox = function (element) {
    var array = document.getElementsByName(element);
    for (var i = 0; i < array.length; i++) {
        array[i].checked = false;
    }
}

//取request的值
//url -- 链接
//requestkey -- 键值
FunctionTools.GetRequestValue = function (url, requestKey) {
    var value = "";
    if (url.indexOf("?") > -1) {
        var ss = url.split("?");
        var requests = ss[1].split("&");

        for (var i = 0; i <= requests.length - 1; i++) {
            var x = requests[i].split("=");
            if (x[0] == requestKey) {
                value = x[1];
            }
        }
    }
    return value;
}

//设置下柆框选中操作
//elementName -- 当前radio的name。
//radioValue -- 需要被选中项的值。
FunctionTools.onSelectSelected = function (elementId, selectValue) {
    $("#" + elementId).attr("value", selectValue);
}

//验证输入的电话号码是否合法
FunctionTools.CheckMobile = function (value) {
    var patern = /^((\d{3,4}-)?\d{7,8})|(1[0-9]{10})$/;
    return patern.test(value);
}

//验证输入邮箱是否合法
FunctionTools.CheckEmail = function (value) {
    var patern = /^\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,6}$/;
    return patern.test(value);
}

//验证输入邮编是否合法
FunctionTools.CheckPostCode = function (value) {
    var patern = /^[1-9]\d{5}(?!\d)$/;
    return patern.test(value);
}

//验证输入值是否只有汉字，false串中没有汉字，true串中有汉字
FunctionTools.CheckChinese = function (value) {
    var patern = /^[^\u4E00-\u9FA5]*$/;
    return !patern.test(value);
}

//提示textarea输入的字符数
FunctionTools.CheckNum = function (obj, elementID, maxLength) {
    document.getElementById(elementID).innerHTML = "当前输入" + FunctionTools.GetNvarcharStringLength(obj.value.Trim()) + "/" + maxLength + "个字符";
}

//如果串中有汉字，则编码，否则不编码
FunctionTools.GetUrlEncode = function (value) {
    if (FunctionTools.CheckChinese(value)) {
        value = encodeURI(value);
    }

    return value;
}

//返回value的长度，双字节字符替换为'**',保存类型为varchar类型
FunctionTools.GetStringLength = function (value) {
    value.replace(/[^\x00-\xff]/g, '**')
    return value.length;
}

//返回value的长度，双字节字符替换为'*',保存为nvarchar类型
FunctionTools.GetNvarcharStringLength = function (value) {
    value.replace(/[^\x00-\xff]/g, '*');
    return value.length;
}

String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//************************************************************************************************************
//************************************************************************************************************
//****************************************Enterprise Class****************************************************
//************************************************************************************************************
//************************************************************************************************************

var Enterprise = {
    Version: "1.0",
    Develop: "SJ Enterprise Function",

    SelectValue: -1,

    ModifyModule: function (id, module) { },
    ModifyAdmin: function (id, fname) { },
    ModifyAdminPart: function (id, fname) { },

    CheckModule: function () { },
    CheckAdmin: function () { },
    CheckMember: function () { },
    CheckNews: function () { },
    CheckNewsClass: function () { },
    CheckMessage: function () { },
    CheckSeo: function () { },

    CheckAdminName: function (value) { },
    CheckMemberName: function (value) { },

    DeleteModule: function () { },
    DeleteAdmin: function () { },
    DeleteMember: function () { },
    DeleteNews: function () { },
    DeleteNewsClass: function () { },
    DeleteMessage: function () { },
    DeleteSeo: function () { },

    GetDeleteModule: function (objXml) { },
    GetDeleteAdmin: function (objXml) { },
    GetDeleteMember: function (objXml) { },
    GetDeleteNews: function (objXml) { },
    GetDeleteNewsClass: function (objXml) { },
    GetDeleteMessage: function (objXml) { },
    GetDeleteSeo: function (objXml) { },

    GetCheckAdminName: function (objXml) { },
    GetCheckMemberName: function (objXml) { },
    GetSubNewsClass: function (objXml, target) { },
    GetCascadeNewsClass: function (objXml, target, dvalue, dselect) { },

    SearchMember: function () { },
    SearchNewsClass: function () { },
    SearchNews: function () { },
    SearchMessage: function () { },
    SearchSeo: function () { },

    IniMemberIndex: function () { },
    IniNewsClass: function () { },
    IniNews: function () { },
    IniNewsEdit: function () { },
    IniMessage: function () { },

    OnSelectNewsClass: function (value, target) { },
    OnCascadeNewsClass: function (value, target, dvalue, dselect) { }
};


//************************************************************************************************************
//****************************************Modify Block********************************************************
//************************************************************************************************************
//修改模块数据，为各输入框加载数据

Enterprise.ModifyModule = function (id, module) {
    var name = document.getElementById("t_name_" + id).innerHTML;
    var url = document.getElementById("t_url_" + id).innerHTML;
    var key = document.getElementById("t_key_" + id).innerHTML;
    var desc = document.getElementById("t_desc_" + id).innerHTML;
    var sort = document.getElementById("t_sort_" + id).innerHTML;
    var time = document.getElementById("t_time_" + id).innerHTML;

    document.getElementById("number").innerHTML = id;
    document.getElementById("hid").value = id;
    document.getElementById("brief").value = name;
    document.getElementById("alias").value = module;
    document.getElementById("sort").value = sort;
    document.getElementById("url").value = url;
    document.getElementById("update").innerHTML = time;
    document.getElementById("keyword").value = key;
    document.getElementById("desc").value = desc;

    document.getElementById("btnSave").disabled = true;
    document.getElementById("btnModify").disabled = false;
    document.getElementById("btnDelete").disabled = false;
}

//保存管理员编辑，验证数据输入的完整性
Enterprise.ModifyAdmin = function (id, fname) {
    var name = document.getElementById("t_name_" + id).innerHTML.Trim();
    var sex = document.getElementById("t_sex_" + id).innerHTML.Trim();
    var phone = document.getElementById("t_phone_" + id).innerHTML.Trim();
    var tel = document.getElementById("t_tel_" + id).innerHTML.Trim();
    var email = document.getElementById("t_email_" + id).innerHTML.Trim();
    var ltime = document.getElementById("t_ltime_" + id).innerHTML.Trim();
    var llogin = document.getElementById("t_llogin_" + id).innerHTML.Trim();
    var lip = document.getElementById("t_lip_" + id).innerHTML.Trim();
    var cpass = document.getElementById("t_cpass_" + id).innerHTML.Trim();
    var time = document.getElementById("t_time_" + id).innerHTML.Trim();
    var status = document.getElementById("t_status_" + id).innerHTML.Trim();
    var pass = document.getElementById("t_hpass_" + id).value;
    var module = document.getElementById("t_module_" + id).value;

    document.getElementById("number").innerHTML = id;
    document.getElementById("hid").value = id;
    document.getElementById("ename").value = name;
    document.getElementById("cname").value = fname;
    document.getElementById("pass").value = pass;
    document.getElementById("hpass").value = pass;
    document.getElementById("passr").value = pass;
    document.getElementById("phone").value = phone;
    document.getElementById("tel").value = tel;
    document.getElementById("email").value = email;
    document.getElementById("logintime").innerHTML = ltime;
    document.getElementById("cpasstime").innerHTML = cpass;
    document.getElementById("lastlogin").innerHTML = llogin;
    document.getElementById("lastip").innerHTML = lip;

    FunctionTools.ClearCheckBox("chk_module");
    FunctionTools.SetCheckBoxChecked("chk_module", module);

    if (sex == "女") {
        document.getElementById("gender")[1].selected = true;
    }
    else {
        document.getElementById("gender")[0].selected = true;
    }

    if (status.indexOf("禁用") > -1) {
        document.getElementById("status")[1].selected = true;
    }
    else {
        document.getElementById("status")[0].selected = true;
    }

    document.getElementById("btnSave").disabled = true;
    document.getElementById("btnModify").disabled = false;
    document.getElementById("btnDelete").disabled = false;
}

Enterprise.ModifyAdminPart = function (id, fname) {
    var name = document.getElementById("t_name_" + id).innerHTML.Trim();
    var sex = document.getElementById("t_sex_" + id).innerHTML.Trim();
    var phone = document.getElementById("t_phone_" + id).innerHTML.Trim();
    var tel = document.getElementById("t_tel_" + id).innerHTML.Trim();
    var email = document.getElementById("t_email_" + id).innerHTML.Trim();
    var ltime = document.getElementById("t_ltime_" + id).innerHTML.Trim();
    var llogin = document.getElementById("t_llogin_" + id).innerHTML.Trim();
    var lip = document.getElementById("t_lip_" + id).innerHTML.Trim();
    var cpass = document.getElementById("t_cpass_" + id).innerHTML.Trim();
    var time = document.getElementById("t_time_" + id).innerHTML.Trim();
    var status = document.getElementById("t_status_" + id).innerHTML.Trim();
    var pass = document.getElementById("t_hpass_" + id).value;

    document.getElementById("number").innerHTML = id;
    document.getElementById("hid").value = id;
    document.getElementById("ename").value = name;
    document.getElementById("cname").value = fname;
    document.getElementById("pass").value = pass;
    document.getElementById("hpass").value = pass;
    document.getElementById("passr").value = pass;
    document.getElementById("phone").value = phone;
    document.getElementById("tel").value = tel;
    document.getElementById("email").value = email;
    document.getElementById("logintime").innerHTML = ltime;
    document.getElementById("cpasstime").innerHTML = cpass;
    document.getElementById("lastlogin").innerHTML = llogin;
    document.getElementById("lastip").innerHTML = lip;

    if (sex == "女") {
        document.getElementById("gender")[1].selected = true;
    }
    else {
        document.getElementById("gender")[0].selected = true;
    }

    if (status.indexOf("禁用") > -1) {
        document.getElementById("status")[1].selected = true;
    }
    else {
        document.getElementById("status")[0].selected = true;
    }

    document.getElementById("btnSave").disabled = true;
    document.getElementById("btnModify").disabled = false;
    document.getElementById("btnDelete").disabled = false;
}


//************************************************************************************************************
//****************************************Check Block Without Param*******************************************
//************************************************************************************************************

//保存输入时，验证输入数据的完整性
Enterprise.CheckModule = function () {
    var suc = true;
    var hint = null;
    var patrn = /^([0-9]|[1-9][0-9]*)$/;

    var name = document.getElementById("brief").value.Trim();
    var alias = document.getElementById("alias").value.Trim();
    var sort = document.getElementById("sort").value.Trim();
    var url = document.getElementById("url").value.Trim();
    var keyword = document.getElementById("keyword").value.Trim();
    var desc = document.getElementById("desc").value.Trim();

    if (name == "") {
        suc = false;
        hint = "请输入模块简称";
    }
    else if (alias == "") {
        suc = false;
        hint = "请输入模块名称";
    }
    else if (sort == "") {
        suc = false;
        hint = "请输入排序值";
    }
    else if (!patrn.test(sort)) {
        suc = false;
        hint = "排序值需为正整数";
    }
    else if (url == "") {
        suc = false;
        hint = "请输入模块首页链接";
    }
    else if (keyword == "") {
        suc = false;
        hint = "请输入模块首页SEO关键字";
    }
    else if (desc == "") {
        suc = false;
        hint = "模块首页SEO描述";
    }

    if (!suc) {
        alert(hint);
    }

    return suc;
}

Enterprise.CheckAdmin = function () {
    var suc = true;
    var hint = null;
    var ename = document.getElementById("ename").value.Trim();
    var cname = document.getElementById("cname").value.Trim();
    var jsame = document.getElementById("hsame").value;

    var pass1 = document.getElementById("pass").value.Trim();
    var pass2 = document.getElementById("passr").value.Trim();

    var phone = document.getElementById("phone").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("email").value;

    if (ename == "") {
        suc = false;
        hint = "请输入英文名";
    }
    else if (jsame == "0") {
        suc = false;
        hint = "该用户名已经存在";
    }
    else if (cname == "") {
        suc = false;
        hint = "请输入中文名";
    }
    else if (pass1 == "" || pass2 == "") {
        suc = false;
        hint = "请检查密码输入";
    }
    else if (pass1 != pass2) {
        suc = false;
        hint = "两次输入密码不一致，请返回检查";
    }
    else if (phone == "") {
        suc = false;
        hint = "请输入手机号";
    }
    else if (!FunctionTools.CheckMobile(phone)) {
        suc = false;
        hint = "手机号码不合法，请返回检查";
    }
    else if (tel == "") {
        suc = false;
        hint = "请输入固定电话";
    }
    else if (!FunctionTools.CheckMobile(tel)) {
        suc = false;
        hint = "固定电话号码不合法，请返回检查";
    }
    else if (email == "") {
        suc = false;
        hint = "请输入电子邮件地址";
    }
    else if (!FunctionTools.CheckEmail(email)) {
        suc = false;
        hint = "电子邮件地址不合法，请返回检查";
    }

    if (!suc) {
        alert(hint);
    }

    return suc;
}

//保存用户修改，验证数据输入的完整性
Enterprise.CheckMember = function () {
    var suc = true;
    var hint = null;

    var ename = document.getElementById("ename").value.Trim();
    var cname = document.getElementById("cname").value.Trim();
    var mobile = document.getElementById("phone").value.Trim();
    var tel = document.getElementById("tel").value.Trim();
    var fax = document.getElementById("fax").value.Trim();
    var email = document.getElementById("email").value.Trim();
    var pass1 = document.getElementById("pass").value.Trim();
    var pass2 = document.getElementById("passr").value.Trim();
    var postcode = document.getElementById("postcode").value.Trim();
    var same = document.getElementById("hsame").value;

    if (ename == "") {
        suc = false;
        hint = "请输入英文名";
    }
    else if (same != "1") {
        suc = false;
        hint = "该用户名已存在，不能创建";
    }
    else if (cname == "") {
        suc = false;
        hint = "请输入中文名";
    }
    else if (mobile != "" && !FunctionTools.CheckMobile(mobile)) {
        suc = false;
        hint = "手机号码不合法，请返回检查";
    }
    else if (tel != "" && !FunctionTools.CheckMobile(tel)) {
        suc = false;
        hint = "固定电话号码不合法，请返回检查";
    }
    else if (fax != "" && !FunctionTools.CheckMobile(fax)) {
        suc = false;
        hint = "传真号码不合法，请返回检查";
    }
    else if (email == "") {
        suc = false;
        hint = "电子邮件地址不能为空";
    }
    else if (!FunctionTools.CheckEmail(email)) {
        suc = false;
        hint = "电子邮件地址不合法，请返回检查";
    }
    else if (pass1 == "" || pass2 == "") {
        suc = false;
        hint = "密码必须输入两次";
    }
    else if (pass1 != pass2) {
        suc = false;
        hint = "两次输入的密码不一致，请返回检查";
    }
    else if (postcode != "" && !FunctionTools.CheckPostCode(postcode)) {
        suc = false;
        hint = "邮编不合法，请返回检查";
    }

    if (!suc) {
        alert(hint);
    }

    return suc;
}

Enterprise.CheckNews = function () {
    var suc = true;
    var hint = null;

    var newsEdit = CKEDITOR.instances.content;

    var author = document.getElementById("author").value.Trim();
    var title = document.getElementById("title").value.Trim();
    var classid = document.getElementById("sel_third").value;
    var content = newsEdit.getData().Trim();
    var skey = document.getElementById("skey").value.Trim();
    var sdesc = document.getElementById("scontent").value.Trim();

    if (author == "") {
        suc = false;
        hint = "文章作者不能为空";
    }
    if (title == "") {
        suc = false;
        hint = "文章标题不能为空";
    }
    if (classid == "-1") {
        suc = false;
        hint = "只有三级类别才能有文章";
    }
    if (content == "") {
        suc = false;
        hint = "文章内容不能为空";
    }
    if (skey == "") {
        suc = false;
        hint = "SEO关键字不能为空";
    }
    if (sdesc == "") {
        suc = false;
        hint = "SEO描述不能为空";
    }

    if (!suc) {
        alert(hint);
    }

    return suc;
}

Enterprise.CheckNewsClass = function () {
    var suc = true;
    var hint = null;

    var len = FunctionTools.GetNvarcharStringLength(document.getElementById("desc").value.Trim());
    if (len > 400) {
        suc = false;
        hint = "文章类别描述不能超过400，请返回检查";
    }

    if (!suc) {
        alert(hint);
    }

    return suc;
}

Enterprise.CheckMessage = function () {
    var suc = true;
    var hint = null;

    var reply = document.getElementById("rcontent").value.Trim();
    var len = FunctionTools.GetNvarcharStringLength(reply);

    if (reply == "") {
        suc = false;
        hint = "留言回复内容不能为空";
    }
    else if (len > 600) {
        suc = false;
        hint = "留言回复不能超过600，请返回检查";
    }

    if (!suc) {
        alert(hint);
    }

    return suc;
}

Enterprise.CheckSeo = function () {
    var suc = true;
    var hint = null;

    var pname = document.getElementById("pname").value.Trim();
    var skey = document.getElementById("skey").value.Trim();
    var sdesc = document.getElementById("sdesc").value.Trim();

    if (pname == "") {
        suc = false;
        hint = "页面名称不能为空";
    }
    else if (skey == "") {
        suc = false;
        hint = "SEO关键字不能为空";
    }
    else if (sdesc == "") {
        suc = false;
        hint = "SEO描述不能为空";
    }
    else if (FunctionTools.GetNvarcharStringLength(sdesc) > 2000) {
        suc = false;
        hint = "SEO长度不能超过2000";
    }

    if (!suc) {
        alert(hint);
    }

    return suc;
}

//************************************************************************************************************
//****************************************Check Block With Param*******************************************
//************************************************************************************************************

Enterprise.CheckMemberName = function (value) {
    var url = "/aspx/ajax.aspx?type=checkmembername&id=" + document.getElementById("hid").value + "&uname=" + value;
    Ajax(url, "Enterprise.GetCheckMemberName(obj);");
}

Enterprise.CheckAdminName = function (value) {
    var url = "/aspx/ajax.aspx?type=checkadminname&id=" + document.getElementById("hid").value + "&uname=" + value;
    Ajax(url, "Enterprise.GetCheckAdminName(obj);");
}


//************************************************************************************************************
//****************************************Check Block With Param*******************************************
//************************************************************************************************************

Enterprise.GetCheckMemberName = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;
    if (action == "1") {
        document.getElementById("sameMember").innerHTML = "该用户名可用";
        document.getElementById("sameMember").style.display = "";
        document.getElementById("hsame").value = "1";
    }
    else if (action == "0") {
        document.getElementById("sameMember").innerHTML = "该用户名已存在";
        document.getElementById("sameMember").style.display = "";
        document.getElementById("hsame").value = "0";
    }
}


//************************************************************************************************************
//****************************************Delete Block********************************************************
//************************************************************************************************************

Enterprise.DeleteModule = function () {
    if (confirm("确认删除该模块")) {
        var id = document.getElementById("hid").value;
        var url = "/aspx/ajax.aspx?type=dmodule&id=" + id;
        Ajax(url, "Enterprise.GetDeleteModule(obj);");
    }
}

Enterprise.DeleteAdmin = function () {
    if (confirm("确认删除该管理员")) {
        var id = document.getElementById("hid").value;
        var url = "/aspx/ajax.aspx?type=dadmin&id=" + id;
        Ajax(url, "Enterprise.GetDeleteAdmin(obj);");
    }
}

Enterprise.DeleteMember = function () {
    if (confirm("确认删除该用户")) {
        var id = document.getElementById("hid").value;
        var url = "/aspx/ajax.aspx?type=dmember&id=" + id;
        Ajax(url, "Enterprise.GetDeleteMember(obj);");
    }
}

Enterprise.DeleteNews = function () {
    if (confirm("确认删除该文章")) {
        var id = document.getElementById("hid").value;
        var url = "/aspx/ajax.aspx?type=dnews&id=" + id;
        Ajax(url, "Enterprise.GetDeleteNews(obj);");
    }
}

Enterprise.DeleteNewsClass = function () {
    var id = document.getElementById("hid").value;
    var count = parseInt(document.getElementById("hsub").value);

    if (count > 0) {
        alert("该类别有子类，不能删除。");
    }
    else {
        if (confirm("确认删除该类别")) {
            var url = "/aspx/ajax.aspx?type=dnewclass&id=" + id;
            Ajax(url, "Enterprise.GetDeleteNewsClass(obj);");
        }
    }
}

Enterprise.DeleteMessage = function () {
    if (confirm("确认删除该留言")) {
        var id = document.getElementById("hid").value;
        var url = "/aspx/ajax.aspx?type=dmessage&id=" + id;
        Ajax(url, "Enterprise.GetDeleteMessage(obj);");
    }
}

Enterprise.DeleteSeo = function () {
    if (confirm("确认删除该SEO信息")) {
        var id = document.getElementById("hid").value;
        var url = "/aspx/ajax.aspx?type=dseo&id=" + id;
        Ajax(url, "Enterprise.GetDeleteSeo(obj);");
    }
}

//************************************************************************************************************
//****************************************GetAjax Block*******************************************************
//************************************************************************************************************

Enterprise.GetDeleteModule = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;

    if (action == "1") {
        window.parent.frames["main"].location = "/admin/column/index.aspx";
    }
}

Enterprise.GetDeleteAdmin = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;

    if (action == "1") {
        window.parent.frames["main"].location = "/admin/column/manage.aspx";
    }
}

Enterprise.GetDeleteMember = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;

    if (action == "1") {
        window.parent.frames["main"].location = "/admin/member/index.aspx";
    }
}

Enterprise.GetDeleteNews = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;

    if (action == "1") {
        window.parent.frames["main"].location = "/admin/news/index.aspx";
    }
}

Enterprise.GetDeleteNewsClass = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;

    if (action == "1") {
        window.parent.frames["main"].location = "/admin/news/clist.aspx";
    }
}

Enterprise.GetDeleteMessage = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;

    if (action == "1") {
        window.parent.frames["main"].location = "/admin/message/index.aspx";
    }
}

Enterprise.GetDeleteSeo = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;

    if (action == "1") {
        window.parent.frames["main"].location = "/admin/seo/index.aspx";
    }
}

Enterprise.GetCheckAdminName = function (objXml) {
    var action = objXml.getElementsByTagName("action")[0].childNodes[0].nodeValue;
    if (action == "1") {
        document.getElementById("sameAdmin").innerHTML = "该用户名可用";
        document.getElementById("sameAdmin").style.display = "";
        document.getElementById("hsame").value = "1";
    }
    else if (action == "0") {
        document.getElementById("sameAdmin").innerHTML = "该用户名已存在";
        document.getElementById("sameAdmin").style.display = "";
        document.getElementById("hsame").value = "0";
    }
}

Enterprise.GetSubNewsClass = function (objXml, target) {
    var sub = objXml.getElementsByTagName("item");

    document.getElementById(target).options.length = 0;
    document.getElementById(target).options.add(new Option("全部二级类别", "-1"));

    for (var i = 0; i < sub.length; i++) {
        document.getElementById(target).options.add(new Option(sub[i].getAttribute("classname"), sub[i].getAttribute("classid")));
    }

    if (Enterprise.SelectValue != -1) {
        FunctionTools.onSelectSelected(target, Enterprise.SelectValue);
    }
}

Enterprise.GetCascadeNewsClass = function (objXml, target, dvalue, dselect) {
    var sub = objXml.getElementsByTagName("item");

    document.getElementById(target).options.length = 0;
    document.getElementById(target).options.add(new Option(dvalue, "-1"));

    for (var i = 0; i < sub.length; i++) {
        document.getElementById(target).options.add(new Option(sub[i].getAttribute("classname"), sub[i].getAttribute("classid")));
    }

    FunctionTools.onSelectSelected(target, dselect);
}

//************************************************************************************************************
//****************************************Search Block********************************************************
//************************************************************************************************************

Enterprise.SearchMember = function () {
    var uname = document.getElementById("uname").value.Trim();
    var gender = document.getElementById("gender").value;
    var status = document.getElementById("status").value;
    var ts = document.getElementById("txt_from").value;
    var te = document.getElementById("txt_to").value;

    var url = "/admin/member/index.aspx?gender=" + gender;

    if (uname != "") {
        url += "&uname=" + uname;
    }
    if (status != "") {
        url += "&status=" + status;
    }
    if (ts != "") {
        url += "&ts=" + ts;
    }
    if (te != "") {
        url += "&te=" + te;
    }
    window.parent.frames["main"].location = url;
}

Enterprise.SearchNewsClass = function () {
    var url = "/admin/news/clist.aspx?p1=" + document.getElementById("sel_first").value
    + "&p2=" + document.getElementById("sel_second").value;

    var cname = document.getElementById("cname").value.Trim();
    var status = document.getElementById("status").value;

    if (cname != "") {
        url += "&cname=" + FunctionTools.GetUrlEncode(cname);
    }

    if (status != "") {
        url += "&status=" + status;
    }

    window.parent.frames["main"].location = url;
}

Enterprise.SearchNews = function () {
    var url = "/admin/news/index.aspx?c1=" + document.getElementById("sel_first").value
    + "&c2=" + document.getElementById("sel_second").value
    + "&c3=" + document.getElementById("sel_third").value;

    var title = document.getElementById("title").value.Trim();
    var content = document.getElementById("content").value.Trim();
    var author = document.getElementById("author").value.Trim();
    var status = document.getElementById("status").value.Trim();
    var ts = document.getElementById("txt_from").value;
    var te = document.getElementById("txt_to").value;

    if (title != "") {
        url += "&title=" + encodeURI(title);
    }
    if (content != "") {
        url += "&content=" + encodeURI(content);
    }
    if (author != "") {
        url += "&author=" + author;
    }
    if (status != "") {
        url += "&status=" + status;
    }
    if (ts != "") {
        url += "&ts=" + ts;
    }
    if (te != "") {
        url += "&te=" + te;
    }

    window.parent.frames["main"].location = url;
}

Enterprise.SearchMessage = function () {
    var url = "/admin/message/index.aspx?p=1";
    var types = document.getElementById("types").value;
    var status = document.getElementById("status").value;
    var ts = document.getElementById("txt_from").value;
    var te = document.getElementById("txt_to").value;

    if (types != "") {
        url += "&types=" + types;
    }
    if (status != "") {
        url += "&status=" + status;
    }
    if (ts != "") {
        url += "&ts=" + ts;
    }
    if (te != "") {
        url += "&te=" + te;
    }

    window.parent.frames["main"].location = url;
}

Enterprise.SearchSeo = function () {
    var url = "/admin/seo/index.aspx?p=1";
    var page = document.getElementById("tpage").value.Trim();
    var key = document.getElementById("tkey").value.Trim();
    var ts = document.getElementById("txt_from").value;
    var te = document.getElementById("txt_to").value;

    if (page != "") {
        url += "&page=" + encodeURI(page);
    }
    if (key != "") {
        url += "&key=" + encodeURI(key);
    }
    if (ts != "") {
        url += "&ts=" + ts;
    }
    if (te != "") {
        url += "&te=" + te;
    }

    window.parent.frames["main"].location = url;
}


//************************************************************************************************************
//****************************************Init Block**********************************************************
//************************************************************************************************************

Enterprise.IniMemberIndex = function () {
    FunctionTools.SetTextValue("uname", "uname");
    FunctionTools.SetSelectValue("gender", "gender");
    FunctionTools.SetSelectValue("status", "status");
    FunctionTools.SetTextValue("txt_from", "ts");
    FunctionTools.SetTextValue("txt_to", "te");
}

Enterprise.IniNewsClass = function () {
    FunctionTools.SetTextValue("cname", "cname");
    FunctionTools.SetSelectValue("status", "status");

    var p1 = FunctionTools.GetRequestValue(document.URL, "p1");
    var p2 = FunctionTools.GetRequestValue(document.URL, "p2");

    if (p1 == "") {
        p1 = "-1";
    }
    if (p2 == "") {
        p1 = "-1";
    }

    if (p1 != "-1") {
        Enterprise.OnSelectNewsClass(p1, "sel_second");

        FunctionTools.onSelectSelected("sel_first", p1);

        Enterprise.SelectValue = p2;
    }
    else {
        document.getElementById("sel_second").options.length = 0;
        document.getElementById("sel_second").options.add(new Option("全部二级类别", "-1"));
    }
}

Enterprise.IniNews = function () {
    FunctionTools.SetSelectValue("status", "status");

    var c1 = FunctionTools.GetRequestValue(document.URL, "c1");
    var c2 = FunctionTools.GetRequestValue(document.URL, "c2");
    var c3 = FunctionTools.GetRequestValue(document.URL, "c3");

    c1 = c1 == "" ? "-1" : c1;
    c2 = c2 == "" ? "-1" : c2;
    c3 = c3 == "" ? "-1" : c3;

    FunctionTools.onSelectSelected("sel_first", c1);
    if (c1 != "-1") {
        Enterprise.OnCascadeNewsClass(c1, "sel_second", "全部二级类别", c2);
        if (c2 != "-1") {
            Enterprise.OnCascadeNewsClass(c2, "sel_third", "全部三级类别", c3);
        }
    }
}

Enterprise.IniNewsEdit = function () {
    var id = document.getElementById("hid").value;
    var c1 = document.getElementById("hc1").value;
    var c2 = document.getElementById("hc2").value;
    var c3 = document.getElementById("hc3").value;

    FunctionTools.onSelectSelected("sel_status", document.getElementById("hstatus").value);

    if (id == "-1") {
        document.getElementById("btnDelete").disabled = true;
    }
    else {
        FunctionTools.onSelectSelected("sel_first", c1);
        Enterprise.OnCascadeNewsClass(c1, "sel_second", "全部二级类别", c2);
        Enterprise.OnCascadeNewsClass(c2, "sel_third", "全部三级类别", c3);
    }
}

Enterprise.IniMessage = function () {
    FunctionTools.SetSelectValue("types", "types");
    FunctionTools.SetSelectValue("status", "status");
}


//************************************************************************************************************
//****************************************Other Block*********************************************************
//************************************************************************************************************

Enterprise.OnSelectNewsClass = function (value, target) {
    if (value != "-1") {
        var url = "/aspx/ajax.aspx?type=selnewsclass&id=" + value;
        Ajax(url, "Enterprise.GetSubNewsClass(obj, '" + target + "')");
    }
    else {
        document.getElementById(target).options.length = 0;
        document.getElementById(target).options.add(new Option("全部二级类别", "-1"));
    }
}

Enterprise.OnCascadeNewsClass = function (value, target, dvalue, dselect) {
    if (value != "-1") {
        var url = "/aspx/ajax.aspx?type=selnewsclass&id=" + value;
        Ajax(url, "Enterprise.GetCascadeNewsClass(obj, '" + target + "','" + dvalue + "','" + dselect + "')");
    }
    else {
        document.getElementById(target).options.length = 0;
        document.getElementById(target).options.add(new Option(dvalue, "-1"));
    }

    if (target.indexOf("second") > -1) {
        document.getElementById("sel_third").options.length = 0;
        document.getElementById("sel_third").options.add(new Option("全部三级类别", "-1"));
    }
}
