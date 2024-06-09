/**
* @description ycf_lib.js 基于Zepto的中层库，包含常用的一些功能如：cookie的调用等等
* @author  rock qq:443134623
* @version 1.0  20130806
*/
;var ycf = function () {
    var doc = $(document),
	    win = $(window),
	    dw = doc.width(),
	    dh = doc.height(),
	    ww = win.width(),
	    wh = win.height(),
	    currentPosition, timer;


    return {
        //公用属性
        domain: "../api.yaochufa.com/default.htm",
        /**
        * 返回前一页
        */
        historyBack: function () {
            history.go(-1);
        },
        /**
        * 返回顶部开始
        */
        b2top: function () {
            timer = setInterval("ycf.runTop()", 1);
        },
        runTop: function () {
            currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= 100;
            if (currentPosition > 0) {
                window.scrollTo(0, currentPosition);
            }
            else {
                window.scrollTo(0, 0);
                clearInterval(timer);
            }
        }
        /**
        * 返回顶部结束
        */
       ,
        /**
        * 操作cookie
        * @param  {object} name        key名字
        * @param  {object} value       key对应的值
        * @param  {object} time        过期日期
        */

        cookie: {
            get: function (name) {
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null) {
                    return unescape(arr[2]);
                }
                else {
                    return null;
                }
            },
            set: function (name, value, time, domain) {
                domain = domain || '';
                if (time == 0) {
                    document.cookie = name + "=" + escape(value) + ";path=/;domain=" + domain;
                } else {
                    var Days = time || 1;
                    var exp = new Date();

                    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toLocaleString() + ";domain=" + domain;
                }

            },
            del: function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 24 * 60 * 60 * 1000);
                var cval = ycf.cookie.get(name);
                if (cval != null) {
                    document.cookie = name + "=" + cval + ";expires=" + exp.toLocaleString() + "; path=/";
                }
                console.log(exp.toLocaleString());
            }
        },
        /**
        * 自定义Ajax
        * @param  {string}   type      GET还是POST
        * @param  {string}   url       一个用来包含发送请求的URL字符串
        * @param  {object}   param     [description]
        * @param  {Function} callback  ajax调用成功的处理函数
        * @return {}                   无返回值
        */
        getData: function (type, url, param, callback) {
            $.ajax({
                type: type,
                url: ycf.domain + url,
                data: param,
                dataType: 'json',
                success: callback,
                beforeSend: function () {
                    if ($(".addLoading").find(".loadimg")) { $('.addLoading .loadimg').remove(); }
                    $('.addLoading').append('<p class="loadimg" style="text-align:center;padding:20px 0;"><img src="../cdn1.yaochufa.com/images/mobile/loading.gif"/></p>');
                },
                complete: function () {
                    $('.addLoading .loadimg').remove();
                },
                error: function (xhr) {
                    if (xhr.status == 401) {
                        ycf.storage.remove("SecurityKey");
                        ycf.storage.remove("Name");
                        ycf.storage.remove("Email");
                        ycf.storage.remove("Phone");
                        document.location = "login.html";
                    };
                    console.log('网速不稳定，再刷新下');
                }
            });
        },
        /**
        * 操作本地存储
        * @param  {object} key         名
        * @param  {object} sValue      值
        * @param  {object} scope       sessionStorage或localStorage
        */
        storage: {
            get: function (key) {
                var value = localStorage.getItem(key);
                return (/^(\{|\[).*(\}|\])$/).test(value) ? JSON.parse(value) : value;
            },
            set: function (key, value) {
                var serializable = Zepto.isArray(value) || Zepto.isPlainObject(value),
                    storeValue = serializable ? JSON.stringify(value) : value;
                localStorage.setItem(key, storeValue);
            },
            remove: function (key) {
                localStorage.removeItem(key);
            },
            removeAll: function () {
                localStorage.clear();
            }
        },
        /**
        * 模拟弹框，alert和comfirm
        * @param  {object} config      配置
        */
        msgBox: {
            //alert框
            alert: function (config, callback) {
                //默认属性
                config = $.extend({
                    // titleSize : '16px',              //标题文字大小
                    // contentSize : '14px',            //内容文字大小
                    color: '#333',                  //文字颜色
                    border: '1px solid #ccc',       //边框样式
                    borderRadius: '5px',            //圆角边框
                    background: '#fff',             //背景颜色
                    boxWidth: '240',                //box的宽度
                    boxMinHeight: '100',            //box的高度
                    text: 'alert!',                //内容文字
                    btnText: '确定'
                }, config);

                var top = wh / 2 - config.boxMinHeight / 2,
                  left = $('#header').length ? hw / 2 - config.boxWidth / 2 : dw / 2 - config.boxWidth / 2,
                //cfgText = config.text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
                  alertBox = '<div class="alertBox" style="width:' + config.boxWidth + 'px;min-height:' + config.boxMinHeight + 'px;overflow:hidden;position: fixed;top:' + top + 'px;left:' + left + 'px;z-index: 1000;box-shadow: 1px 1px 3px rgba(0, 0, 0, .1);background:' + config.background + ';border:' + config.border + ';color:' + config.color + ';border-radius:' + config.borderRadius + '"><div class="modal-body" style="padding: 15px;">' + config.text + '</div><div style="padding:0;text-align: center;margin-top: 10px;border-top: 1px solid rgb(221, 221, 221);-webkit-border-radius: 0 0 6px 6px;"><a class="closeAlertBox" href="javascript:;">' + config.btnText + '</a></div></div><div class="backFade" style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 999;background-color: transparent;"></div>';
                $(alertBox).appendTo(document.body);
                $('.backFade').on('click', function () {
                    $('.closeAlertBox').trigger('click');
                });
                $('.closeAlertBox').on('click', function () {
                    $('.alertBox,.backFade').remove();
                    if (callback && typeof (callback) === "function") {
                        callback();
                    }
                });

            },

            //confirm框
            confirm: function (config, callback) {
                //默认属性
                config = $.extend({
                    // titleSize : '16px',              //标题文字大小
                    // contentSize : '14px',            //内容文字大小
                    color: '#333',                  //文字颜色
                    border: '1px solid #ccc',       //边框样式
                    borderRadius: '5px',            //圆角边框
                    background: '#fff',             //背景颜色
                    boxWidth: '240',                //box的宽度
                    boxMinHeight: '100',            //box的高度
                    text: 'alert!',                 //内容文字
                    btnText: '确定',
                    cancelText: '取消',
                    newClass: ''
                }, config);

                var top = wh / 2 - config.boxMinHeight / 2,
                  left = $('#header').length ? hw / 2 - config.boxWidth / 2 : dw / 2 - config.boxWidth / 2,
                  confirmBox = '<div class="confirmBox" style="left:' + left + ';top:' + top + ';"><div class="modal-body">    ' + config.text + '</div><div class="buttons"><a class="cancelAlertBox" href="javascript:;" >' + config.cancelText + '</a><a class="closeConfirmBox " href="javascript:;">' + config.btnText + '</a><input type="hidden" id="myflag" data="" /></div></div><div class="backFade"style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 999;background-color: transparent;"></div>';
                $(confirmBox).appendTo(document.body);
                $('.closeConfirmBox').live('click', function () {
                    //var flag = $('#myflag').attr('data');调用时作为标志
                    $('#myflag').attr('data', 0);
                    if (callback && typeof (callback) === "function") {
                        callback();
                    }
                    $('.confirmBox,.backFade').remove();
                });
                $('.cancelAlertBox').live('click', function () {
                    $('.confirmBox,.backFade').remove();
                })
            }
        }

    } //interface end

}             //end
var ycf = ycf();

