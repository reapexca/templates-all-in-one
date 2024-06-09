var Shouliwang = {};

/**
 * 判断浏览器是否为微信浏览器，并且版本是5.0以上版本 
 */
Shouliwang.is_weixin = function () {
    //Mozilla/5.0(iphone;CPU iphone OS 5_1_1 like Mac OS X) AppleWebKit/534.46(KHTML,likeGeocko) Mobile/9B206 MicroMessenger/5.0
    var ua = navigator.userAgent.toLowerCase();

    var rwx = /.*(micromessenger)\/([\w.]+).*/;
    var match = rwx.exec(ua);
    if (match) {
        if (match[1] === 'micromessenger' && parseFloat(match[2]) >= 5) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

if (!Shouliwang.is_weixin()) {
    isPay = true;
}




var ajaxUrl = "ShoppingCart.html";
var isHaveAjaxServer = false;
var isSubmit = true;
var websiteCookie = 'mobile_WebSiteCookie';
var domain = '';
var msgAlert = '';

//设置皮肤
function ChangeBuyStyle(obj) {
    var control = $(obj);
    UpdatePickUpType(control.val());
    calllBack(obj);
}

function calllBack(obj) {
    $.ajax({
        url: ajaxUrl + "@callBack=getshoppingcart&d=" + new Date(),
        success: function (msg) {
            showShoppingCart(msg);
        }
    });
}

var cookie = {
    set: function (key, value, options) {
        options = options || {};
        $.cookie(key, value, options);
    },
    get: function (key) {
        return $.cookie(key);
    },
    del: function (key) {
        var expires = new Date();
        expires.setTime(expires.getTime() - 1);
        var value = this.get(key);
        document.cookie = key + "=" + value + ";expires=" + expires.toGMTString();
    }
};

function SetWebsiteModelCookie(websiteModel) {
    cookie.set(websiteCookie, JSON.stringify(websiteModel), { expires: 30, path: 'default.htm', domain: domain });
}
function UpdatePickUpType(pickUpType) {
    var websiteModel = GetWebsiteModel();
    if (regex.isNum(pickUpType)) {
        websiteModel.PickUpType = pickUpType;
    }
    SetWebsiteModelCookie(websiteModel);
}

function GetWebsiteModel() {
    var websiteModel;
    try {
        websiteModel = JSON.parse(cookie.get(websiteCookie));
        if (!websiteModel.hasOwnProperty("IsFirstRecord")) {
            websiteModel.IsFirstRecord = true;
        }
    } catch (ex) {
        websiteModel = { "BranchSysNo": 1, "PickUpType": 1, "IsFirstRecord": true };
    }
    return websiteModel;
}


function checknumber(String) {
    if (trimTxt(String) == "") {
        return false;
    }
    var Letters = "1234567890";
    var i;
    var c;
    for (i = 0; i < String.length; i++) {
        c = String.charAt(i);
        if (Letters.indexOf(c) == -1) {
            return false;
        }
    }
    return true;
}

function trimTxt(txt) {
    return txt.replace(/(^\s*)|(\s*$)/g, "");
}

//格式话金额
function fmoney(s, n)//将数字转换成逗号分隔的样式,保留两位小数s:value,n:小数位数     
{
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
    }
    return t.split("").reverse().join("") + "." + r;
}