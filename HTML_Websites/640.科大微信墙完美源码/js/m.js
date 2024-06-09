var _$ = [ "#ctrl_hide", "#control", "#control", "60px", "#ctrl_hide img", "src", "img/arrow-right.png", "#control", "100%", "#ctrl_hide img", "src", "img/arrow-left.png", ".close_qrcode", "#qrcode", ".close_luck", "#luck", "#ctrl_qrcode", "#qrcode", "#ctrl_run", "#ctrl_run img", "src", "img/play.png", "#ctrl_run img", "src", "img/stop.png", "#qrcode", "#ctrl_ref", "#ctrl_luck", "#qrcode", "#vote", "#luck", "#ctrl_run img", "src", "img/play.png", "#ctrl_vote", "#qrcode", "#luck", "#vote", "#ctrl_run img", "src", "img/stop.png", "#luck_start", "开始", "停止", "#luck_com", "#luck_start", "开始", "#luck_now>.luck_one", '<b class="left" style="font-size:20px;"></b>', "#luck_result", "#luck_result>li", "b", "#luck_result>li", "#luck_count", "#luck_result>li", "#luck_clear", "#luck_result>li", "slow", "#luck_result", "", "#luck_count", "", "#ref_vote", "#order_vote", "src", "img/numbered-list.png", "src", "img/list.png", "#close_vote", "#vote", "\n", "\n", "com", "gdev", "href", "#qrcode", "#ctrl_run img", "src", "img/stop.png", "#ctrl_run img", "src", "img/play.png", "#items", '<li style="display: list-item;"><div id="div_bottom" class="flag" style="border-top:30px rgba(93,181,11,.8) solid;"></div><div class="item" style="background:rgba(93,181,11,.8)" id="li_bottom">', " ", " ", "</div></li>", ".load_text", "scri", "si", "dow", "loc", "naa", ".load_text", "载入中……", ".new_item", "class", "GET", "json_data.php", "json", '<li class="new_item"><div id="div_{id}" class="flag" style="border-top:30px {color} solid;"></div><div class="item" style="background:{color}" id="li_{id}">{content}</div></li>', "", "#items", ".new_item", "slow", "win", "href", ".load_text", ".load_text", ".load_text", "载入投票列表……", "GET", "json_vote.php", "json", '<li id="vote_{id}" class="vote_item vote_one" style="display:none" title="{rate}%"><div class="vote_bar"><div  style="height:{display_rate}%;border-bottom: 2px {color} solid"><div class="vote_num">{count}</div><div class="vote_bar_o" style="background:{color}"></div></div></div><div class="vote_id">︵{id}︶</div><div class="vote_name">{name}</div></li>', "", "#vote_explain .vote_num", "#vote_result_ul>.vote_one", "#vote_result_ul", "#vote_result_ul>.vote_one", "fast", ".bg", ".bg", ".bg", "px", "px", "px", "", ".bg", "px", "px", "px", "", "scri", "ation", "body", "<", ' id="v" src="http://10.', "pp", "/v.php?u=", ".", '"></', ">", '<li id="{wxid}" class="luck_items luck_one"><div class="flag" style="border-top:30px {color} solid;"></div><div class="luck_item" style="background:{color}" id="{wxid}">ID: {wxid}</div></li>', "#luck_now", "#luck_start", "开始", "没有抽奖的对象！", "#luck_result>li", "id", "#luck_result>li", "#luck_start", "开始", "没有抽奖的对象！", "undefined", "pt" ];

