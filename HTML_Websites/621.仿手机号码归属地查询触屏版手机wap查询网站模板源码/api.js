function $(objID) { return document.getElementById(objID); }
function selmobtext() { $('m').select(); $('m').focus(); }
function query() {
    // 如果为空，显示错误并返回
    if ($("m").value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        $("txtError").innerHTML = "请输入手机号码。";
        $("panelResult").style.display = $("panelNotice").style.display = "none"; $("panelError").style.display = "block";
        selmobtext();
        return false;
    }

    // 读取归属数据，成功后调用 querycallback 函数
    var oHead = document.getElementsByTagName('head')[0];
    var oTar = document.getElementById("remotejs");

    if (oTar) oHead.removeChild(oTar);

    var oScript = document.createElement('script');
    oScript.type = "text/javascript";
    oScript.id = "remotejs";
    oScript.src = "http://jixiong.showji.com/api.aspx?m=" + escape($("m").value) + "&output=json&callback=querycallback";

    oHead.appendChild(oScript);

    return false;
}
function querycallback(obj) {
    // 检查是否成功获取手机归属信息
    if (obj == null) {
        $("txtError").innerHTML = "您输入的号码格式有误，请重新输入。";
        $("panelResult").style.display = $("panelNotice").style.display = "none"; $("panelError").style.display = "block";
    }
    else {
        // 显示查询到的归属信息
        if ($("txtMobile") != null) $("txtMobile").innerHTML = obj["Mobile"];
        if ($("txtJX") != null) $("txtJX").innerHTML = obj["JX"];
        if ($("txtJXDetail") != null) $("txtJXDetail").innerHTML = obj["JXDetail"];
        if ($("txtGX") != null) $("txtGX").innerHTML = obj["GX"];
        if ($("txtGXDetail") != null) $("txtGXDetail").innerHTML = obj["GXDetail"];

        if ($("panelResult").style.display != "block")
        { $("panelError").style.display = $("panelNotice").style.display = "none"; $("panelResult").style.display = "block"; }
    }
    selmobtext();
}

function QueryString(name) {
    var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)"), r;
    if (r = window.location.search.match(reg)) return unescape(r[2]);
    return "";
}

if (typeof(strMobile) == 'undefined') strMobile = QueryString("m");
if (strMobile.length > 0) { $("m").value = strMobile; query(); }
selmobtext();