$(function () {
    $("#username").blur(function () {
        if (validateForm("frm_reg", {
            loop: false,
            targetEnumId: $(this).attr("id"),
            errorElClass: "error-common-input",
            errorShowClass: "red",
            showTip: true,
            tipClass: "tipClass"
        })) {
            validateRegInfoAjax($(this).val(), "", $(this).attr("id"), a)
        }
    });
//    $("#email").blur(function () {
//        if (validateForm("frm_reg", {
//            loop: false,
//            targetEnumId: $(this).attr("id"),
//            errorElClass: "error-common-input",
//            errorShowClass: "red",
//            showTip: true,
//            tipClass: "tipClass"
//        })) {
//            validateRegInfoAjax($(this).val(), "2", $(this).attr("id"), a)
//        }
//    });
    $("#password").blur(function () {
        validateForm("frm_reg", {
            loop: false,
            targetEnumId: $(this).attr("id"),
            errorElClass: "error-common-input",
            errorShowClass: "red",
            showTip: true,
            tipClass: "tipClass"
        })
    });
    $("#repassword").blur(function () {
        validateForm("frm_reg", {
            loop: false,
            targetEnumId: $(this).attr("id"),
            errorElClass: "error-common-input",
            errorShowClass: "red",
            showTip: true,
            tipClass: "tipClass"
        })
    });
    function a(f, g) {
        if (f.msg.result) {
            $("#" + g).removeClass("error-common-input");
            $("#" + g + "Error").removeClass("red")
        } else {
            $("#" + g).addClass("error-common-input");
            $("#" + g + "Error").addClass("red");
            $("#" + g + "Error").removeClass("tipClass");
            $("#" + g + "Error").html(f.msg.msg)
        }
    }
    $("#btnRegister").click(function () {
        var f = {
            loop: true,
            errorElClass: "error-common-input",
            errorShowClass: "red",
            showTip: true,
            tipClass: "tipClass"
        };
        if (validateForm("#frm_reg", f)) {
            $("#frm_reg").submit()
        }
    });
    $(".close").live("click",
    function () {
        $(".shelper").empty();
        $(".shelper").hide();
    });
    function e(f) {
        if (f.codeKey) {
            $("#code").attr("src", "validatecode@key=" + f.codeKey);
            $("#codeKey").val(f.codeKey)
        }
    }
    $(".c_code").click(function () {
        refreshCodeAjax(e)
    });
    formTipRender("frm_reg", "tipClass");
    if (testLocalStorage()) {
        var d = window.localStorage.getItem("schoolReg_school");
        var c = window.localStorage.getItem("schoolReg_schoolId");
        if (!$("#school").val()) {
            $("#school").val(d)
        }
        var b = $("#idSchool").val();
        if (!b || /^0$/.test(b)) {
            $("#idSchool").val(c)
        }
    }
});