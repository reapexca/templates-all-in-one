$(document).ready(function(){
	//弹出提示窗
	/*
	(function(){
		if(!getCookie("bookmark")){
			showWin();
			
			$("#tips-win .close").click(function(){
				$("#tips-win").hide();
				setCookie("bookmark", true, 7);
			});
		}
	})();
	*/
});

function showWin(){
	var str = '<div class="tips-win" id="tips-win"><div class="tips-win-inner"><p>';

	if(isIOS()){
		str += '添加“家庭医生在线”快捷方式到桌面。请按<em></em>然后点选添加主屏幕。';
	}else{
		str += '添加“家庭医生在线”到书签。点击下方的<i></i>选择“添加书签。';
	}

	str += '</p><a class="close" href="javascript:;">×</a><small></small></div></div>';
	$('body').append(str);
}

function isIOS(){ 
	var ua = navigator.userAgent.toLowerCase(); 
	if(ua.match(/ipad/i)=="ipad" || ua.match(/iphone/i)) { 
	   return true; 
	} else { 
	   return false; 
	} 
}

function setCookie(name, value, days){
	var date=new Date();   
	date.setTime(date.getTime()+days*24*60*60*1000);  
	document.cookie=name+"="+escape(value)+";expires="+date.toGMTString();  
}

function getCookie(name){  
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");  
	if(arr=document.cookie.match(reg)){  
		return unescape(arr[2]);  
	}  
	else{  
		return null;  
	}  
}