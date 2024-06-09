function getData(obj,value){
    ajaxkey = false;
	$('.loading').show();
	$.ajax({
		url:'../../../../e/plus/ajax.php',
		type:'get',
		data:{act:'showlist', classid:value['classid'], page:value['page'], num:value['num'], out_id:value['out_id']},//设置请求的数据
		success:function(data){
			if(data=="end"){
				return false;
			}
			var data=jQuery.parseJSON(data);
			var box = '';
			var pubu = $(obj);
			$.each(data,function(i,item) {
				box+="<div class='box'><a href='"+item.titleurl+"'><strong class='title'>"+item.title+"</strong><p class='text'>"+item.smalltext+"</p></a></div>";
			})
			pubu.append(box);
		},complete:function(){
			$('.loading').hide();
			ajaxkey = true;
			return true;
		}
     });
}

function getSearchData(obj,value){
    ajaxkey = false;
	$('.loading').show();
	$(".error").html('');
	$(".error").hide();
	$.ajax({
		url:'../../../../e/search/result/index_ajax.php',
		type:'get',
		data:{page:value['page'], searchid:value['searchid']},//设置请求的数据
		success:function(data){
			var data=jQuery.parseJSON(data);
			var box = '';
			var pubu = $(obj);
			if(data.error!=''){
				$(".error").html(data.error);
				$(".error").show();
				return false;
			}else{
				box = data.string;
			}
			pubu.append(box);
		},complete:function(){
			$('.loading').hide();
			ajaxkey = true;
			return true;
		}
     });
}

function getPlData(obj,value){
    ajaxkey = false;
	$('.loading').show();
	$.ajax({
		url:'../../../../e/pl/index_ajax.php',
		type:'get',
		data:{page:value['page'], "classid": value['classid'], "id": value['id']},//设置请求的数据
		success:function(data){
			if(data == 'error'){
				$(".loading").html("没有更多评论");
				setTimeout(function(){$(".loading").hide()},2000);
				return false;
			}else{
				result = '';
				var data=jQuery.parseJSON(data);
				$.each(data,function(i,item) {
					li = '<div class="li">';
					li += '<div class="top"><span class="time">'+item.pltime+'</span></div>';
					li += '<div class="center">'+item.pltext+'</div>';
					li += '<div class="bottom"><div class="left"><span class="good" onClick="JavaScript:makeRequest(\'doaction.php?enews=DoForPl&plid='+item.plid+'&classid='+item.classid+'&id='+item.id+'&dopl=1&doajax=1&ajaxarea=zcpldiv'+item.plid+'\',\'EchoReturnedText\',\'GET\',\'\');"><i id="zcpldiv'+item.plid+'">'+item.zcnum+'</i></span><span class="bad" onClick="JavaScript:makeRequest(\'doaction.php?enews=DoForPl&plid='+item.plid+'&classid='+item.classid+'&id='+item.id+'&dopl=0&doajax=1&ajaxarea=fdpldiv'+item.plid+'\',\'EchoReturnedText\',\'GET\',\'\');"><i id="fdpldiv'+item.plid+'">'+item.fdnum+'</i></span></div><div class="right"><span class="reply" plid="'+item.plid+'">回复</span></div></div>';
					li += '<div class="pl_input" id="pl_input_'+item.plid+'"></div>';
					li += '</div>';
					
					result += li;
				})
				var pubu = $(obj);
				pubu.append(result);
				$('.loading').hide();
				$("#morepl").show();
			}
		},complete:function(){
			ajaxkey = true;
			return true;
		}
     });
}

//判断请求数据的开关
function getDataCheck(){
    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if($(document).height()<=totalheight){
		return true;
	}else{
		return false;
	}
}


document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    window.shareData = {
        "imgUrl": "../../../../../upfile.xiashanet.com/image/newslogo.jpg",
        "timeLineLink": document.URL,
        "sendFriendLink": document.URL,
        "weiboLink": document.URL,
        "tTitle": document.title,
        "tContent": "",
        "fTitle": document.title,
        "fContent": "",
        "wContent": ""
    };

    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.shareData.sendFriendLink,
            "desc": window.shareData.fContent,
            "title": window.shareData.fTitle
        }, function(res) {
            _report('send_msg', res.err_msg);
        })
    });

    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, function(res) {
            _report('timeline', res.err_msg);
        });
    });

    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
        WeixinJSBridge.invoke('shareWeibo', {
            "content": window.shareData.wContent,
            "url": window.shareData.weiboLink,
        }, function(res) {
            _report('weibo', res.err_msg);
        });
    });
}, false);

