 //返回顶部
 $('.go2top').on('click',function(){
 	ycf.b2top();
});
$('.history_back').each(function () {
    $(this).attr("href", "javascript:history.back()");
    if (history.length <=2) { $(this).attr("href", "index.html"); }
})

 $('.history_back').on('click',function(){
      ycf.historyBack();
 });

//全屏显示
window.onload = function () {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
        bodyTag = document.getElementsByTagName('body')[0];
        bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';
    }
    setTimeout(function () {
        window.scrollTo(0, 1)
    }, 0);
};

//input的清空按钮功能
function EmptyInput() {
    $(".icon_close").each(function (i, item) {
        $(item).hide();
        $(item).siblings('input').each(function (key, value) {
            $(value).on('focus', function () {
                $(".icon_close").each(function (n, val) {
                    $(val).hide();
                })
                $(item).show();
            })
            $(value).on('blur', function () {
                $(item).on('click', function () {
                    $(item).siblings('input').val('');
                });
                setTimeout(function () { $(item).hide(); }, 200);
            })
        });
    });
}
//登陆，注册，修改密码等页面获取数据
function GetInputData(element,valide) {
    //验证提交数据
    var data, inputs, input, ltype;
    var RegPhone = /^(13[0-9]|15[0|3|6|7|8|9]|18[5|6|8|9])\d{8}$/;
    var RegPs = /[a-zA-Z0-9\.]{6,}/;
    var RegEmail = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i;
    data = {};
    inputs = $(".login_inputs .input");
    $.each(inputs, function (i, item) {
        input = $(item).find("input");
        if (valide == undefined) { 
            if (input.val() == '') {
                if (input.attr('placeholder') == '确认密码和密码不相同') {
                    return;
                }
                input.attr('placeholder', '必填信息不能为空');
            };
        }
        if (input.attr("ltype") == 'phone') {
            if (!RegPhone.test(input.val())) {
                input.val('');
                input.attr('placeholder', '请填写正确的手机号码');
            };
        };
        if (input.attr("ltype") == 'ps' || input.attr("ltype") == 'password') {
            if (!RegPs.test(input.val())) {
                input.val('');
                input.attr('placeholder', '密码不能少于6个字符');
            };
        };
        if (input.attr("ltype") == 'password') {
            var pwd = input.val();
            var comfirmPwd = input.parent().next().find('input');
            if (pwd.toString() !== comfirmPwd.val().toString()) {
                comfirmPwd.attr('placeholder', '确认密码和密码不相同');
                comfirmPwd.val('');
                input.val('');
            };
        };
        if (input.attr("ltype") == 'Email') {
            if (!RegEmail.test(input.val())) {
                input.val('');
                input.attr('placeholder', '请输入正确的邮箱');
            };
        }
        //把数据生成json对象
        if (element) {
            if (input.parent().parent().hasClass(element)) {
                if (input.attr("ltype") != null || input.attr("ltype") != "undefined") {
                    ltype = input.attr("ltype");
                }
                if (ltype) {
                    data[ltype] = input.val();
                };
            }
        } else {
            if (input.attr("ltype") != null || input.attr("ltype") != "undefined") {
                ltype = input.attr("ltype");
            }
            if (ltype) {
                data[ltype] = input.val();
            };
        }
    });
    return data;
};

//判断对象的成员是否有空成员
function IsEnptyObject(obj) {
    for (var o in obj) {
        if (obj[o] == '') {
            return true;
        }
    }
};
//退出登录
$(".exit").each(function (i, item) {
    $(item).on('click', function () {
        ycf.storage.remove("SecurityKey");
        ycf.storage.remove("Name");
        ycf.storage.remove("Email");
        ycf.storage.remove("Phone");
        document.location = "index.html";
    });
});
var LoginCookie = ycf.storage.get("SecurityKey");
if (LoginCookie == "") {
    var loginout = setTimeout(function () { document.location = "login.html"; }, 1);
    clearTimeout(loginout);
}
//判断是否登录并跳转页面
function IsLogin(url) {
    var LoginCookie = ycf.storage.get("SecurityKey");
    if (LoginCookie != '' && LoginCookie!=undefined) {
          document.location = (url != null) ?  url : "index.html";
          return true;
      } else {
          document.location = "login.html";
          return false;
      }
  };

//获取登录状态作为全局变量来使用
  function LoginSecurityKey() {
      DataSecurityKey = { 'SecurityKey': ycf.storage.get("SecurityKey") };
     return DataSecurityKey;
  }