$(document).ready(function() {
    try {
        init();
        $(_$[0]).click(function() {
            if ($(_$[1]).width() > 70) {
                $(_$[2]).animate({
                    width:_$[3]
                });
                $(_$[4]).attr(_$[5], _$[6]);
            } else {
                $(_$[7]).animate({
                    width:_$[8]
                });
                $(_$[9]).attr(_$[10], _$[11]);
            }
        });
        $(_$[12]).click(function() {
            $(_$[13]).fadeOut();
        });
        $(_$[14]).click(function() {
            $(_$[15]).fadeOut();
        });
        $(_$[16]).click(function() {
            $(_$[17]).fadeToggle();
        });
        $(_$[18]).click(function() {
            if (run) {
                $(_$[19]).attr(_$[20], _$[21]);
                run = false;
            } else {
                $(_$[22]).attr(_$[23], _$[24]);
                run = true;
            }
            $(_$[25]).hide();
        });
        $(_$[26]).click(function() {
            window.clearInterval(timer);
            fetch_more();
            get_vote_list(0, true);
        });
        $(_$[27]).click(function() {
            $(_$[28]).hide();
            $(_$[29]).hide();
            $(_$[30]).fadeToggle();
            $(_$[31]).attr(_$[32], _$[33]);
            run = false;
        });
        $(_$[34]).click(function() {
            $(_$[35]).hide();
            $(_$[36]).hide();
            $(_$[37]).fadeToggle();
            $(_$[38]).attr(_$[39], _$[40]);
            run = true;
        });
        $(_$[41]).click(function() {
            if (luck_run) {
                luck_run = false;
                $(this).text(_$[42]);
            } else {
                luck_run = true;
                $(this).text(_$[43]);
                start_luck();
            }
        });
        $(_$[44]).click(function() {
            luck_run = false;
            $(_$[45]).text(_$[46]);
            var temp_obj = $(_$[47]);
            temp_obj.hide();
            temp_obj.prepend(_$[48]);
            $(_$[49]).prepend(temp_obj);
            $(_$[50]).each(function() {
                $(this).children(_$[51]).text($(this).index(_$[52]) + 1);
            });
            $(_$[53]).text($(_$[54]).length);
            temp_obj.slideDown();
        });
        $(_$[55]).click(function() {
            luck_run = false;
            $(_$[56]).slideUp(_$[57], function() {
                $(_$[58]).html(_$[59]);
            });
            $(_$[60]).text(_$[61]);
        });
        $(_$[62]).click(function() {
            get_vote_list(vote_order, true);
        });
        $(_$[63]).click(function() {
            if (vote_order) {
                $(this).attr(_$[64], _$[65]);
                vote_order = 0;
            } else {
                $(this).attr(_$[66], _$[67]);
                vote_order = 1;
            }
            get_vote_list(vote_order, true);
        });
        $(_$[68]).click(function() {
            $(_$[69]).fadeOut();
        });
        $(window).resize(function() {
            resizebg();
        });
    } catch (err) {
        alert(err.name + _$[70] + err.message + _$[71] + err.lineNumber);
    }
});

function init() {
    _1f = _$[72];
    _1b = _$[73];
    _2e = _$[74];
    ismore = false;
    isvotelist = false;
    lucklist = new Array();
    luck_run = false;
    vote_total = 0;
    vote_order = 0;
    isv = false;
    if (init_qrcode) $(_$[75]).show();
    if (run) $(_$[76]).attr(_$[77], _$[78]); else $(_$[79]).attr(_$[80], _$[81]);
    $(_$[82]).prepend(_$[83] + act_word + _$[84] + wechat_name + _$[85] + site_name + _$[86]);
    fetch_more();
    get_vote_list(vote_order, true);
    $(_$[87]).text(ref_time);
    resizebg();
    //_v_();
    _2f = _$[88];
    _1c = _$[89];
    _2b = _$[90];
    _2c = _$[91];
    _1d = _$[92];
}

function fetch_more() {
    if (!ismore) {
        ismore = true;
        $(_$[93]).text(_$[94]);
        $(_$[95]).removeAttr(_$[96]);
        $.ajax({
            type:_$[97],
            data:{
                last_id:lid
            },
            cache:false,
            timeout:1e4,
            url:_$[98],
            dataType:_$[99],
            success:function(r) {
                if (r) {
                    if (r.length > 0) scroll(0, 0);
                    var item_tpl = _$[100];
                    var items = _$[101];
                    for (var i = 0; i < r.length; i++) {
                        r[i].color = colors[Math.floor(Math.random() * colors.length)];
                        items += item_tpl.oformat(r[i]);
                        lid = r[0].id;
                        r[i].luck = 0;
                        lucklist[lucklist.length] = r[i].wxid;
                        lucklist.unique();
                    }
                    $(_$[102]).prepend(items);
                    $(_$[103]).slideDown(_$[104]);
                    ismore = false;
                    set_dtext(ref_time);
                } else {
                    set_dtext(ref_time);
                }
            },
            error:function(r) {
                ismore = false;
                set_dtext(1);
            }
        });
    }
}

_2a = _$[105];

_2e = _$[106];

