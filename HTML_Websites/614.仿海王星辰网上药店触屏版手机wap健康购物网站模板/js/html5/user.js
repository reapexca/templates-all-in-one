var validateRegInfoAjax = function (a, b, d, c) {
    $.post("regValidate", {
        vvalue: a,
        vtype: b
    },
    function (e) {
        c(e, d)
    })
};
var validateCodeAjax = function (c, b, d, a) {
    $.post("validateCode", {
        codeKey: c,
        validateCode: b
    },
    function (e) {
        a(e, d)
    })
};
var refreshCodeAjax = function (b, a) {
    $.post(a ? a : "register",
    function (c) {
        b(c)
    })
};
var validateForm = function (a, l) {
    var j = 0;
    var e = true;
    var c = false;
    var k = $("form#" + a + " input,textArea,select");
    var h = l.errorElClass ? l.errorElClass : "error";
    var b = l.errorShowClass ? l.errorShowClass : "errorLabel";
    var g = l.targetEnumId;
    var i = l.tipClass ? l.tipClass : "tipClass";
    var d = l.showTip;
    var f = l.loop;
    $.each(k,
    function () {
        var o = $(this);
        if (g) {
            if (g != o.attr("id")) {
                c = true
            } else {
                c = false
            }
        }
        if (!c) {
            var p = o.attr("reg");
            var v = o.attr("matchFor");
            var w = o.attr("matchForTxt");
            var t = o.attr("regValidityTxt");
            var r = o.attr("notBlank");
            var n = o.attr("valueMissingTxt");
            var y = o.attr("requiredCheck");
            var s = o.attr("requiredCheckTxt");
            var m = o.attr("errorLabel");
            var u = $("#" + m);
            var q = o.val();
            var A = o.attr("tip") ? o.attr("tip") : o.attr("regValidityTxt");
            o.focus(function () {
                u.html("");
                u.removeClass(b);
                o.removeClass(h);
                if (d) {
                    u.addClass(i)
                }
                u.html(A)
            });
            if (y) {
                if (o.is("input radio,input checkbox")) {
                    if (!o.is(":checked")) {
                        commonDo(o, u, s, b, h, d, i);
                        if (!f) {
                            e = false;
                            return
                        }
                        j++
                    }
                }
            }
            if (r) {
                if (q == undefined || q == null || q == "null" || q.trim() == "" || q.trim().length == 0) {
                    commonDo(o, u, n, b, h, d, i);
                    if (!f) {
                        e = false;
                        return
                    }
                    j++
                }
            }
            if (p) {
                var z = new RegExp(p);
                if (!z.test(q)) {
                    commonDo(o, u, t, b, h, d, i);
                    if (!f) {
                        e = false;
                        return
                    }
                    j++
                }
            }
            if (v) {
                var x = $("#" + v);
                if (x && (x.val() != q)) {
                    commonDo(o, u, w, b, h, d, i);
                    if (!f) {
                        e = false;
                        return
                    }
                    j++
                }
            }
        }
    });
    if (f) {
        return !j
    } else {
        return e
    }
};
function commonDo(d, a, g, f, c, e, b) {
    if (a) {
        a.html(g ? g : "");
        a.addClass(f);
        if (e) {
            a.removeClass(b)
        }
    }
    if (c) {
        d.addClass(c)
    }
}
var submitCallBack = function (e) {
    var d = e.errorElClass ? e.errorElClass : "error";
    var g = e.successShowClass ? e.successShowClass : "errorLabel";
    var f = e.targetEnumId ? e.targetEnumId : "error";
    var c = e.error;
    var b = $("#" + f);
    if (b) {
        var h = b.attr("errorLabel");
        var a = $("#" + h);
        commonDo(b, a, c, g, d)
    }
};
var formTipRender = function (d, a) {
    var b = $("form#" + d + " input,textArea,select");
    var c = a ? a : "tipClass";
    $.each(b,
    function () {
        var e = $(this);
        var f = e.attr("tipShowLabel") ? e.attr("tipShowLabel") : e.attr("errorLabel");
        var g = e.attr("tip") ? e.attr("tip") : e.attr("regValidityTxt");
        e.focus(function () {
            if (f) {
                var h = $("#" + f);
                if (h) {
                    h.removeClass();
                    h.addClass(c)
                }
                h.html(g)
            }
        });
        e.blur(function () {
            var h = $("#" + f);
            if (f && h.hasClass(c)) {
                h.html("")
            }
        })
    })
};