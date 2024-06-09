//JS


//统一弹窗 ok为1为错误弹窗 默认为成功弹窗 js为1为刷新 默认不刷新
function notice_box(msg,ok,js){
	if(!msg)msg='';
	if(!ok)ok='';
	if(!js)js='';
	if(ok==1){

		var str = '<div id="msg" class="pop-tips" style="-webkit-transform:translateY(10px); -webkit-transition: all 0.5s ease; transition: all 0.5s ease;"><div class="pop-tips-content pop-tips-error"><i class="fontIcon tips-ico-error"></i>'+msg+'</div></div>';
	
	}else{
		var str = '<div id="msg" class="pop-tips" style="-webkit-transform:translateY(10px); -webkit-transition: all 0.5s ease; transition: all 0.5s ease;"><div class="pop-tips-content pop-tips-correct"><i class="fontIcon tips-ico-correct"></i>'+msg+'</div></div>';
	
	}
	//var str = '<div id="msg" class="pop-tips" style="-webkit-transform:translateY(10px); -webkit-transition: all 0.5s ease; transition: all 0.5s ease;"><div class="pop-tips-content pop-tips-correct"><i class="fontIcon tips-ico-correct"></i>'+msg+'</div></div>';
	
	$("#msg").remove();
	$(document.body).append(str);
	var time = 3;
	var tt = setInterval(function() {
		time--;
		//$("#idtime").html(time);
		if (time <= 0) {
			$("#msg").remove();
			clearInterval(tt);
			return;
		}
	}, 1000);
	
}
function scscms_alert(msg,sign,ok,can){
	var c_=false;//是否已经关闭窗口，解决自动关闭与手动关闭冲突
	sign=sign||"";
	
	var s="<div id='mask_layer'></div><div id='scs_alert'><div id='alert_top'></div><div id='alert_bg'><div id='alert_tit'>聚橙网提醒</div><div id='alert_txt'><div id='inco_"+sign+"'></div>"+msg+"<br></div>";
	if (sign=="confirm"){
		s+="<div class='alert_btn'><a href='javascript:void(0)' id='confirm_ok'>确 定</a><a href='javascript:void(0)' id='confirm_cancel'>取 消</a></div>";
	}else{
		s+="<div class='alert_btn'><a href='javascript:void(0)' id='alert_ok'>确 定</a></div>"
	}
	s+="</div><div id='alert_foot'></div></div>";
	$("body").append(s);
	$("#scs_alert").css("margin-top",-($("#scs_alert").height()/2)+"px"); 
	$("#scs_alert").focus(); //获取焦点，以防回车后无法触发函数

	if (typeof can == "number"){
	//定时关闭提示
		setTimeout(function(){
			close_info();
		},can*1000);
	}
	function close_info(){
	//关闭提示窗口
		if(!c_){
		$("#mask_layer").fadeOut("fast",function(){
			$("#scs_alert").remove();
			$(this).remove();
		});
		c_=true;
		}
	}
	$("#alert_ok").click(function(){
		close_info();
		if(typeof(ok)=="function")ok();
	});
	$("#confirm_ok").click(function(){
		close_info();
		if(typeof(ok)=="function")ok();
	});
	$("#confirm_cancel").click(function(){
		close_info();
		if(typeof(can)=="function")can();
	});
	function modal_key(e){	
		e = e||event;
		close_info();
		var code = e.which||event.keyCode;
		if (code == 13 || code == 32){if(typeof(ok)=="function")ok()}
		if (code == 27){if(typeof(can)=="function")can()}		
	}
	//绑定回车与ESC键
	if (document.attachEvent)
		document.attachEvent("onkeydown", modal_key);
	else
		document.addEventListener("keydown", modal_key, true);
}