
$(function () {
    //document.referrer   window.location.href
    var referrer =document.referrer;
    var paramurl = window.location.href;
    var keyword = "";
    var tid = "";

    if (fetchRequestParmValue(referrer, 'wd') != "") {
        keyword = decodeURI(fetchRequestParmValue(referrer, 'wd'));
    }
    if (fetchRequestParmValue(referrer, 'word') != "") {
        keyword = decodeURI(fetchRequestParmValue(referrer, 'word'));
    }
    if (fetchRequestParmValue(referrer, 'query') != "") {
        keyword = decodeURI(fetchRequestParmValue(referrer, 'query'));
    }
    if (fetchRequestParmValue(referrer, 'utm_term') != "") {
        keyword = decodeURI(fetchRequestParmValue(referrer, 'utm_term'));
    }
    if (fetchRequestParmValue(referrer, 'q') != "") {
        keyword = decodeURI(fetchRequestParmValue(referrer, 'q'));
    }


    if (fetchRequestParmValue(paramurl, 'utm_term') != "") {
        keyword = decodeURI(fetchRequestParmValue(paramurl, 'utm_term'));
    }
    if (fetchRequestParmValue(paramurl, 'tid') != "") {
        tid = fetchRequestParmValue(paramurl, 'tid');
    } else {
        tid = 889;
    }

    var message = keyword + "," + tid;
    $("#hidmessage").val(message);
    $("#hidparamurl").val(paramurl);
    $("#hidreferrerurl").val(referrer);
});


///获取url中指定参数值  
// <param name="url">url</param>  
// <param name="paras">参数名称</param>  
function fetchRequestParmValue(url, paras) {
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

function login() {
    $("#registerstart").hide();
    $("#loginstart").show();
    $("#findpassword").hide();
    $("#fogetpassword").hide();
}
function hidreg() {
    $("#registerstart").show();
    $("#loginstart").hide();
    $("#findpassword").hide();
    $("#fogetpassword").hide();
}

function login1() {
    $("#registerstart").hide();
    $("#loginstart").show();
    $("#findpassword").hide();
    $("#fogetpassword").hide();
    var myAlert = document.getElementById("register");
    myAlert.style.display = "none";
    //bg.style.display = "none";
    document.getElementById("mybg").style.display = "none";
    var myAlert1 = document.getElementById("registerdownload");
    myAlert1.style.display = "none";
    var myAlert1 = document.getElementById("registerenguovideo");
    myAlert1.style.display = "none";
}

function login2() {
    $("#registerstart").hide();
    $("#loginstart").show();
    $("#findpassword").hide();
    $("#fogetpassword").hide();
    var myAlert3 = document.getElementById("registerlocation");
    myAlert3.style.display = "none";
    document.getElementById("mybg").style.display = "none";
}


//登录
function checkLogin() {
    var name = $("#username").val();
    var password = $("#userpassword").val();
    var check = "";
    if ($("#cbxRemember").attr("checked")) {
        check = "true";
    }
    else {
        check = "false";
    }
    if (name.length == 0) {
        alert("请输入用户名或者邮箱!");
        $("#username").focus();
        return false;
    }
    if (password.length == 0) {
        alert("请输入密码!");
        $("#userpassword").focus();
        return false;
    }

    $.getJSON("../www.enguo.com/LPLogin.aspx@callback=@&Name=" + name + "&Password=" + password + "&Check=" + check,
        function (result) {
            if (result.IsSuccess == "true") {
                $("#spusername").html(result.Name);
                $("#loginsucess").show();
                $("#loginstart").hide();

            } else if (result.IsSuccess == "nouser") {
                alert("对不起，不存在此用户!");
            } else if (result.IsSuccess == "nopassword") {
                alert("密码错误!");
            } else {
                alert(result.Message);
            }
        });
}


//发送找回密码邮件
function checkdata() {
    var regex = new RegExp("^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$");
    var email = $("#findemail").val();
    if ($("#findemail").val() == "" || !regex.test($("#findemail").val())) {
        alert("请输入正确的邮箱格式");
        $("#findemail").focus();
        return false;
    }
    $.getJSON("../www.enguo.com/LPGetPassword.aspx@callback=@&Email=" + email,
        function (result) {
            if (result.IsSuccess == "true") {
                $("#spfindemail").html(result.Email);
                $("#loginsucess").hide();
                $("#findpassword").show();
                $("#fogetpassword").hide();
                var emails = result.Email;
                var emailurl = "../mail./" + emails.split('@')[1];
                if (emails.split('@')[1] == "gmail.com") {
                    emailurl = "../mail.google.com/";
                }
                $("#emailurls").attr("href", emailurl);
            } else {
                alert("不存在此邮箱，您可以注册会员进行登录。");
            }
        });
}

function fogetpassword() {
    $("#loginstart").hide();
    $("#fogetpassword").show();
}

function showyasi() {
    $("#divyasi").show();
    $("#divtuofu").hide();
    $("#classtuofu").removeClass("w_h13");
    $("#classyasi").addClass("w_h13");
}


function showtuofu() {
    $("#divyasi").hide();
    $("#divtuofu").show();
    $("#classyasi").removeClass("w_h13");
    $("#classtuofu").addClass("w_h13");
}