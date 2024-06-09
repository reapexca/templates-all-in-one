if ($("#btnSLKey")) {
    $("#btnSLKey").click(function () {
        if ($("#divSLKey").css("display") == "none") {
            $("#divSLKey").show();
        } else {
            $("#divSLKey").hide();
        }
    });
}

if ($('#newkeyword')) {
    var emptyText = '请输入商品名称';
    var jItem = $('#newkeyword');
    if (jItem.val() == '') {
        jItem.val(emptyText);
    }
    jItem.focus(function () {
        if (jItem.val() == emptyText) {
            jItem.val('');
        }
    }).blur(function () {
        if (jItem.val() == '' || jItem.val() == emptyText) {
            jItem.val(emptyText);
        } else {
        }
    });
}

function cancelHotWord() {
    $("#newkeyword").val("");
    $("#newkeyword").focus();
}

function pageBack() {
    var a = window.location.href;
    if (/#top/.test(a)) {
        window.history.go(-2);
        window.location.load(window.location.href);
    } else {
        window.history.back();
        window.location.load(window.location.href);
    }
}

(function(a) {
    var b = function() {
        var h = $(a).height();
        var g = $("img[imgsrc]");
        var f = $(a).scrollTop();
        for (var d = 0,
            c = g.size(); d < c; d++) {
            var currentObj = $(g[d]);
            var e = currentObj.offset().top - h - 0;
            if (parseInt(f) >= parseInt(e)) {
                currentObj.attr("src", currentObj.attr("imgsrc"));
                currentObj.removeAttr("imgsrc");
            }
        }
    };
    $(function() {
        b();
    });
    a.onscroll = b;
    a.onresize = b;
})(window);

function addQty(maxQty) {
    var qty = $('#qty').val() - 0 + 1;
    if (qty > maxQty)
        qty = maxQty;
    $('#qty').val(qty);
}

function reduQty() {
    var qty = $('#qty').val() - 0 - 1;
    if (qty <= 0)
        qty = 1;
    $('#qty').val(qty);
}

var regex = {
    decmal: "^\\d*\\.?\\d{1,}$",
    decmal1: "(?:^-\\d*\\.?\\d{1,}$)|^0$",
    intege: "^-?[1-9]\\d*$",
    intege1: "^[1-9]\\d*$",
    intege2: "^-[1-9]\\d*$",
    num: "(?:^[1-9]\\d*$)|^0$",
    num1: "(?:^-[1-9]\\d*$)|^0$",
    ascii: "^[\\x00-\\xFF]+$",
    chinese: "^[\\u4e00-\\u9fa5]+$",
    color: "^[a-fA-F0-9]{6}$",
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",
    letter: "^[A-Za-z]+$",
    letter_l: "^[a-z]+$",
    letter_u: "^[A-Z]+$",
    mobile: "(?:^(?:13|15|18|14)[0-9]{9}$)|(?:^189(\\d{8})+$)",
    notempty: "^\\S+$",
    password: "^[A-Za-z0-9_-]+$",
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",
    qq: "^[1-9]*[1-9][0-9]*$",
    args: "^[&|?]?.*=([^&?]*)&$",
    rar: "(.*)\\.(rar|zip|7zip|tgz)$",
    tel: "(?:^[0-9]{3,4}\-[0-9]{7,8}$)|(?:^[0-9]{7,8}$)",
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$",
    deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
    time: "^((\\d{4}-)(0?[1-9]|1[0-2])-(0?[1-9]|[1-2][0-9]|3[0-1])\\s(([0-1]?[0-9])|(2[0-3])):([0-5]?[0-9])(:[0-5]?[0-9])?)$",
    zipcode: "^\\d{6}$",
    trim: function (chars) {
        chars += "";
        return chars.replace(/(^\s*)|(\s*$)/g, "");
    },
    charTotal: function (chars) {
        var k = 0;
        chars = this.trim(chars);
        for (var i = 0; i < chars.length; i++) {
            if (chars.charCodeAt(i) > 255) {
                k += 2;
            } else {
                k += 1;
            }
        }
        return k;
    },
    isNull: function (chars) {
        if (chars == null) return true;
        if (this.trim(chars).length == 0) return true;
        return false;
    },
    isAcc: function (chars) {
        return new RegExp(this.username).test(this.trim(chars));
    },
    isTime: function (chars) {
        return new RegExp(this.time).test(this.trim(chars));
    },
    isPwd: function (chars) {
        return new RegExp(this.password).test(this.trim(chars));
    },
    isEmail: function (chars) {
        return new RegExp(this.email).test(this.trim(chars));
    },
    isTel: function (chars) {
        return new RegExp(this.tel).test(this.trim(chars));
    },
    isMobile: function (chars) {
        return new RegExp(this.mobile).test(this.trim(chars));
    },
    isNum: function (chars) {
        return new RegExp(this.num).test(this.trim(chars));
    },
    isNum1: function (chars) {
        return new RegExp(this.intege1).test(this.trim(chars));
    },
    isDecimal: function (chars) {
        return new RegExp(this.decmal).test(this.trim(chars));
    },
    isDecimal1: function (chars) {
        return new RegExp(this.decmal1).test(this.trim(chars));
    },
    isDeptName: function (chars) {
        return new RegExp(this.deptname).test(this.trim(chars));
    },
    isChinese: function (chars) {
        return new RegExp(this.chinese).test(this.trim(chars));
    },
    isZip: function (chars) {
        return new RegExp(this.zipcode).test(this.trim(chars));
    },
    isArgs: function (chars) {
        return new RegExp(this.args).test(this.trim(chars));
    },
    isUrl: function (chars) {
        return new RegExp(this.url).test(this.trim(chars));
    },
    delQuery: function (val) {
        var len = arguments.length;
        var uri = len > 1 ? arguments[1] : window.location.search;
        //uri = window.location.pathname + uri;
        var re = new RegExp("[&|?]?" + val + "=([^&?]*)[&]?", "ig");
        if (uri.match(re)) {
            val = uri.match(re)[0];
            if (val.indexOf('?') != -1) {
                if (uri.length > val.length) return uri.replace(uri.match(re)[0], '?');
                else return uri.replace(uri.match(re)[0], '');
            } else {
                if (regex.isArgs(val)) return uri.replace(uri.match(re)[0], '&');
                else return uri.replace(uri.match(re)[0], '');
            }
        } else return uri;
    },
    getQuery: function (val) {
        var len = arguments.length;
        var uri = len > 1 ? arguments[1] : window.location.search;
        var re = new RegExp("[&?]+" + val + "=([^&?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 2)) : '');
    }
};