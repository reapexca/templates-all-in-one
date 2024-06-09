var loading = false;

function loadImg(url, image) {
    var img = image;
    img.width = 60;
    img.height = 60;
    img.style.border = 0;
    img.src = url.replace("../img2.gao7.com/files/appleimg/default.htm", "");

    if (img.complete) {
    }
    else {
        img.onload = function () {
        };
        img.onerror = function () {
            img.src = "images/gao7_icon.png";
        };
    }
}
//
function PageInfo(pageIndex, pageCount) {
    if ($("#hfKeyword").val() != "" && $("#type").val() == "0") {
        $("#specList").append(getPageHtml(pageIndex, pageCount));
    }
    else {
        $("#newslist").append(getPageHtml(pageIndex, pageCount));
    }

    $("#pageIndex").val(pageIndex);
    $("#pageCount").val(pageCount);
}
function getPageHtml(pageIndex, pageCount) {
    var result = "";
    if (pageIndex > 1) {
        result += "<div id=\"page\" class=\"page\">";
        result += "  <span>" + "第" + (pageIndex - 1) + "页/共" + pageCount + "页</span>";
        result += "</div>";
    }
    return result;
}

function AjaxGetData(jsurl) {
    $.ajax({
        type: "get",
        url: jsurl + "@keyword=" + $("#hfKeyword").val() + "&pageCount=" + $("#pageCount").val() + "&pageIndex=" + $("#pageIndex").val() + "&type=" + $("#type").val(),
        dataType: "html", //(可以不写,默认)
        beforeSend: function (XMLHttpRequest) {
            // $("#btnViewMore").attr({ "disabled": "disabled" });
        },
        success: function (data, textStatus) {
            //alert(data);
            if ($("#pageCount").val() == $("#pageIndex").val()) {
                //$("#btnViewMore").css("display", "none");
            }
            var index = parseInt($("#pageIndex").val()) + 1;
            var count = $("#pageCount").val();
            if (count >= index) {
                PageInfo(index, count);
                if ($("#hfKeyword").val() != "" && $("#type").val() == "0") {
                    document.getElementById("specList").innerHTML += data;
                }
                else {
                    document.getElementById("newslist").innerHTML += data;
                }

                //$("#newslist").append(data);
                // $("#btnViewMore").val("下一页很想见你");
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            //$("#btnViewMore").removeAttr("disabled");
            //            
            if ($("#pageCount").val() == $("#pageIndex").val()) {
                // $("#btnViewMore").css("display", "none");
            }
            loading = false;
        },
        error: function () {
            // alert("错误代码：--");
        }
    });
}

function reachBottom() {
    var scrollTop = 0;
    var clientHeight = 0;
    var scrollHeight = 0;
    var doc = document.documentElement;
    var body = document.body;
    if (doc && doc.scrollTop) {
        scrollTop = doc.scrollTop;
    } else if (body) {
        scrollTop = body.scrollTop;
    }
    scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop;
    if (body.clientHeight && doc.clientHeight) {
        clientHeight = (body.clientHeight < doc.clientHeight) ? body.clientHeight : doc.clientHeight;
    } else {
        clientHeight = (body.clientHeight > doc.clientHeight) ? body.clientHeight : doc.clientHeight;
    }
    scrollHeight = Math.max(body.scrollHeight, doc.scrollHeight);
    if (scrollTop + clientHeight + 250 >= scrollHeight) {
        return true;
    } else {
        return false;
    }
}

function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;

    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    var docElem = document.documentElement, body = document.body;
    if (docElem) {
        x1 = docElem.scrollLeft || 0;
        y1 = docElem.scrollTop || 0;
    }
    if (body) {
        x2 = body.scrollLeft || 0;
        y2 = body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
    var x = Math.max(x1, Math.max(x2, x3));
    var y = Math.max(y1, Math.max(y2, y3));
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}