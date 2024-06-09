$("#a1").click(function() {
    if ($(this).html() == "全部") {
        $(this).parent().css("height", "auto");
        $(this).html("收起");
    }
    else {
        $(this).parent().css("height", "26px");
        $(this).html("全部");
    }
})
$("#a2").click(function() {
    if ($(this).html() == "全部") {
        $(this).parent().css("height", "auto");
        $(this).html("收起");
    }
    else {
        $(this).parent().css("height", "26px");
        $(this).html("全部");
    }
})
$("#a3").click(function() {
    if ($(this).html() == "全部") {
        $(this).parent().css("height", "auto");
        $(this).html("收起");
    }
    else {
        $(this).parent().css("height", "26px");
        $(this).html("全部");
    }
})
$("#a4").click(function() {
    if ($(this).html() == "全部") {
        $(this).parent().css("height", "auto");
        $(this).html("收起");
    }
    else {
        $(this).parent().css("height", "26px");
        $(this).html("全部");
    }
})
$("#a5").click(function() {
    if ($(this).html() == "全部") {
        $(this).parent().css("height", "auto");
        $(this).html("收起");
    }
    else {
        $(this).parent().css("height", "26px");
        $(this).html("全部");
    }
})
$("#a6").click(function() {
    if ($(this).html() == "全部") {
        $(this).parent().css("height", "auto");
        $(this).html("收起");
    }
    else {
        $(this).parent().css("height", "26px");
        $(this).html("全部");
    }
})

$(".showall").toggle(function() {
    $(".tiaojian").children("li").eq(3).show();
    $(".tiaojian").children("li").eq(4).show();
    $(".tiaojian").children("li").eq(5).show();
    $(this).html("显示精简搜索条件");
}, function() {

    $(".tiaojian").children("li").eq(3).hide();
    $(".tiaojian").children("li").eq(4).hide();
    $(".tiaojian").children("li").eq(5).hide();
    $(this).html("显示更多筛选条件");
})

function zd(url) {
    window.location = url;
}
//-------------------------------------

$(".s1").click(function() {
    $(".search_tj").show();
})

$(".search_tj dl").click(function() {
    $("#search1_ser_Label1").html($(this).text());
    $(".search_tj").hide();
})

function sergo() {
    var ddd;
    if ($("#search1_ser_Label1").text() == "租房") {
        ddd = "rent/default.htm";
    }
    else {
        ddd = "sell/default.htm";
    }
    var url = $("#search1_ser_TextBox1").attr("value");
    url = ddd + "?name=" + encodeURI(url);
    zd(url);
}

//-------------------------------------

if (document.URL.toLowerCase().indexOf("rent/")>-1) {
    $("#search1_ser_Label1").text("租房")
}
else {
    $("#search1_ser_Label1").text("二手房")
}


