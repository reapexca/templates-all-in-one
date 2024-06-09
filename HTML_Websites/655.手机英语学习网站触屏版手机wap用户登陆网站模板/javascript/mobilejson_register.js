//Gridsum tracking code begin. -->

(function () {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = (location.protocol == 'https:' ? '../https@ssl./' : '../static./') + 'gridsumdissector.com/js/Clients/GWD-000776-BED611/gs.js';
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(s, firstScript);
})();

//Gridsum tracking code end. -->


$(function () {
    $.ajax({
        type: "GET",
        url: "http://www.enguo.com/checklogin.aspx?callback=?",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.IsSuccess == "yes") {
                $("#hasyslogin").show();
                $("#noyslogin").hide();
                $("#hastflogin").show();
                $("#notflogin").hide();
            }
            else {
                $("#hasyslogin").hide();
                $("#noyslogin").show();
                $("#hastflogin").hide();
                $("#notflogin").show();
            }
        }
    });
})


//判断是否正确的电话
function isMobile(str) {
    var re = /^(13\d{9})|(14\d{9})|(15\d{9})|(18\d{9})$/;
    var ren = /[^\d]+/;
    if (re.test(str) && !ren.test(str))
        return true;
    else
        return false;
}

//是否是手机格式
function isMobileFormat(str) {
    var b = str.substr(0, 1);
    if (b == "1" && str.length == 11)
        return true;
    else
        return false;
}

//下载页面
function goDownloadByUrl(downloadUrl) {
    if (downloadUrl.length == 0) {
        window.location = "";
    }
    var localurl = window.location.href;
    window.location = "../www.enguo.com/" + downloadUrl;

}

//国双统计代码
function _gsCallback(phone) {
    if (window._gsTracker) {
        phone = hex_md5(phone);
        _gsTracker.addOrder(phone, 0, "");
        // 调用trackECom函数发送订单数据
        _gsTracker.trackECom();
    }
}




//国双统计代码
function _gsCallback1(phone) {
    if (window._gsTracker) {
        //phone = hex_md5(phone);
        _gsTracker.addOrder(phone, 0, "");
        // 调用trackECom函数发送订单数据
        _gsTracker.trackECom();
    }
}

function onConsultation() {
    var newEvent = new Image();
    newEvent.src = "../evt.dxpmedia.com/event@id=NDExXzBmNTA3MDAw";

}



function LoadContents(obj) {
    var channelId = $("#hidchannelId").val();
    var hidnum = document.getElementById("hidnum");
   
    if (hidnum) {
        obj = Number($("#hidnum").val()) + 1;
    }
    $.ajax({
        type: "GET",
        url: "../www.enguo.com/GetMobileContent.aspx@callback=@&channelId=" + channelId + "&num=" + obj,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.IsSuccess == "true") {
                $("#contentul").append(result.message);
                var num = result.num;
                if (num > 1) {
                    $("#hidnum").val(num);
                }
            } else if (result.IsSuccess == "nomessage") {
                alert("亲，已经是最后一页喽!");
            }
        }
    });
}


//登录
function CheckMobileLogin() {
    var name = $("#useremail").val();
    var password = $("#userpassword").val();

    if ($("#useremail").val() == "" || $("#useremail").val() == "请输入用户名") {
        alert("用户名不能为空");
        $("#useremail").focus();
        return false;
    }

    if ($("#userpassword").val() == "" || $("#userpassword").val() == "请输入密码") {
        alert("密码不能为空");
        $("#userpassword").focus();
        return false;
    }

    $.ajax({
        type: "GET",
        url: "../www.enguo.com/mobilelogin.aspx@callback=@&Email=" + name + "&Password=" + password,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.IsSuccess == "true") {
                var type = result.type;
                if (type != "") {
                    alert("恭喜您登录成功，现在可以返回首页，下载相关内容。 ");
                    document.location.href = "#" + type;
                } else {
                    alert("登录成功");
                    document.location.href = "./";
                }
            } else if (result.IsSuccess == "no") {
                alert("不存在此用户,请先注册!");
            } else {
                alert("登录失败");
            }
        }
    });
}



