$(function () {
    var e = parseInt($(".name1").css("font-size")) / 2;
    var c = parseInt($(".name2").css("font-size")) / 2;
    a();
    window.onresize = a;
    function a() {
        if (c) {
            g()
        } else {
            f()
        }
    }
    function g() {
        for (var h = 0; h < $("li").size(); h++) {
            var l = $("li").width();
            var k = $(".str1").eq(h).val();
            var j = $(".str2").eq(h).val();
            if (l < e * (strlen(k) + 3)) {
                k = d(k, l)
            }
            if (l < c * (strlen(j) + 3)) {
                j = d(j, l)
            }
            $(".name1").eq(h).text(k);
            $(".name2").eq(h).text(j)
        }
    }
    function f() {
        var k = $("li").size();
        var l = $("li").width();
        for (var j = 0; j < k; j++) {
            var m = $(".str1").eq(j).val();
            var h = "";
            if ((strlen(m) * 1.2) * e > l) {
                m = d(m, l * 0.775)
            }
            $(".name1").eq(j).text(m)
        }
    }
    function b() {
        var k = $("td").size();
        for (var j = 0; j < k; j++) {
            var l = $("td").eq(j).width();
            var m = $(".name1").eq(j).text();
            var h = "";
            if (strlen(m) * e > l) {
                $(".name1").eq(j).text(d(m, l))
            }
        }
    }
    function d(l, k) {
        var i = "";
        for (var h = 0; h < l.length; h++) {
            if ((strlen(i) + 3) * e < k) {
                i += l.charAt(h)
            } else {
                break
            }
        }
        return i + "..."
    }
});