//未登录前，点击用户中心的入口处理
  $(".my_order a").on('click', function () {
      IsLogin('orders.html');
  });
  $(".user").on('click', function () {
      IsLogin('user_center.html');
  });
  $(".cart").on('click', function () {
      IsLogin('orders.html');
  });
  //判断登录状态后显示我的订单
  if (ycf.storage.get("SecurityKey") != null && ycf.storage.get("SecurityKey") != '') {
    $("footer").find(".login").find("a").html('<span>我的订单</span>');
    $("footer").find(".login").find("a").attr("href", "user_center.html");
}else{
    $("footer").find(".login").find("a").html('<span>登录</span>');
    $("footer").find(".login").find("a").attr("href", "login.html");
}

//获取URL中的参数
function GetRequest() {
    var url = location.search; 
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


/**
 * 通过日期获取星期的中文显示
 * @param  {string} dateStr 格式如:2013-8-8
 * @return {string}         星期的中文格式
 */
function weekDay(dateStr){
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        myDate = new Date(Date.parse(dateStr.replace(/-/g, "default.htm"))); 
    return weekDay[myDate.getDay()];
}



/**
 * 格式化日期调用方法为：var d =new Date().format('yyyy-MM-dd');
 * @param  {string} format 格式字符串
 * @return {string}        yyyy-MM-dd返回此格式的日期
 */
Date.prototype.format =function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
//iphone在页面底部显示客户端下载链接
var ua = (navigator.userAgent || navigator.vendor || window.opera);
if (ua != null) {
    var loadsystem = $('<a class="loadsystem"><img class="system" /></a>');
    var uaName = ua.toLowerCase();
    
    if (/ip(hone|od)/i.test(uaName)) {
        $('.linkTo').append(' | <a class="go2web appstore" href="../itunes.apple.com/cn/app/yao-chu-fa-lu-xing/id509256354@ls=1&mt=8">客户端</a>')
    }
};

//Web端点击启动app
$('footer ul').after('<div id="openApp"><img src="../cdn1.yaochufa.com/images/mobile/openAppOther.png" width="100%" alt="app下载"></div>');
$('#openApp').on('click', function () {
    var category = 'M版',
        refererHost = 'm.yaochufa.com',
        pageId = "",
        pageName = 'M版',
        refererUrl = window.location.href,
        type = 'downloadapp',
        url = "download.html@from=29";

    if (navigator.userAgent.match(/micromessenger/i)) {
        url = "download.html";
    }
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        //url = "../um0.cn/78R6Xq/default.htm";
        //统计
        ycf.getData('GET', 'util/CTPV', { category: category, refererHost: refererHost, pageId: pageId, pageName: pageName, refererUrl: refererUrl, type: type, url: url }, function (e) {
            //console.log(e)
        });
        setTimeout(function () {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.location = url;
                } else {
                    window.close();
                }
            }, 25);
            window.location = "yaochufa://";
        }, 500);


    } else if (navigator.userAgent.match(/android/i)) {
        //url = "../cdn1.yaochufa.com/download/android/yaochufa.apk#mp.weixin.qq.com";
        //统计
        ycf.getData('GET', 'util/CTPV', { category: category, refererHost: refererHost, pageId: pageId, pageName: pageName, refererUrl: refererUrl, type: type, url: url }, function (e) {
            //console.log(e)
        })
        setTimeout(function () {
            window.location.href = url;
        }, 500);
        //客户端下载链接
        //统计
        //        var state = null;
        //        try {
        //            state = window.open("yaochufa://");
        //        } catch (e) {
        //            console.log(e);
        //        }
        //        if (!!state) {
        //            window.location = "../www.yaochufa.com/download/android/yaochufa.apk"; //客户端下载链接
        //        } else {
        //            window.close();
        //        }
    }

})


/**
* Implements cookie-less JavaScript session variables
* v1.0
*
* By Craig Buckler, Optimalworks.net
*
* As featured on SitePoint.com
* Please use as you wish at your own risk.
*
* Usage:
*
* // store a session value/object
* Session.set(name, object);
*
* // retreive a session value/object
* Session.get(name);
*
* // clear all session data
* Session.clear();
*
* // dump session data
* Session.dump();
*/

if (JSON && JSON.stringify && JSON.parse) var Session = Session || (function () {

    // window object
    var win = window.top || window;

    // session store
    var store = (win.name ? JSON.parse(win.name) : {});

    // save store on page unload
    function Save() {
        win.name = JSON.stringify(store);
    };

    // page unload event
    if (window.addEventListener) window.addEventListener("unload", Save, false);
    else if (window.attachEvent) window.attachEvent("onunload", Save);
    else window.onunload = Save;

    // public methods
    return {

        // set a session variable
        set: function (name, value) {
            store[name] = value;
        },

        // get a session value
        get: function (name) {
            return (store[name] ? store[name] : undefined);
        },

        // clear session
        clear: function () { store = {}; },

        // dump session data
        dump: function () { return JSON.stringify(store); }

    };

})();

//判断对象是否为空
function isEmpty(obj) {
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            return false;
        }
    }
    return true;
}