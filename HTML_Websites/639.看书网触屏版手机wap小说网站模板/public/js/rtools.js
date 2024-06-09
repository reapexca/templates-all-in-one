/* reading function */
var rtools = rtools || {};
rtools.config = {},
rtools.isShow = !1,
rtools.islogin = !1,
rtools.uid = 0,
rtools.bid = 0,
rtools.cid = 0,
rtools.setting = {fontcolor:"",fontsize:"",nightmode:"day",speed:50,tiptime:0},
rtools.checklogin = function(){
},
rtools.getinfo = function(){
    if(typeof ks_uid != "undefined")rtools.uid = ks_uid;
    if(typeof ks_bkid != "undefined")rtools.bid = ks_bkid;
    if(typeof ks_cid != "undefined")rtools.cid = ks_cid;
    var api_info = ks_host + "/usercenter/getUserinfo";
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: api_info,
        data: {uid:rtools.uid},
        success: function(data) {
            var json = data,
                request = json.result.status.code,
                msg = json.result.status.msg;
            if(request == 0){
                rtools.money.balance = json.result.data.usergold;
                rtools.flower.balance = json.result.data.userflower;
            }
            return
        }
    });
},
rtools.int = function(){
    rtools.poptip();
    rtools.getinfo();
    $("#chapter").on("click",function(e){rtools.start(e)});  
    $("#chapter").on("doubleTap",rtools.scroll.launch);        //双击暂停滚屏;
    $("#t-m-mode").on("click",function(){rtools.read.change(this)}); //切换阅读模式
    $("#t-m-clt").on("click",function(){rtools.collect.confirm(this)});   //收藏
    rtools.component.int("#t-m-cmt",rtools.comment);    //评论
    rtools.component.int("#t-m-mny",rtools.money);      //打赏
    rtools.component.int("#t-m-flw",rtools.flower);     //送花
    rtools.component.int("#t-m-font",rtools.font);      //字体
    rtools.component.int("#t-m-off",rtools.offline);    //离线
    rtools.component.int("#t-m-scrol",rtools.scroll);   //滚动
    rtools.readsetting();            //读取用户设置
},
rtools.readsetting = function(){
    var setting = window.localStorage.getItem("kssetting");
    if(setting){
        setting = JSON.parse(setting);
        rtools.setting = setting;
        $("body").addClass(setting.fontsize);
        $("body").addClass(setting.fontcolor);
        rtools.read.mode = setting.nightmode;
        if(setting.nightmode == "night"){
            rtools.font.removestyle();
            $("body").addClass("night-mode");
        }
        rtools.scroll.speed = setting.speed;
    }
},
rtools.start = function(e){
    var ey = e.clientY, ex = e.clientX;
    if(!rtools.position(ey,ex))return;
    if(!rtools.isShow)rtools.show();
    else rtools.hide();
    return !1;
},
rtools.poptip = function(){
    var kstipdate = window.localStorage.getItem("kstipdate");
    if(typeof kstipdate != null && typeof kstipdate != ""){
        var date = new Date();
        var times = date.getTime() - kstipdate;
        var days = parseInt(times/(24*60*60*1000));
        if(days<=7)
            return;
        else{
            window.localStorage.setItem("kstipdate",date.getTime());
            $("#t-pop-tip").fadeIn().on("click",function(){$(this).hide()});
        }
    }else
        $("#t-pop-tip").fadeIn().on("click",function(){$(this).hide()});
    
    
},
rtools.viewHeight = function(){
    var a = document,
    b = a.compatMode == "BackCompat" ? a.body: a.documentElement;
    return b.clientHeight
},
rtools.viewWidth = function() {
    var a = document,
    b = a.compatMode == "BackCompat" ? a.body: a.documentElement;
    return b.clientWidth
},
rtools.position = function(y,x){
    var vh = rtools.viewHeight(), vw = rtools.viewWidth();
    var y1 = vh*.2, y2 = vh*.8, x1 = vh*.2, x2 = vh*.8;
    if(y<y1 || y>y2)return !1;
    else return 1;
},
rtools.show = function(){
        $("#t-nav").show();
        $("#t-menu").show();
        $("#t-prev").show();
        $("#t-next").show();
        rtools.isShow = 1;
},
rtools.hide = function(){
        $("#t-nav").hide();
        $("#t-menu").hide();
        $("#t-prev").hide();
        $("#t-next").hide();
        rtools.isShow = !1;
},
rtools.animate = rtools.animate || {},
rtools.animate.show = function(c,o){
    rtools.hide();
    $(c).fadeIn().animate({"bottom":0},200);
    if(!o)return;
    $(".t-cover").show().on("click",function(){        
        o.hide();
        $(this).hide()
    });
    o.isShow = 1;
},
rtools.animate.hide = function(c,o){
    $(".t-cover").hide();
    $(c).animate({"bottom":"-180px"},100).hide();
    o.isShow = !1;
},
rtools.component = rtools.component || {},
rtools.component.int = function(c,o){
    $(c).off("click").on("click",function(){ 
        if(!o.isShow)o.show();
        else o.hide();
    });
},
rtools.tips = rtools.tips || {},
rtools.tips.isShow = !1,
rtools.tips.show = function(){
    rtools.animate.show(".t-tips", rtools.tips);
},
rtools.tips.hide = function(){
    rtools.animate.hide(".t-tips", rtools.tips);
},
rtools.tips.getmsg = function(s,t){
    var t = t*1000 || 3*1000;
    if(typeof s !== "undefined" && s !== ""){
        $(".t-tips").html(s);
        setTimeout(rtools.tips.hide,t)
    }else{
        var href = window.location.href;
        var cid = href.split("#")[1] || rtools.cid;
        var url = ks_host + '/content/'+kbook.bid +'-'+ cid +'.html@h5login=1';
        var html = '<p class="t_c"><br>请您先<a href="'+url+'" class="ye">登录</a></p>';
        $(".t-tips").html(html);
        rtools.tips.show();
    }
},
rtools.collect = rtools.collect || {},
rtools.collect.hascolect = false;
rtools.collect.confirm = function(o){    //收藏
    if(!rtools.uid){
        rtools.tips.getmsg();
        return;
    }
    var html = '<p class="t_c"><br>成功收藏至我的书架</p>';
    if(rtools.collect.hascolect){
        return;
    }
    var api_collect = ks_host + "/usercenter/h5collect";
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: api_collect,
        data: {articleid:rtools.bid,chapterid:ks_cid,uid:rtools.uid},
        success: function(data) {
            var json = data,
                request = json.result.status.code,
                msg     = json.result.status.msg;
            if(request == 0){
                $(o).addClass("active");
            }else{
                html = '<p class="t_c"><br>'+ msg +'</p>';
            }
            rtools.collect.hascolect = true;
            rtools.tips.getmsg(html,1.5);
            rtools.tips.show();
        }
    })
},
rtools.comment = rtools.comment || {},  //评论
rtools.comment.isShow = !1,
rtools.comment.show = function(){
    if(!rtools.uid){
        rtools.tips.getmsg();
        return;
    }
    rtools.animate.show(".t-cmt", rtools.comment);
    $("#t-c-c").off("click").on("click",rtools.comment.hide);
    $("#t-c-s").off("click").on("click",rtools.comment.submit)
},
rtools.comment.hide = function(){
    rtools.animate.hide(".t-cmt", rtools.comment)
},
rtools.comment.countLen = function(s){
    var n = s.length,len = 0;
    for(var i = 0; i < n; i++){
        var ns = s[i];
        if(ns == null)ns = s.substring(i, i + 1);
        if(ns.match(/[^\x00-\xff]/ig) != null){
            len += 2
        }else{
            len += 1
        }
    }
    len = parseInt(len/2);
    return len
},
rtools.comment.trim = function(s){
    return s.replace(/(^\s*)|(\s*$)/g, "")   
},
rtools.comment.check = function(){
    var msg = $("#t-c-a").val();
        n = rtools.comment.countLen(rtools.comment.trim(msg));
    if(n>0)return 1;
    return !1
},
rtools.comment.submit = function(){
    var url_cmt = ks_host + "/comment/"+ rtools.bid +"-2.html";
    var html = '<p class="t_c">评论成功</p><p class="t_c"><a href="'+url_cmt+'" class="ye">查看评论</a></p>';
    if(rtools.comment.check()){
        var api_cmt = ks_host + "/comment/h5post";
        var msg = rtools.comment.trim($("#t-c-a").val());
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url:api_cmt,
            data:{articleid:rtools.bid,content:msg,uid:rtools.uid},
            success:function(data){
                var json = data,
                    request = json.result.status.code,
                    msg     = json.result.status.msg;
                if(request != 0){
                    html = '<p class="t_c"><br>'+ msg +'</p>';
                }
                rtools.comment.hide();
                rtools.tips.getmsg(html);
                rtools.tips.show();
            }
        });
        
    }
},
rtools.money = rtools.money || {},  //打赏
rtools.money.isShow = !1,
rtools.money.balance = 0,
rtools.money.sum = 100,
rtools.money.show = function(){
    if(!rtools.uid){
        rtools.tips.getmsg();
        return;
    }
    if(rtools.money.getbalance()<=0){
        rtools.mlack.show();
        return;
    }
    rtools.animate.show(".t-money", rtools.money);
    $("#t-u-s").html(rtools.money.getbalance()+"金币");
    $("#t-m-b").off("click").on("click",rtools.money.confirm);
    $("#t-m-i").off("click").on("click",rtools.money.increase);
    $("#t-m-d").off("click").on("click",rtools.money.decrease);
},
rtools.money.hide = function(){
    rtools.animate.hide(".t-money", rtools.money)
},
rtools.money.getbalance = function(){
    return rtools.money.balance
},
rtools.money.setbalance = function(n){
    rtools.money.balance = n
},
rtools.money.checksum = function(n){
    var sum = rtools.money.sum,
        balance = rtools.money.getbalance();
        m = balance - sum;
    if(balance<n)return !1;
    if(m>0 && m>n){
        return 1
    }else if(m>0 && m<n){
        return !1
    }else if(m<0 && parseInt(m) > n){
        return 1
    }else if(m<0 && parseInt(m) < n){
        return !1
    }
},
rtools.money.increase = function(){
    if(rtools.money.checksum(100))rtools.money.sum+=100;
    else return;
    $("#t-m-n").html(rtools.money.sum+"金币")
},
rtools.money.decrease = function(){
    if(rtools.money.getbalance()<=100){
        rtools.money.sum = rtools.money.getbalance();
    }
    if(rtools.money.sum>100)rtools.money.sum-=100;
    else return;
    $("#t-m-n").html(rtools.money.sum+"金币")
},
rtools.money.confirm = function(){
    if(!rtools.money.sum)return;
    var html = '<p class="t_c"><br>打赏成功</p>';
    var num = rtools.money.getbalance() - rtools.money.sum;
    var api_money = ks_host + "/usercenter/modh5reward";
    if(rtools.money.sum>0){
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: api_money,
            data: {articleid:rtools.bid,num:rtools.money.sum,uid:rtools.uid},
            success: function(data) {
                var json = data,
                    request = json.result.status.code,
                    msg     = json.result.status.msg;
                if(request == 0){
                    rtools.money.sum = 0;
                    rtools.money.setbalance(num);
                    $("#t-m-n").html("100金币");
                }else{
                    html = '<p class="t_c"><br>'+ msg +'</p>';
                }
                rtools.money.hide();
                rtools.tips.getmsg(html,1.5);
                rtools.tips.show();
            }
        })
    }
},
rtools.mlack = rtools.mlack || {};
rtools.mlack.show = function(){
    rtools.animate.show(".t-mlack", rtools.mlack);
},
rtools.mlack.hide = function(){
    rtools.animate.hide(".t-mlack", rtools.mlack);
},
rtools.flower = rtools.flower || {},    //送花
rtools.flower.isShow = !1,
rtools.flower.balance = 0,
rtools.flower.sum = 1,
rtools.flower.show = function(){
    if(!rtools.uid){
        rtools.tips.getmsg();
        return;
    }
    if(rtools.flower.getbalance()<=0){
        rtools.flack.show();
        return;
    }
    rtools.animate.show(".t-flower", rtools.flower);
    $("#t-u-f").html(rtools.flower.getbalance()+"朵");
    $("#t-fl-b").off("click").on("click",rtools.flower.confirm);
    $("#t-fl-i").off("click").on("click",rtools.flower.increase);
    $("#t-fl-d").off("click").on("click",rtools.flower.decrease);
},
rtools.flower.hide = function(){
    rtools.animate.hide(".t-flower", rtools.flower)
},
rtools.flower.getbalance = function(){    //花朵余额
    return rtools.flower.balance
},
rtools.flower.setbalance = function(n){
    rtools.flower.balance = n
},
rtools.flower.checksum = function(){
    var sum = rtools.flower.sum,
        balance = rtools.flower.getbalance();
        m = balance - sum;
    if(!balance)return !1;
    if(m>0)return 1;
    else return !1;
       
},
rtools.flower.increase = function(){
    if(rtools.flower.checksum())rtools.flower.sum++;
    else return;
    $("#t-fl-n").html(rtools.flower.sum+"朵")
},
rtools.flower.decrease = function(){
    if(rtools.flower.sum>1)rtools.flower.sum-=1;
    else return;
    $("#t-fl-n").html(rtools.flower.sum+"朵")
},
rtools.flower.confirm = function(){
    if(!rtools.flower.sum && !rtools.flower.getbalance())return;
    var html = '<p class="t_c"><br>送花成功</p>';
    var num = rtools.flower.getbalance() - rtools.flower.sum;
    var api_flower = ks_host + "/usercenter/modh5flower";
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		url: api_flower,
		data: {articleid:rtools.bid,num:rtools.flower.sum,uid:rtools.uid},
		success: function(data) {
			var json = data,
				request = json.result.status.code,
				msg     = json.result.status.msg;
			if(request == 0){
				rtools.flower.setbalance(num);
				$("#t-fl-n").html("1朵");
				rtools.flower.sum = 1;
			}else{
				html = '<p class="t_c"><br>'+ msg +'</p>';
			}
			rtools.flower.hide();
			rtools.tips.getmsg(html,1.5);
			rtools.tips.show();
		}
	})
    
},
rtools.flack = rtools.flack || {};
rtools.flack.show = function(){
    rtools.animate.show(".t-flack", rtools.flack);
},
rtools.flack.hide = function(){
    rtools.animate.hide(".t-flack", rtools.flack);
},
rtools.offline = rtools.offline || {},  //离线:默认自动离线1章，手动可离线20章
rtools.offline.isShow = !1,
rtools.offline.update = function(){
    var min = kbook.cur_page+1;
    var max = kbook.cur_page+20;
    var html = '<p class="t_c"><br>离线成功(已缓存'+min+'至'+max+'章)</p>';
    $("#t-o-c").html("已缓存至"+max+"章").show();
    rtools.offline.hide();
    rtools.tips.getmsg(html);
    rtools.tips.show();
},
rtools.offline.show = function(){
    rtools.animate.show(".t-off", rtools.offline);
},
rtools.offline.hide = function(){
    rtools.animate.hide(".t-off", rtools.offline)
},
rtools.font = rtools.font || {},    //字体
rtools.font.isShow = !1,
rtools.font.sizenow = 2,
rtools.font.style = ["font-color-1","font-color-2","font-color-3"],
rtools.font.size = ["font-smaller","font-small","font-orign","font-big","font-bigger"],
rtools.font.show = function(){
    rtools.animate.show(".t-font", rtools.font);
    $("#t-f-i").off("click").on("click",rtools.font.increase);
    $("#t-f-d").off("click").on("click",rtools.font.decrease);
    $("#t-fc-1").off("click").on("click",function(){rtools.font.setstyle(0)});
    $("#t-fc-2").off("click").on("click",function(){rtools.font.setstyle(1)});
    $("#t-fc-3").off("click").on("click",function(){rtools.font.setstyle(2)});
    $("#t-fc-4").off("click").on("click",function(){rtools.font.setstyle(3)});
},
rtools.font.hide = function(){
    rtools.animate.hide(".t-font", rtools.font)
},
rtools.font.increase = function(){
    var size = rtools.font.sizenow;
    if(size<4)size+=1;
    else return;
    rtools.font.setsize(size);
    rtools.font.sizenow = size;
},
rtools.font.decrease = function(){
    var size = rtools.font.sizenow;
    if(size>0)size-=1;
    else return;
    rtools.font.setsize(size);
    rtools.font.sizenow = size;
},
rtools.font.setsize = function(n){
    var sa = rtools.font.size;
    rtools.font.romovesize();
    $("body").addClass(sa[n]);
    rtools.setting.fontsize = sa[n];
    var setting = JSON.stringify(rtools.setting);
    window.localStorage.setItem("kssetting",setting);
},
rtools.font.romovesize = function(){
    var sa = rtools.font.size;
    for(var i=0;i<sa.length;i++){
        $("body").removeClass(sa[i])
    }
},    
rtools.font.setstyle = function(n){
    var mode = rtools.read.mode,
        sa = rtools.font.style;
    var dom = $("#t-m-mode")[0];
    if(mode == "night"){
        rtools.read.change(dom);
    }
    rtools.font.removestyle();
    if(n)$("body").addClass(sa[n-1]);
    rtools.setting.fontcolor = sa[n-1];
    rtools.setting.nightmode = "day";
    var setting = JSON.stringify(rtools.setting);
    window.localStorage.setItem("kssetting",setting);
},
rtools.font.removestyle = function(){
    var sa = rtools.font.style;
    for(var i=0;i<sa.length;i++){
        $("body").removeClass(sa[i])
    }
},
rtools.read = rtools.read || {},
rtools.read.mode = "day",
rtools.read.change = function(o){       //夜间模式
    var m = rtools.read.mode;
    rtools.font.removestyle();
    if(m == "day"){
        rtools.read.mode = "night";
        $("body").addClass("night-mode");
        $(o).find("b").html("白天");
    }
    if(m == "night"){
        rtools.read.mode = "day";
        $("body").removeClass("night-mode");
        $(o).find("b").html("夜间");
    }
    rtools.setting.nightmode = rtools.read.mode;
    var setting = JSON.stringify(rtools.setting);
    window.localStorage.setItem("kssetting",setting);
},
rtools.scroll = rtools.scroll || {},    //滚屏
rtools.scroll = (function() {
    var top, timer, height = $("#chapter").height();
    function startTimer() {
        stopTimer();
        timer = setInterval(scroll, rtools.scroll.speed);
    }
    function scroll() {
        top = $("#chapfoot").scrollTop();
        window.scrollBy(0,1); 
        if(top>=height)stopTimer();
        //console.log(top+" : "+height)
    }
    function stopTimer() {
        clearInterval(timer);
    }
    return {starts:startTimer,stops:stopTimer};
})(),
rtools.scroll.isShow = !1,
rtools.scroll.speed = 50,
rtools.scroll.isstop = 1,
rtools.scroll.speedup = function(){
    var realspeed = rtools.scroll.speed, speed = 100 - realspeed;
    if(speed<=90){
        rtools.scroll.speed-=10;
    }
    rtools.scroll.start();
},
rtools.scroll.reduce = function(){
    var realspeed = rtools.scroll.speed, speed = 100 - realspeed;
    if(speed>10)rtools.scroll.speed+=10;
    else return;
    rtools.scroll.start()
},
rtools.scroll.stop = function(){
    rtools.scroll.isstop = 1;
    rtools.scroll.stops();
    rtools.scroll.showSpeed();
    rtools.scroll.coveroff()
//    $("#t-s-s").html("▶").off("click").on("click",rtools.scroll.start);
},
rtools.scroll.start = function(){
    rtools.scroll.isstop = 0;
    rtools.scroll.starts();
    rtools.scroll.showSpeed();
    rtools.scroll.coveron();
    rtools.setting.speed = rtools.scroll.speed;
    var setting = JSON.stringify(rtools.setting);
    window.localStorage.setItem("kssetting",setting);
//    $("#t-s-s").html("||").off("click").on("click",rtools.scroll.stop);
},
rtools.scroll.showSpeed = function(){
    if(rtools.scroll.timer)clearTimeout(rtools.scroll.timer);
    $("#t-s-n").html(100-rtools.scroll.speed).show();
    rtools.scroll.timer = setTimeout(function(){$("#t-s-n").fadeOut()},2000)
},
rtools.scroll.launch = function(){
    if(rtools.scroll.isstop){
        rtools.scroll.show();
        rtools.scroll.start();
    }else{
        rtools.scroll.hide();
        rtools.scroll.stop();
    }
},
rtools.scroll.coveron = function(){
    $(".t-scroll-lock").show().off("click").on("click",rtools.scroll.launch);
},
rtools.scroll.coveroff = function(){
    $(".t-scroll-lock").hide().off("click");
},
rtools.scroll.show = function(){
    rtools.scroll.start();
    rtools.animate.show(".t-scrol");
    $("#t-s-i").off("click").on("click",rtools.scroll.speedup);
    $("#t-s-d").off("click").on("click",rtools.scroll.reduce);
    $("#t-s-s").off("click").on("click",rtools.scroll.start);
},
rtools.scroll.hide = function(){
    rtools.animate.hide(".t-scrol", rtools.scroll);
    return !1;
};
rtools.int();