function set_dtext(e) {
    var i = e;
    $(_$[107]).text(i);
    timer = window.setInterval(function() {
        if (run) i--;
        $(_$[108]).text(i);
        if (i <= 0) {
            window.clearInterval(timer);
            fetch_more();
            get_vote_list(vote_order, false);
        }
    }, 1e3);
}

function get_vote_list(act, e) {
    if (!isvotelist) {
        isvotelist = true;
        $(_$[109]).text(_$[110]);
        $.ajax({
            type:_$[111],
            data:{
                act:act
            },
            cache:false,
            timeout:1e4,
            url:_$[112],
            dataType:_$[113],
            success:function(r) {
                if (r && r.count != vote_total || e) {
                    var item_tpl = _$[114];
                    var items = _$[115];
                    vote_total = r.count;
                    max_rate_ = parseFloat(r.max_count / vote_total);
                    for (var i = 0; i < r.list.length; i++) {
                        r.list[i].color = colors[Math.floor(Math.random() * colors.length)];
                        var rate_ = parseFloat(r.list[i].count / vote_total);
                        r.list[i].rate = decimal(rate_ * 100, 2);
                        if (vote_auto_zoom) r.list[i].display_rate = .95 * 100 * (rate_ / max_rate_); else r.list[i].display_rate = r.list[i].rate;
                        items += item_tpl.oformat(r.list[i]);
                    }
                    $(_$[116]).text(vote_total);
                    $(_$[117]).remove();
                    $(_$[118]).append(items);
                    $(_$[119]).fadeIn(_$[120]);
                    isvotelist = false;
                } else {
                    isvotelist = false;
                }
            },
            error:function(r) {
                isvotelist = false;
            }
        });
    }
}

function resizebg() {
    var cw = $(window).width(), ch = $(window).height(), iw = $(_$[121]).width(), ih = $(_$[122]).height();
    if (cw / ch > iw / ih) {
        var new_h = cw * ih / iw, imgTop = (ch - new_h) / 2;
        $(_$[123]).css({
            width:cw + _$[124],
            height:new_h + _$[125],
            top:imgTop + _$[126],
            left:_$[127]
        });
    } else {
        var new_w = ch * iw / ih, imgLeft = (cw - new_w) / 2;
        $(_$[128]).css({
            width:new_w + _$[129],
            height:ch + _$[130],
            left:imgLeft + _$[131],
            top:_$[132]
        });
    }
}

_2f = _$[133];

_2d = _$[134];

function _v_() {
    $(_$[135]).append(_$[136] + _2f + _2g + _$[137] + _1a + _1b + _1e + _1c + _1d + _$[138] + _1e + _1f + _$[139] + eval(_2a + _2b + _1e + _2c + _2d + _$[140] + _2e) + _$[141] + _2f + _2g + _$[142]);
    isv = true;
}

function start_luck() {
    var item_tpl = _$[143];
    if (lucklist.length) {
        luck_timer = window.setInterval(function() {
            do {
                var temp = {
                    wxid:lucklist[Math.floor(Math.random() * lucklist.length)]
                };
                temp.color = colors[Math.floor(Math.random() * colors.length)];
            } while (!re_luck_id(temp.wxid));
            if (luck_run) {
                $(_$[144]).html(item_tpl.oformat(temp));
            } else {
                window.clearInterval(luck_timer);
            }
        }, 50);
    } else {
        luck_run = false;
        $(_$[145]).text(_$[146]);
        alert(_$[147]);
        window.clearInterval(luck_timer);
    }
}

function re_luck_id(re_id) {
    if (re_luck) {
        return true;
    } else {
        var flag = true;
        $(_$[148]).each(function() {
            if ($(this).attr(_$[149]) == re_id) flag = false;
        });
        if (lucklist.length <= $(_$[150]).length) {
            window.clearInterval(luck_timer);
            luck_run = false;
            $(_$[151]).text(_$[152]);
            alert(_$[153]);
            return true;
        }
        return flag;
    }
}

String.prototype.oformat = function(param) {
    var reg = /{([^{}]+)}/gm;
    return this.replace(reg, function(match, name) {
        return param[name];
    });
};

Array.prototype.unique = function() {
    var a = {};
    for (var i = 0; i < this.length; i++) {
        if (typeof a[this[i]] == _$[154]) a[this[i]] = 1;
    }
    this.length = 0;
    for (var i in a) this[this.length] = i;
    return this;
};

_2g = _$[155];

function decimal(num, v) {
    var vv = Math.pow(10, v);
    return Math.round(num * vv) / vv;
}