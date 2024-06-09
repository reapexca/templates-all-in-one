var t;
var s, m, sm, ss;
var obj, audio;
function changeTime() {
	console.log(parseInt(audio.duration - audio.currentTime));
	s = parseInt(audio.duration - audio.currentTime) % 3600;
	m = Math.floor(s / 60);
	if (s > 59) {
		s = s % 60;
	}
	sm = m < 1 ? "" : m + "'";
	ss = (s < 10 ? "0" + s : s) + "\"";
	obj.find("em").html(sm + ss);
	t = setTimeout("changeTime()", 100);
}


//智能机浏览器版本信息:
var browser = {
    versions:function(){
        var u = navigator.userAgent;
        return{
        	//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};
var t = 0;
var downTemp=0;
var upTemp=0;
var scrollFunc = function (obj,nav,scollTop) {
	//上推
	if(t<scollTop){
		if(scollTop<44){
			obj[0].style.top = -scollTop+"px";
			nav[0].style.display = 'none';
		}else{
			if(scollTop-upTemp<44){
				obj[0].style.top = (upTemp-scollTop)+"px";
				nav[0].style.display = 'none';
			}else{
				obj[0].style.top = -44+"px";
			}
		}
		downTemp = scollTop;
	}else{
	//下拉
		if(scollTop<44){
			//obj.css({top:-scollTop+"px"});
		}else{
			if(downTemp-scollTop<44){
				obj[0].style.top = (downTemp-scollTop-44)+"px";
				nav[0].style.display = 'none';
			}else{
				obj[0].style.top = "0px";
			}
		}
		upTemp = scollTop;
	}
	setTimeout(function(){
		t = scollTop;
	}, 0);
};

$(function(){
	var nav = $("#nav");
	$(".menu-icon").live('click',function(){
		if (nav.css('display') == 'none') {
			nav.css('display','block');
		}else{
			nav.css('display','none');
		}
	});
	var likeCount = 0;
	//顶 踩
	$(".up-btn").live('click',function(){
		if(!$(this).hasClass("up-btn-green")){
			likeCount = parseInt($(this).parent().next().find("span").html());
			if($(this).parent().next().next().find(".dn-btn").hasClass("dn-btn-red")){
				$(this).parent().next().next().find(".dn-btn").removeClass("dn-btn-red");
				$(this).parent().next().find("span").html(likeCount+2);
			}else{
				$(this).parent().next().find("span").html(likeCount+1);
			}
			$(this).addClass("up-btn-green");
		}
	});
	
	$(".dn-btn").live('click',function(){
		if(!$(this).hasClass("dn-btn-red")){
			likeCount = parseInt($(this).parent().prev().find("span").html());
			if($(this).parent().prev().prev().find(".up-btn").hasClass("up-btn-green")){
				$(this).parent().prev().prev().find(".up-btn").removeClass("up-btn-green");
				$(this).parent().prev().find("span").html(likeCount-2<0?0:likeCount-2);
			}else{
				$(this).parent().prev().find("span").html(likeCount-1<0?0:likeCount-1);
			}
			$(this).addClass("dn-btn-red");
		}
	});
	
	//关闭下载
	$(".dn-close").live("click",function(){
		$(this).parent().hide();
	});
	
	if(browser.versions.iPad||browser.versions.iPhone){
		$("#download").attr("href","../https@itunes.apple.com/cn/app/ju-you-qu-wei-sheng-huo-zhong/id826286258@mt=8");
		$("#downloadicon").attr("href","../https@itunes.apple.com/cn/app/ju-you-qu-wei-sheng-huo-zhong/id826286258@mt=8");
	}
	//下一页
	var pageNum = $("#pagination_pageNo").val();
	var pageTotal = $("#pagination_pageTotal").val();
	var nextUrl = $("#next_url").val();
	var contentT = 0;
	$(window).scroll(function() {
		var window_height = $(window).height();
		var document_height = $(document).height();
		var scoll =  $(document).scrollTop();
		if((window_height+scoll)+100>document_height){
			if(pageNum<=pageTotal){
				pageNum++;
				$.ajax({
					type:"GET", 
					url:nextUrl+pageNum,
					dataType:"html",
					success:function (msgData, textStatus) {
						if(msgData!=null&&msgData!=""){
							$("#data-list").append(msgData);
						}
					}
				});
			}
		}
		
		//二级页
		if(document_height-44<=window_height+scoll){
			if(contentT<scoll){
				$(".tab-bar")[0].style.top = ((window_height+scoll)-document_height)+'px';
			}else{
				$(".tab-bar")[0].style.top = '0px';
			}
			downTemp = scoll+44;
			contentT = scoll;
		}else{
			//if(document_height-44>window_height+scoll){
			scrollFunc($(".tab-bar"),nav,scoll);
			//}
		}
	});
	
	// ---------------语音Start---------------------------------------------------
	var radioSpan;
	var playId;
	$(".radio").click(function(event) {
		radioSpan = $(this);
		playId = radioSpan.attr("data-id-bak");
		$(".radio").find("span").each(function() {
			if ($(this).hasClass("radioBgCur")) {
				$(this).removeClass("radioBgCur");
			}
			var playId2 = $(this).parent().attr("data-id-bak");
			if (playId != playId2) {
				var audio = document.getElementById(playId2);
				audio.pause();
			}
		});
		radioSpan.find("span").addClass("radioBgCur");
		audio = document.getElementById(playId);
		if (!audio.paused) {
			audio.pause();
		} else {
			audio.play();
			obj = $(this);
		}
		audio.addEventListener("timeupdate", function() {
			s = parseInt(audio.duration - audio.currentTime) % 3600;
			m = Math.floor(s / 60);
			if (s > 59) {
				s = s % 60;
			}
			sm = m < 1 ? "" : m + "'";
			ss = (s < 10 ? "0" + s : s) + "\"";
			obj.find("em").html(sm + ss);
		});
		stopBubble(event);
		event.preventDefault();
	});

	function stopBubble(e) {
		if (document.attachEvent) {// ie
			window.event.cancelBubble = true;
		} else {
			e.stopPropagation();
		}
	}
	// ---------------语音end---------------------------------------------------------
	
	// ---------------gif图start---------------------------------------------------
	$(".gif-post").live('click',function() {
		var do_img = $(this).find('img:first');
		var do_img_src = do_img.attr("src");
		if (do_img_src.indexOf("!") > 0) {
			do_img.attr("src", do_img_src.substring(0, do_img_src.indexOf("!")));
			$(this).find('.play').hide();
		} else {
			do_img.attr("src", do_img_src + "!w500static");
			$(this).find('.play').show();
		}
	});
	// ---------------gif图end-----------------------------------------------------
});