//注册
function checkMobileUserReg() {

    var name = $.trim($("#name").val());
    if (name.length == 0 || name == "请输入姓名") {
        alert("对不起，请输入您的姓名！");
        $("#name").val("");
        $("#name").focus();
        return false;
    }
    if (name.length < 2) {
        alert("对不起,姓名应在2个字符以上，请重新输入！");
        return false;

    }
    var abroad = $("#hidabroad").val();

    if (abroad == "true") {
        name += ",true";
    }

    var phone = $.trim($("#phone").val());
    if (phone.length == 0 || phone == "请输入手机号") {
        alert("对不起,请输入联系电话！");
        $("#phone").val("");
        $("#phone").focus();
        return false;
    }

    if (isMobileFormat(phone)) {
        if (isMobile(phone)) {
        } else {
            alert("对不起,请输入正确的电话号码！");
            return false;
        }
    }
    else {
        alert("对不起,请输入正确的手机号码！");
        return false;
    }


    var password = $.trim($("#password").val());
    if (password.length == 0 || password == "请输入密码") {
        alert("对不起,请输入密码！");
        $("#password").val("");
        $("#password").focus();
        return false;
    }


    var message = $("#hidmessage").val();
    var referrerurl = $("#hidreferrerurl").val();
    var paramurl = $("#hidparamurl").val();

    //国双统计代码
    if (window.GridsumWebDissector) {
        var _gsTracker = GridsumWebDissector.getTracker("GWD-000776");
        _gsTracker.track("targetpage/regSuccess" + location.pathname);
    }


    $.ajax({
        type: "GET",
        url: "../www.enguo.com/mobilejson_regsiter.aspx@callback=@&Name=" + name + "&Phone=" + phone + "&password=" + password + "&Message=" + message + "&Referrerurl=" + referrerurl + "&Paramurl=" + paramurl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.IsSuccess == "true") {
                $("#name").val("请输入姓名");
                $("#phone").val("请输入手机号");
                $("#password").val("请输入密码");
                
                var type = result.type;
	
                if (type != "") {
                    alert("恭喜您注册成功，现在可以返回首页，下载相关内容。 ");
                    document.location.href = "#" + type;
                } else {
                    alert("您已注册成功，我们的客服将尽快与您联系，并邀请您来的美联英语学习中心体验我们的课程!");
                    document.location.href = "./";
                }
		_gsCallback(phone);

            } else if (result.IsSuccess == "common") {
                alert("存在相同的手机号，请重新输入!");
                return false;
            } else {
                alert("注册失败!");
            }
        }
    });
}


//发送验证码
function SendCode() {
    var mobile = $("#mobile").val();
    if (mobile == "" || mobile == "请输入手机号") {
        alert("手机号码不能为空!");
        $("#mobile").focus();
        return false;
    }

    curCount = 60;
    var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
    if (!reg.test(mobile)) {
        //alert("手机号码格式不对");
        alert('手机号码格式不对', null, null, null, null);
        return false;
    }
    $.ajax({
        type: "GET",
        url: "../www.enguo.com/sendcode.aspx@callback=@&mobile=" + mobile,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.IsSuccess == "true") {
                alert("验证码已发送到您手机上，请输入验证码进行注册!");
                SetRemainTime();
                InterValObj = window.setInterval(SetRemainTime, 1000);
            } else if (result.IsSuccess == "nomobile") {
                alert("不存在此手机号，请注册");
                return false;
            } else {
                alert("验证码未能发送成功，请稍后再试!");
                return false;
            }
        }
    });
}



function SetRemainTime() {
    if (curCount == 0) {
        //停止计时器         
        window.clearInterval(InterValObj);
        //启用按钮     
        $("#btncode").removeAttr("disabled");
        $("#message").html("若您未收到短信，请重新发送验证码");
    } else {
        $("#btncode").attr("disabled", "disabled");
        $("#message").html("请在" + curCount + "秒内输入验证码");
        curCount--;
    }
}

//修改密码
function UpdatePassword() {
    var mobile = $("#mobile").val();
    var code = $("#mobilecode").val();
    var psd = $("#newpassword").val();
    if (mobile == "" || mobile == "请输入手机号") {
        alert("请输入手机号!");
        return false;
    }
    if (code == "" || code == "请输入验证码") {
        alert("请输入验证码!");
        return false;
    }
    if (psd == "" || psd == "请输入新密码") {
        alert("请输入密码!");
        return false;
    }
    $.ajax({
        type: "GET",
        url: "../www.enguo.com/mobilefogetpassword.aspx@callback=@&mobile=" + mobile + "&code=" + code + "&password=" + psd,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if (result.IsSuccess == "true") {

                alert("密码修改成功!");
                $("#mobile").val("");
                $("#mobilecode").val("");
                $("#newpassword").val("");
                window.location.href = "login.html";

            } else if (result.IsSuccess == "wrong") {
                alert("验证码输入错误，请重新输入!");
                $("#code").focus();
                return false;
            } else {
                alert("密码修改失败!");
            }
        }
    });
}




var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */

/* 
* These are the functions you'll usually want to call 
* They take string arguments and return either hex or base-64 encoded strings 
*/
function hex_md5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); }
function b64_md5(s) { return binl2b64(core_md5(str2binl(s), s.length * chrsz)); }
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }

/* Backwards compatibility - same as hex_md5() */
function calcMD5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); }

/* 
* Perform a simple self-test to see if the VM is working 
*/
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/* 
* Calculate the MD5 of an array of little-endian words, and a bit length 
*/
function core_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

/* 
* These functions implement the four basic operations the algorithm uses. 
*/
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/* 
* Calculate the HMAC-MD5, of a key and some data 
*/
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

/* 
* Add integers, wrapping at 2^32. This uses 16-bit operations internally 
* to work around bugs in some JS interpreters. 
*/
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/* 
* Bitwise rotate a 32-bit number to the left. 
*/
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

/* 
* Convert a string to an array of little-endian words 
* If chrsz is ASCII, characters >255 have their hi-byte silently ignored. 
*/
function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

/* 
* Convert an array of little-endian words to a hex string. 
*/
function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

/* 
* Convert an array of little-endian words to a base-64 string 
*/
function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
| (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
| ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
} 

