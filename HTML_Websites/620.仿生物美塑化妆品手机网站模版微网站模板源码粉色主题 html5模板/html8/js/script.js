 //ZOOM 
 $(window).bind('resize load', function(){
   var iScale = $(window).width()/640;
   if(navigator.userAgent.match(/Android/i) || navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPod') != -1 || navigator.userAgent.indexOf('iPad') != -1){ 
	$("body").css({zoom:iScale,overflowX:'hidden'});
    $(".wrap").css("marginLeft" , "0").fadeIn(300);
	if($(".wrap").height()*iScale<$(window).height()){
	  $(".wrap").height($(window).height()/iScale);
	  $(".footer").css({position:'absolute',bottom:0});
    }
   }else{
     $(".wrap").fadeIn(300);
	 if($(".wrap").height()<$(window).height()){
	  $(".wrap").height($(window).height());
	  $(".footer").css({position:'absolute',bottom:0});
     }
   }
 }); 
$(function(){
 //GO BACK 
 $(".back-btn").bind("click",function(){
   history.go(-1);
 })
 //NAVGATION
 $("div.nav-btn").click(function(){
   $(this).children().show();
 }).hover(function(){},function(){
   $(this).children().hide();
 });
 //LOGO
 logo();
 function logo(){
   var wrapWidth = $(".wrap").width();
   var iScale = wrapWidth/150;
   var iSc = $(".logo img").width()/$(".logo img").height();
   $(".logo img").css({marginTop:(150-$(".logo img").height())/2+'px'});
   if(iSc>iScale && $(".logo img").width()>wrapWidth){
     $(".logo img").css({width:wrapWidth,height:'auto'});
   }
   if(iSc<iScale && $(".logo img").height()<150){
     $(".logo img").css({height:150,height:'auto'});
	 
   }
 }
 //SLIDER
 var oMover = $(".banner ul");
 var oLi = $("li",oMover);
 var iCurr = 0;
 var timer = null;
 bWidth();
 for(var i=0;i<oLi.length;i++){
   $(".focus span").append("<a></a>")
 }
 var oFocus = $(".banner .focus a");
 oFocus.first().addClass("current");
 function bWidth(){
   oLi.width($(".wrap").width())
   oMover.width(oLi.width()*oLi.length);
 }

 timer = setInterval(sliderMove,5000);
 oMover.hover(function(){
   clearInterval(timer);
 },function(){
   timer = setInterval(sliderMove,5000); 
 })
 function sliderMove(){
   iCurr=iCurr>=oLi.length-1?0:iCurr+1;
   oMover.animate({left:-oLi.width()*iCurr},300);
   oFocus.eq(iCurr).addClass("current").siblings().removeClass("current");
 }
 //LINKS
 products();
 function products(){
   var linksWidth = parseInt(($(".wrap").width()-50)/3);
   $(".products li,.links li").width(linksWidth);
   $(".products li,.links li").each(function(){
    if($(this).index()%3==1){
      $(this).css({margin:'8px 26px'});
    }
   });
 }
 //RISIZE
 $(window).bind("resize load",function(){
   defLoad();
 });
 //DEFAULT
 function defLoad(){
   bWidth();
   products();
   logo();
 }
 //ARTICLE IMG
 if($(".article img").width()>640){
   $(".article img").css({width:640,height:'auto'});
 }
 //BOOK FORM
 var iCount = parseInt($(".countNum").val());
 var iBookCount = parseInt($(".count").val());
 $(".add").bind("click",function(){
   iBookCount = iBookCount>=iCount?iCount:iBookCount+1;
   $(".count").val(iBookCount);
   if(parseInt($(".count").val()) == iCount){alert("已至最大库存量！")}
 });
  $(".subtract").bind("click",function(){
   iBookCount = iBookCount<=1?1:iBookCount-1;
   $(".count").val(iBookCount);
 });
 
 var regMobile = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/;
 
 $(".book .name,.book .mobile").bind("focus",function(){
   $(this).val("");
 }).bind("blur",function(){
   if($(this).val() == ""){
    if($(this).attr("class") == "name"){
      $(this).val("输入您的姓名");
    }else{
	  $(this).val("输入您的手机号");
	}
   }
 })
 
 $(".submit-btn").bind("click",function(){
   if($.trim($(".book .name").val()) == "" || $.trim($(".book .mobile").val()) == "" || $(".book .name").val() == "输入您的姓名" || $(".book .mobile").val() == "输入您的手机号"){
    alert("请将信息填写完整！");
	return false;
   }
   if(!regMobile.test($(".mobile").val())){
     alert("手机号码非法！");
	 return false;
   }
   $(".book").submit();
 })
 //FOOTER
})