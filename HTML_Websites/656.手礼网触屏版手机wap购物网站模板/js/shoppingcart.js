
function changeTxtOnFocus(obj) {
    isHaveAjaxServer = true;
}

//+,-礼包数量
function changeSaleRule(saleRuleSysNo, obj, isAdd) {
    var oldQty = 0;
    if (isAdd) {
        oldQty = obj.previousSibling.value;
        obj = obj.previousSibling.previousSibling;
    } else {
        oldQty = obj.nextSibling.nextSibling.value;
        obj = obj.nextSibling;
    }
    var qty = obj.value;
    if (!isAdd) {
        //判断为0的情况
        if (parseInt(obj.value) == 1) {
            showDelProduct('SaleRule' + saleRuleSysNo);
            return;
        }
        qty = qty - 1;
    }
    else
        qty = qty - 0 + 1;

    changeProductAjax(saleRuleSysNo, qty, obj, true, oldQty);
}

//更改礼包数量
function changeSaleRuleCount(saleRuleSysNo, obj) {
    if (obj.value == obj.nextSibling.value) {
        isHaveAjaxServer = false; return;
    }
    //检测输入是否为数字
    if (!checknumber(obj.value)) {
        isHaveAjaxServer = false;
        obj.value = obj.nextSibling.value; return;
    }

    //判断为0的情况
    if (parseInt(obj.value) == 0) {
        showDelProduct('SaleRule' + saleRuleSysNo);
        obj.value = obj.nextSibling.value;
        return;
    }

    changeProductAjax(saleRuleSysNo, obj.value, obj, true, obj.nextSibling.value);
}

//+,-商品数量
function changeProduct(productSysNo, obj, isAdd) {
    if (isAdd)
        obj = obj.previousSibling.previousSibling;
    else {
        obj = obj.nextSibling;
    }
    var qty = obj.value;
    if (!isAdd) {
        //判断为0的情况
        if (parseInt(obj.value) == 1) {
            showDelProduct(productSysNo);
            return;
        }
        qty = qty - 1;
    }
    else
        qty = qty - 0 + 1;

    changeProductAjax(productSysNo, qty, obj, false);
}



//更改商品数量
function changeProductCount(productSysNo, obj) {
    if (obj.value == obj.nextSibling.value) {
        isHaveAjaxServer = false; return;
    }
    //检测输入是否为数字
    if (!checknumber(obj.value)) {
        isHaveAjaxServer = false;        
        obj.value = obj.nextSibling.value; return;
    }

    //判断为0的情况
    if (parseInt(obj.value) == 0) {
        showDelProduct(productSysNo);
        obj.value = obj.nextSibling.value;
        return;
    }
    changeProductAjax(productSysNo, obj.value, obj, false);
}

function showAllDel() {
    $('[delId]').hide();
    $("[delId='All']").show();
}

function hideAllDel() {
    $("[delId='All']").hide();
}

function showDelProduct(productSysNo) {
    $('[delId]').hide();
    $('#cart-delete-dialog').hide();
    $("[delId='" + productSysNo + "']").show();
}

function hideDelProduct(productSysNo) {
    $("[delId='" + productSysNo + "']").hide();
}

//#region 

//#endregion

function showPackage(saleRuleSysNo, obj) {
    $('#packSoItemInfo' + saleRuleSysNo).toggle();
    $(obj).toggleClass('pc-checkboxb');
}

