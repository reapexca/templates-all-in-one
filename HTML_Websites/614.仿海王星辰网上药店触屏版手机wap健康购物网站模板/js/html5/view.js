$(function () {
    var V = function () {
        var type = 0;
        if ($("#currentWareId").val() == $("#pid").val() && $("#resourceType").val() == 2) {
            type = 2;
        }
        addWare($("#pid").val(), 1, false, type, $("#resourceValue").val(), $("#sid").val())
    };
    var N = function () {
        addWare($("#currentWareId").val(), 1, true, $("#resourceType").val(), $("#resourceValue").val(), $("#sid").val())
    };
    $("#add_cart").click(V);
    $("#directorder").click(N);
    var m = [];
    var j = [];
    function q(ab) {
        var ae = ab.touches;
        var ad = ae[0];
        var ac = "scrollLeft" in $(window)[0] ? $(window)[0].scrollLeft : $(window)[0].scrollX;
        var aa = $(window).scrollTop();
        m.push(ad.pageX);
        j.push(ad.pageY);
        if (j.length > 1) {
            ab.preventDefault();
            var Z = j[j.length - 2] - j[j.length - 1];
            if (Math.abs(Z) > 50) {
                window.scrollTo(ac, window.lastY + Z)
            }
        }
    }
    function x(ad) {
        var ag = ad.touches;
        var af = ag[0];
        if (m != undefined && m.length > 1) {
            var Z = parseInt(m.shift(), 10);
            var ac = parseInt(m.pop(), 10);
            var ab = Math.abs(Z - ac);
            if (j.length > 1) {
                var ae = "scrollLeft" in $(window)[0] ? $(window)[0].scrollLeft : $(window)[0].scrollX;
                ad.preventDefault();
                var aa = j[j.length - 2] - j[j.length - 1];
                if (Math.abs(aa) > 50 && Math.abs(aa) > ab) {
                    window.scrollTo(ae, window.lastY + aa)
                } else {
                    if (ab > 50) {
                        ad.preventDefault();
                        F(Z, ac)
                    }
                }
            } else {
                if (ab > 50) {
                    ad.preventDefault();
                    F(Z, ac)
                }
            }
            m = [];
            j = []
        }
    }
    function F(aa, Z) {
        if (aa >= Z) {
            $("#i_next").click()
        } else {
            $("#i_pre").click()
        }
    }
    function O(aa) {
        var Z = new Image();
        Z.src = aa;
        Z.id = "showPic";
        Z.width = 180;
        Z.height = 180;
        return Z
    }
    function e(Z) {
        if (window.addEventListener) {
            Z.addEventListener("touchmove", q, false);
            Z.addEventListener("touchend", x, false)
        } else {
            if (window.attachEvent) {
                Z.attachEvent("touchmove", q);
                Z.attachEvent("touchend", x)
            } else {
                Z.ontouchmove = q;
                Z.ontouchend = x
            }
        }
    }
    var G = createSpinner();
    var g = createSpinner();
    function y(ac, ad, ab) {
        var aa = "<div id='showPic'></div>";
        $("#showPic").css("height", $("#div_img").height());
        $("#spinner").show();
        G.spin($("#spinner")[0]);
        var Z;
        if (ac) {
            Z = O(ac)
        } else {
            Z = O(HTML5_DEFAULT_IMG_220x220)
        }
        if (Z.complete) {
            G.stop();
            $("#spinner").hide();
            if (d == ab) {
                ad(Z);
                return
            }
        }
        Z.onload = function () {
            G.stop();
            $("#spinner").hide();
            if (d == ab) {
                ad(Z)
            }
        };
        Z.onerror = function () {
            G.stop();
            $("#spinner").hide();
            var ae = O(HTML5_DEFAULT_IMG_220x220);
            ad(ae)
        }
    }
    function A(Z) {
        $("#div_img").css("height", Z.height);
        $("#showPic").replaceWith(Z)
    }
    var d = 0;
    y($("#showPic").attr("src"), A, d);
    var C = [];
    function R(aa, ab) {
        var ac = new Array();
        if (P(ab)) {
            return
        }
        if (aa && aa != 0) {
            var Z = O(aa);
            Z.onload = function () {
                if (P(ab)) {
                    return
                }
                ac.push(ab);
                ac.push(Z);
                C.push(ac)
            }
        }
    }
    function U(aa) {
        for (var ab = 0; ab < C.length; ab++) {
            var Z = C[ab];
            if (Z[0] == aa) {
                return Z[1]
            }
        }
        return false
    }
    function P(aa) {
        for (var ab = 0; ab < C.length; ab++) {
            var Z = C[ab];
            if (Z[0] == aa) {
                return true
            }
        }
        return false
    }
    function t(Z) {
        if (Z <= 0) {
            $(".pic-num").hide()
        } else {
            $(".pic-num").show()
        }
    }
    function s() {
        var ac = $("#imgs").val();
        var aa = ac.split(",");
        t(aa.length - 2);
        if (ac) {
            R($("#showPic").attr("src"), 0);
            R(aa[1], 1);
            var ab = aa.length - 2;
            $("#i_pre").unbind();
            $("#i_pre").click(function () {
                G.stop();
                if (d >= 0) {
                    d = d - 1
                }
                Z();
                if (d == 0) {
                    if (U(0)) {
                        $("#div_img").html(U(0))
                    } else {
                        y(aa[0], A, d)
                    }
                } else {
                    if (d < 0) {
                        d = ab;
                        if (U(d)) {
                            $("#div_img").html(U(d))
                        } else {
                            y(aa[d], A, d)
                        }
                    } else {
                        if (U(d)) {
                            $("#div_img").html(U(d))
                        } else {
                            y(aa[d], A, d)
                        }
                    }
                }
            });
            $("#i_next").unbind();
            $("#i_next").click(function () {
                G.stop();
                if (d <= ab) {
                    d = d + 1
                }
                Z();
                if (d == ab) {
                    R(aa[ab], ab);
                    if (U(ab)) {
                        $("#div_img").html(U(ab))
                    } else {
                        y(aa[ab], A, d)
                    }
                } else {
                    if (d > ab) {
                        d = 0;
                        if (U(d)) {
                            $("#div_img").html(U(d))
                        } else {
                            y(aa[d], A, d)
                        }
                    } else {
                        R(aa[d + 1], d + 1);
                        if (U(d)) {
                            $("#div_img").html(U(d))
                        } else {
                            y(aa[d], A, d)
                        }
                    }
                }
            });
            function Z() {
                if (ab > 0) {
                    $("#pic_page").html((d + 1) + "/" + (ab + 1));
                    if (d >= ab) { } else { }
                    if (d <= 0) { } else { }
                } else { }
            }
            Z()
        }
    }
    function o(Z) {
        var aa = "";
        if (Z && Z.ware && Z.ware.images && Z.ware.images.length > 0) {
            $("#u_imgs").empty();
            $("#u_imgs").append(' <li class="p-img" style="text-align:center;"  id="div_img"><div id="showPic"></div></li>');
            $.each(Z.ware.images,
            function (ac, ab) {
                if (ab && ab.newpath) {
                    if (ac == 0) {
                        d = 0;
                        y(ab.newpath.replace("../n4/default.htm", "../n1/default.htm"), A, 0)
                    }
                    aa = aa + ab.newpath.replace("../n4/default.htm", "../n1/default.htm") + ","
                }
            });
            $("#imgs").val(aa);
            $("#pic_page").text("1/" + Z.ware.images.length);
            s()
        }
    }
    function b(aa) {
        $("#currentWareId").val(aa.ware.wareId);
        $(".h_h3").empty();
        $(".h_h3").append(aa.ware.wname + '&nbsp;&nbsp;<font color="red">' + aa.ware.adword + "</font>");
        if (aa && aa.proColors && aa.proColors.length > 0) {
            $("#color_parent").show();
            $("#color").empty();
            $.each(aa.proColors,
            function (ac, ab) {
                if (aa.ware.wareId == ab.wareId) {
                    $("#color").append('<a title="' + ab.color + '" date="current" class="color-opt  on" style="margin-top:5px;margin-bottom:5px;">' + ab.color + '<span class="ico-chk"></span></a>')
                } else {
                    $("#color").append('<a title="' + ab.color + '"class="color-opt" date="noCurrent" href="javascript:void(0)" style="margin-top:5px;margin-bottom:5px;" wareId="' + ab.wareId + '">' + ab.color + "</a>")
                }
            })
        } else {
            $("#color_parent").hide()
        }
        if (aa && aa.proSizes && aa.proSizes.length > 0) {
            $("#size_parent").show();
            $("#size").empty();
            $.each(aa.proSizes,
            function (ac, ab) {
                if (aa.ware.wareId == ab.wareId) {
                    $("#size").append('<a title="' + ab.size + '" class="color-opt on" date="currentSize" style="margin-top:5px;margin-bottom:5px;">' + ab.size + '<span class="ico-chk"></span></a>')
                } else {
                    $("#size").append('<a title="' + ab.size + '" href="javascript:void(0)" date="noCurrentSize" style="margin-top:5px;margin-bottom:5px;" class="color-opt" wareId="' + ab.wareId + '">' + ab.size + "</a>")
                }
            })
        } else {
            $("#size_parent").hide()
        }
        if (aa && aa.ware && aa.ware.marketPrice && aa.ware.showMartPrice) {
            $("#price").show();
            $("#font_price").empty();
            if (aa.marketPrice) {
                $("#font_price").text(aa.marketPrice)
            } else {
                $("#font_price").text("&yen;" + aa.ware.marketPrice)
            }
        } else {
            $("#price").hide()
        }
        K(aa);
        if (aa && aa.stock) {
            if (!aa.useJdPrice) {
                $("#jd_price").attr("src", "../../price.360buyimg.com/gp" + aa.stock.wareId + ",3.png")
            } else {
                var Z = "";
                if (aa.stock.jdPrice && aa.stock.jdPrice != "" && aa.stock.jdPrice.toLowerCase() != "null" && parseFloat(aa.stock.jdPrice) > 0) {
                    Z = "&yen;" + aa.stock.jdPrice
                } else {
                    Z = "&#26242;&#26080;&#25253;&#20215;"
                }
                $("#jdPriceShow").html(Z)
            }
            $("#wareNo").html(aa.stock.wareId)
        } else {
            if (!aa.useJdPrice) {
                $("#jd_price").attr("src", "../../price.360buyimg.com/gp" + aa.ware.wareId + ",3.png")
            } else {
                var Z = "";
                if (aa.ware.jdPrice && aa.ware.jdPrice != "" && aa.ware.jdPrice.toLowerCase() != "null" && parseFloat(aa.ware.jdPrice) > 0) {
                    Z = "&yen;" + aa.ware.jdPrice
                } else {
                    Z = "&#26242;&#26080;&#25253;&#20215;"
                }
                $("#jdPriceShow").html(Z)
            }
            $("#wareNo").html(aa.ware.wareId)
        }
        if (aa && aa.promotionInfo && aa.promotionInfo.promotionInfoTitle) {
            $("#promotionInfo").show();
            $("#promotionInfo").empty();
            $("#promotionInfo").append('<span class="mu_lh">' + aa.promotionInfo.promotionInfoTitle + '</span><span class="mu_lc red">' + aa.promotionInfo.promotionInfo + "</span>")
        } else {
            $("#promotionInfo").hide()
        }
        $("#wareDetail").attr("href", urlEncode("../detail/" + aa.ware.wareId + ".html", $("#sid").val()))
    }
    function Y(Z) {
        $("#wareDetail").attr("href", urlEncode("../detail/" + Z.ware.wareId + ".html", $("#sid").val()))
    }
    function z(aa) {
        $("#comment").attr("href", urlEncode("../comments/" + aa.ware.wareId + ".html", $("#sid").val()));
        var Z = "";
        Z += '<span class="txt">\u597d\u8bc4</span><span class="red">' + aa.commentCountMap.scoreCount1 + '</span><span class="txt">\u4e2d\u8bc4</span><span class="red">' + aa.commentCountMap.scoreCount2 + '</span><span class="txt">\u5dee\u8bc4</span><span class="red">' + aa.commentCountMap.scoreCount3 + "</span>";
        $("#cont").html(Z);
        if (aa.comments && aa.comments.length > 0) {
            var ab = "";
            ab += '<p class="tit">' + aa.comments[0].title + '</p><p><span>\u8bc4\u5206\uff1a</span><span  class="mu-star"><span class="mu-starv star-width' + aa.comments[0].score + '"></span></span></p><p class="user_id"><span class="name">' + aa.comments[0].userId + '</span><span class="time">' + aa.comments[0].creationTime + '</span></p><p><span>\u4f18\u70b9\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">' + aa.comments[0].pros + '</span></p><p><span>\u4e0d\u8db3\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">' + aa.comments[0].cons + '</span></p><p><span>\u5fc3\u5f97\uff1a</span><span style="table-layout:fixed; word-break: break-all; overflow:hidden;">' + aa.comments[0].cons + "</span></p>";
            $("#commentDetail").html(ab)
        } else {
            $("#commentDetail").html("")
        }
    }
    function E(Z) {
        $("#wareShaiDan").attr("href", urlEncode("../ware/orderComment.action@wareId=" + Z.ware.wareId, $("#sid").val()));
        $("#shaidan").text(Z.orderCommentCount)
    }
    function H(Z) {
        $("#consult").attr("href", urlEncode("../ware/consultations.action@wareId=" + Z.ware.wareId, $("#sid").val()));
        $("#zixun").html(Z.commentCount)
    }
    function L(Z) {
        $("#spinner1").show();
        g.spin($("#spinner1")[0]);
        $.post("../ware/view.json", {
            wareId: Z,
            sid: $("#sid").val(),
            provinceId: $("#province").val(),
            cityId: $("#city").val(),
            teamSign: $("#teamSign").val()
        },
        function (aa) {
            o(aa);
            b(aa);
            g.stop();
            $("#spinner1").hide();
            Y(aa);
            window.scrollTo(0, 0)
        },
        "json");
        jQuery.post("../ware/comments.json", {
            wareId: Z,
            sid: $("#sid").val()
        },
        function (aa) {
            z(aa)
        },
        "json");
        jQuery.post("../ware/orderComment.json", {
            wareId: Z,
            sid: $("#sid").val()
        },
        function (aa) {
            E(aa)
        },
        "json");
        jQuery.post("../ware/consultations.json", {
            wareId: Z,
            sid: $("#sid").val()
        },
        function (aa) {
            H(aa)
        },
        "json")
    }
    function n(aa, Z) {
        $("#spinner1").show();
        g.spin($("#spinner1")[0]);
        $.post("../ware/view.json", {
            provinceId: Z,
            cityId: aa,
            sid: $("#sid").val(),
            wareId: $("#currentWareId").val(),
            teamSign: $("#teamSign").val()
        },
        function (ab) {
            K(ab);
            g.stop();
            $("#spinner1").hide()
        },
        "json")
    }
    function f(Z) {
        $("#spinner1").show();
        g.spin($("#spinner1")[0]);
        $.post("../ware/view.json", {
            provinceId: Z,
            sid: $("#sid").val(),
            wareId: $("#currentWareId").val(),
            teamSign: $("#teamSign").val()
        },
        function (aa) {
            K(aa);
            g.stop();
            $("#spinner1").hide()
        },
        "json")
    }
    function K(Z) {
        if (Z && Z.stock) {
            $("#store").show();
            $("#store").empty();
            $("#store").append('\u9001\u81f3<div class="lst-sel" id="storeProInfo"><span class="select-box" id="provincetip"></span><select id="province" onchange="changeProvince()"></select></div>');
            $.each(Z.provinceList,
            function (ab, aa) {
                if (aa.label == Z.stock.provinceId) {
                    $("#province").append('<option value="' + aa.label + '" selected="selected" >' + aa.value + "</option> ");
                    $("#provincetip").html(aa.value)
                } else {
                    $("#province").append('<option value="' + aa.label + '" >' + aa.value + "</option> ")
                }
            });
            if (Z.stock.cityId) {
                $("#store").append('<div class="lst-sel" id="storeinfo"><span class="select-box" id="citytip"></span><select id="city" onchange="changeCity()"></select></div>');
                $("#store").show();
                $.each(Z.cityList,
                function (ab, aa) {
                    if (aa.idCity == Z.stock.cityId) {
                        $("#city").append('<option value="' + aa.idCity + '" selected="selected" >' + aa.name + "</option> ");
                        $("#citytip").html(aa.name)
                    } else {
                        $("#city").append('<option value="' + aa.idCity + '" >' + aa.name + "</option> ")
                    }
                })
            }
            $("#store").append(Z.stock.status)
        } else {
            $("#kucun").hide()
        }
        if (Z && Z.canBuy && Z.stock.flag) {
            if ($("#teamSign").val() != 1) {
                $("#add_cart").removeClass("btn-defult-add-cart");
                $("#add_cart").addClass("btn-add-cart");
                $("#add_cart").unbind("click");
                $("#add_cart").click(V);
                $("#add_cart").css("background", "#f9413a")
            }
            $("#stockFlag").val(Z.stock.flag);
            $("#directorder").removeClass("btn-defult-quk-buy");
            $("#directorder").addClass("btn-quk-buy");
            $("#directorder").unbind("click");
            $("#directorder").click(N);
            $("#directorder").css("background", "#ffe8a4")
        } else {
            if ($("#teamSign").val() != 1) {
                $("#add_cart").css("background", "");
                $("#add_cart").removeClass("btn-add-cart");
                $("#add_cart").addClass("btn-defult-add-cart");
                $("#add_cart").unbind("click")
            }
            $("#stockFlag").val(Z.stock.flag);
            $("#directorder").css("background", "");
            $("#directorder").removeClass("btn-quk-buy");
            $("#directorder").addClass("btn-defult-quk-buy");
            $("#directorder").unbind("click")
        }
    }
    $(function () {
        s();
        $("#province").live("change",
        function () {
            $("#cart").hide();
            f($(this).val())
        });
        $("#city").live("change",
        function () {
            $("#cart").hide();
            n($(this).val(), $("#province").val())
        });
        $('a[date="noCurrent"]').live("click",
        function () {
            $("#cart").hide();
            L($(this).attr("wareId"))
        });
        $('a[date="noCurrentSize"]').live("click",
        function () {
            $("#cart").hide();
            L($(this).attr("wareId"))
        })
    });
    var u = $("#currentWareId").val();
    var w = $("#sid").val();
    var r = createSpinner();
    var c = null;
    function W(Z) {
        $("#intro").hide();
        $("li").removeClass("curr");
        $("#" + Z).addClass("curr");
        $("#content").empty();
        $("#content").show();
        $("#paging").hide();
        $("#comments_ul").hide();
        u = $("#currentWareId").val();
        $("#ware_back").hide();
        $("#ware_home_div").show();
        if (!$("#ware_home").attr("bindClick")) {
            $("#ware_home").attr("bindClick", true).click(p)
        }
    }
    function p() {
        $("#ware_home_div").hide();
        $("#ware_back").show();
        $("#intro").show();
        $("#content").hide();
        $("li").removeClass("curr");
        $("#tab_intro").addClass("curr");
        $("#comments_ul").hide();
        if (c != null) {
            c.abort()
        }
    }
    function S() {
        if (c != null) {
            c.abort()
        }
        X();
        var Z = k("tab_detail");
        W("tab_detail");
        if (Z) {
            T();
            $("#content").html(Z)
        } else {
            if ($("#content").hasClass("detail")) {
                $("#content").removeClass("detail")
            }
            c = $.get("../ware/detail.json", {
                wareId: u,
                sid: $("#sid").val()
            },
            function (ad) {
                T();
                var ac = '<div class="detail"><p class="p-name">' + ad.ware.wname + '&nbsp;&nbsp;<font color="red">' + ad.ware.adword + "</font></p>";
                if (!ad.ware.isbook && !!ad.ware.promotion && ad.ware.promotion.length > 0) {
                    ac += '<ul><li><img src="../images/html5/sort.png" width="26" height="26">&#36192;&#21697;&#21015;&#34920;</li><li>';
                    var aa = ad.ware.promotion.length;
                    for (var ab = 0; ab < aa; ab++) {
                        ac += "<p>&#36192;&#21697;&#25968;&#37327;:" + ad.ware.promotion[ab].num + "&nbsp;&nbsp;&#36192;&#21697;&#32534;&#21495;:" + ad.ware.promotion[ab].wareId + "</p>"
                    }
                    ac += "</li></ul>"
                }
                if (ad.ware.isbook) {
                    ac += '<ul><li><img src="../images/html5/intro_icon.png" width="26" height="26">&#22522;&#26412;&#20449;&#24687;</li><li>';
                    if (ad.ware.attrs) {
                        var aa = ad.ware.attrs.length;
                        for (var ab = 0; ab < aa; ab++) {
                            ac += ad.ware.attrs[ab].label + " " + ad.ware.attrs[ab].value + "<br/>"
                        }
                    }
                    ac += '</li></ul><ul><li><img src="../images/html5/detail_icon.png" width="26" height="26">&#22270;&#20070;&#20869;&#23481;</li><li>' + ad.ware.wdis + '</li></ul><ul><li><img src="../images/html5/list_icon.png" width="26" height="26">&#30446;&#24405;</li><li>' + ad.ware.catalogue.replace(/\n/g, "<br/>") + "</li></ul>"
                } else {
                    ac += '<ul><li><img src="../images/html5/intro_icon.png" width="26" height="26">&#21830;&#21697;&#20171;&#32461;</li><li>' + ad.ware.wdis + '</li></ul><ul><li><img src="../images/html5/set_icon.png" width="26" height="26">&#35268;&#26684;&#21442;&#25968;</li><li>' + ad.ware.wi.code + '</li></ul><ul><li><img src="../images/html5/list_icon.png" width="26" height="26">&#21253;&#35013;&#28165;&#21333;</li><li>' + ad.ware.wi.wareQD + "</li></ul>";
                    if (ad.ware.wi && ad.ware.wi.ybInfo) {
                        ac += '<ul><li><img src="../images/html5/intro_icon.png" width="26" height="26">&#21806;&#21518;&#26381;&#21153;</li><li>' + ad.ware.wi.ybInfo + "</li></ul>"
                    }
                }
                $("#content").html(ac);
                B("tab_detail", ac);
                window.location.hash = "top"
            },
            "json")
        }
    }
    function I(Z, aa) {
        if (c != null) {
            c.abort()
        }
        var aa = aa || 5;
        X();
        W("tab_comment");
        D(aa);
        $("#comments_ul").show();
        c = $.get("../ware/comments.json", {
            wareId: u,
            sid: w,
            score: aa
        },
        function (ac) {
            if ($("#content").hasClass("detail")) {
                $("#content").removeClass("detail")
            }
            T();
            J(ac);
            Q(ac);
            $("#paging").show();
            var ab = ac.commentCount;
            if (ab == 0 && ac.comments.length != 0) {
                ab = ac.comments.length
            }
            var ad = {
                fillId: "paging",
                startSpinner: function () {
                    X();
                    $("#content").empty()
                },
                stopSpinner: T,
                num: 5,
                count: ab,
                page: ac.page,
                totalPage: ac.totalPage,
                message: "&#26242;&#26080;&#35780;&#35770;",
                callback1: function (ae) {
                    T();
                    Q(ae);
                    window.location.hash = "top"
                },
                url: "../ware/comments.json@wareId=" + u + "&score=" + aa + "&sid=" + w
            };
            paging = new Paging(ad);
            paging.show()
        },
        "json")
    }
    function i() {
        if (c != null) {
            c.abort()
        }
        X();
        W("tab_orderComment");
        $("#content").addClass("detail");
        c = $.get("../ware/orderComment.json", {
            wareId: u,
            sid: w
        },
        function (aa) {
            T();
            M(aa);
            $("#paging").show();
            var Z = aa.orderCommentCount;
            if (Z == 0 && aa.orderCommentInfoList.length != 0) {
                Z = aa.orderCommentInfoList.length
            }
            var ab = {
                fillId: "paging",
                startSpinner: function () {
                    X();
                    $("#content").empty()
                },
                stopSpinner: T,
                num: 5,
                count: Z,
                page: aa.page,
                totalPage: aa.totalPage,
                callback1: function (ac) {
                    T();
                    M(ac);
                    window.location.hash = "top"
                },
                url: "../ware/orderComment.json@wareId=" + u + "&sid=" + w
            };
            paging = new Paging(ab);
            paging.show()
        },
        "json")
    }
    function D(Z) {
        if (Z == 5) {
            $("#li_score5").addClass("curr");
            $("#li_score1").removeClass("curr");
            $("#li_score3").removeClass("curr")
        } else {
            if (Z == 3) {
                $("#li_score3").addClass("curr");
                $("#li_score1").removeClass("curr");
                $("#li_score5").removeClass("curr")
            } else {
                $("#li_score1").addClass("curr");
                $("#li_score5").removeClass("curr");
                $("#li_score3").removeClass("curr")
            }
        }
    }
    function J(ab) {
        var aa = $("#comments_ul");
        var Z = "";
        Z += '<ul><a id="score5"><li id="li_score5" class="first';
        if (ab.score == 5) {
            Z += " curr"
        }
        Z += '">&#22909;&#35780;<span class="red">' + h(ab.commentCountMap, 5) + "</span></li></a>";
        Z += '<a  id="score3"><li id="li_score3" ';
        if (ab.score == 3) {
            Z += ' class="curr"'
        }
        Z += '>&#20013;&#35780;<span class="red">' + h(ab.commentCountMap, 3) + "</span></li><a>";
        Z += '<a id="score1"><li id="li_score1" class="last';
        if (ab.score == 1) {
            Z += " curr"
        }
        Z += '">&#24046;&#35780;<span class="red">' + h(ab.commentCountMap, 1) + "</span></li></a>";
        aa.html(Z);
        $("#score5").click(l);
        $("#score3").click(l);
        $("#score1").click(l)
    }
    function h(aa, Z) {
        if (isNotBlank(aa)) {
            if (Z == 5) {
                if (isNotBlank(aa.scoreCount1)) {
                    return aa.scoreCount1
                }
            }
            if (Z == 3) {
                if (isNotBlank(aa.scoreCount2)) {
                    return aa.scoreCount2
                }
            }
            if (Z == 1) {
                if (isNotBlank(aa.scoreCount3)) {
                    return aa.scoreCount3
                }
            }
            return ""
        } else {
            return ""
        }
    }
    function l() {
        var Z = $(this).attr("id");
        var aa = 5;
        if (Z == "score3") {
            aa = 3
        }
        if (Z == "score1") {
            aa = 1
        }
        I(null, aa)
    }
    function Q(ae) {
        var ac = "";
        var ad = ae.comments;
        if (!!ad) {
            var Z = ad.length;
            for (var ab = 0; ab < Z; ab++) {
                var af = ad[ab];
                var aa = af.userId || "";
                if (aa.length > 10) {
                    aa = af.userId.substring(0, 10) + "..."
                }
                ac += '<div class="item radius"><div class="u-topic"><span ><img src="../images/html5/common_icon.png" width="26" height="30" /></span>' + af.title + '</div><div class="u-score">&#35780;&#20998;&#65306;<span class="star sa' + af.score + '"></span></div><div class="u-info clear">' + aa + '<span class="fr">' + af.creationTime + '</span></div><div class="u-merit">&#20248;&#28857;&#65306;' + af.pros + '</div><div class="u-insi">&#32570;&#28857;&#65306;' + af.cons + '</div><div class="u-summ">&#24515;&#24471;&#65306;' + af.content + "</div></div>"
            }
            $("#content").html(ac)
        }
    }
    function M(ad) {
        var ac = "";
        var aa = ad.orderCommentInfoList;
        if (!!aa) {
            var Z = aa.length;
            ac += "<ul>";
            for (var ab = 0; ab < Z; ab++) {
                var ae = aa[ab];
                ac += '<a href="../ware/orderCommentDetail.action@commentId=' + ae.id + "&wareId=" + u + '&v=6"><li><p class="topic">' + ae.title + '</p><span class="gray">' + ae.creationTime + '</span><span class="gray fr">' + ae.replyCount + '&#26465;&#22238;&#22797;</span><span class="menu-botton-arrow"></span></li></a>'
            }
            ac += "</ul>";
            $("#content").html(ac)
        }
    }
    function a(ac) {
        var ab = ["#tab_intro", "#tab_detail", "#a_tab_detail", "#tab_comment", "#a_tab_comment", "#tab_orderComment", "#a_tab_orderComment"];
        var aa = [p, S, S, I, I, i, i];
        for (var Z = 0; Z < aa.length; Z++) {
            if (ac != ab[Z]) {
                $(ab[Z]).click(aa[Z])
            }
        }
    }
    function v(Z) {
        if (testSessionStorage()) {
            window.sessionStorage.removeItem(m_prefix + Z)
        }
    }
    function B(aa, Z) {
        if (testSessionStorage()) {
            window.sessionStorage.setItem(m_prefix + aa, Z)
        }
    }
    function k(aa) {
        var Z = false;
        if (testSessionStorage()) {
            Z = window.sessionStorage.getItem(m_prefix + aa)
        }
        return Z
    }
    function X() {
        var Z = parseInt(document.body.clientWidth);
        $("#spinnerCache").css("margin-left", (Z / 2 - 50) + "px");
        $("#spinnerCache").show();
        r.spin($("#spinnerCache")[0])
    }
    function T() {
        r.stop();
        $("#spinnerCache").hide()
    }
});