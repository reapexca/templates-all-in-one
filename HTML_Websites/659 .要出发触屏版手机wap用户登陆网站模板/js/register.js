EmptyInput();
var register = function (result, status) {
    if (result.Success == false) {
        if ($(".error_tip")) { $(".error_tip").eq(0).remove(); };
        $(".input").eq(4).after('<li class="error_tip">' + result.Name + '</li>');
    }
    if (status == "success" && result.Success == undefined) {
        var data = GetInputData();
        var loginData = {};
        loginData["phone"] = data["phone"];
        loginData["ps"] = data["password"];
        ycf.getData('GET', 'User/UserLogin@remember=true', loginData, function (results, state, xhr) {
            if (state == "success") {
                ycf.storage.set("SecurityKey", results.SecurityKey);
                ycf.storage.set("Name", results.Name);
                ycf.storage.set("Email", results.Email);
                ycf.storage.set("Phone", results.Phone);
                document.location.href = ycf.storage.get("http");
            }
        })
    }
};
$(".btn_order").on('click', function () {
    var data = GetInputData();
    var bool = IsEnptyObject(data);
    if (bool) { return; }
    ycf.getData('GET', 'User/Register', data, register)
    console.log(data);
});