function changeProductAjax(sysNo, qty, obj, isSaleRule, oldQty) {
        //单品变更数量
    if (!isSaleRule) {
        $.ajax({
            type: "POST",
            url: ajaxUrl + "@callBack=ChangeShopCartProduct",
            data: "ProductSysNo=" + sysNo + "&Qty=" + qty + "&OldQty=" + oldQty,
            error: function (xhr, status, errMsg) {
                isHaveAjaxServer = false;
                if (obj) {
                    obj.value = obj.nextSibling.value;
                }
            },
            success: function (msg) {
                showShoppingCart(msg);
                isHaveAjaxServer = false;
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: ajaxUrl + "@callBack=ChangeShopcartSalerule",
            data: "SaleRuleSysNo=" + sysNo + "&Qty=" + qty + "&OldQty=" + oldQty,
            error: function(xhr, status, errMsg) {
                isHaveAjaxServer = false;
                if (obj) {
                    obj.value = obj.nextSibling.value;
                }
            },
            success: function(msg) {
                showShoppingCart(msg);
                isHaveAjaxServer = false;
            }
        });
    }
}

function delShoppingCart(obj) {
    var del = "";
    if (obj) {
        var delInfo = $(obj).attr('delInfo');
        if (del != "")
            del += "@";
        del += delInfo;
    }
    else {
        var delList = $("[IsDel='1']");
        delList.each(function(i, item) {
            var delInfo = $(item).attr('delInfo');
            if (del != "")
                del += "@";
            del += delInfo;
        });
    }

    $.ajax({
        type: "POST",
        url: ajaxUrl + "@callBack=delShoppingCart",
        data: "delInfo=" + del,
        error: function (xhr, status, errMsg) {
            isHaveAjaxServer = false;
        },
        success: function (msg) {
            showShoppingCart(msg);
            isHaveAjaxServer = false;
        }
    });
}

function showPromotion(obj) {
    $(obj).toggleClass('totalRePrice-more');
    $('#promotionHtml').toggle();
}

function addProduct(sysNo, qty) {
    $.ajax({
        type: "POST",
        url: ajaxUrl + "@callBack=addProduct",
        data: "ProductSysNo=" + sysNo + "&Qty=" + qty,
        error: function (xhr, status, errMsg) {
            isHaveAjaxServer = false;
        },
        success: function (msg) {
            showShoppingCart(msg);
            isHaveAjaxServer = false;
        }
    });
}

function showShoppingCart(msg) {
    isSubmit = false;
    if (msg == "login" || msg == "no cart") {
        $('.gwc_title').remove(); $('.gwccp').remove(); $('.jsworp').remove();
        $('#totalQty').html("0");
        $('header').after('<div class="kbkd box-siz"><P class="ktb"></P><a href="default.html" class="tc f14">购物车内暂时没有商品，去<span class="huangse">首页</span> 挑选喜欢的商品</a> </div>');
    }
    else if (msg == "nologin") {
        $('.gwc_title').remove(); $('.gwccp').remove(); $('.jsworp').remove();
        $('#totalQty').html("0");
        $('header').after('<div class="kbkd box-siz"><P class="ktb"></P><a href="Login.html" class="tc f14 pb10">购物车内暂时没有商品，<span class="huangse">[登录]</span> 后，将显示您之前加入的商品</a><a href="default.html" class="tc f14">购物车内暂时没有商品，去<span class="huangse">首页</span> 挑选喜欢的商品</a> </div>');
    } else {
        var orderShow = JSON.parse(msg);
        $('#totalQty').html(orderShow.TotalQty);
        $('#product-list').html(orderShow.CartHtml);
        if (orderShow.MsgHtml != '') {
            alert(orderShow.MsgHtml);
            msgAlert = orderShow.MsgHtml;
        }
        var obj = JSON.parse(orderShow.SOShowInfoHtml);
        $('#finalPrice').html('￥' + fmoney(obj.TotalAmt, 2));
        $('#totalSkuPrice').html('￥' + fmoney(obj.SOAmt, 2));
        if (obj.DiscountAmt > 0) {
            $('#totalRePrice').html('￥' + fmoney(obj.DiscountAmt, 2));
        } else {
            $('#totalRePrice').html('￥0.00');
        }
        if (obj.IsReturn)
            isSubmit = false;
        else
            isSubmit = obj.IsSubmit;
    }
}

function changeShoppingCart() {
    $.ajax({
        type: "POST",
        url: ajaxUrl + "@callBack=getshoppingcart",
        error: function (xhr, status, errMsg) {
            isHaveAjaxServer = false;
        },
        success: function (msg) {
            showShoppingCart(msg);
            isHaveAjaxServer = false;
        }
    });
}

function goToOrder() {
    if (isSubmit) {
        $.ajax({
            type: "POST",
            url: ajaxUrl + "@callBack=checkIsLogin",
            success: function(msg) {
                if (msg == '1') {
                    window.location.href = 'orderinfo.html';
                } else {
                    window.location.href = 'login.html@rUrl=ShoppingCart.html';
                }
            }
        });

    } else {
        alert(msgAlert);
    }
}
