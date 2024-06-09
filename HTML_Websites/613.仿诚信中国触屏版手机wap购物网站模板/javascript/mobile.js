$(function(){
    //返回顶部
    $("#toTop").click(function(){
        $('html,body').animate({scrollTop: '0px'}, 200);
        return false;
    });
    //所有分类展开折叠
	var $box = $("#allClass");
	$("#showAll").click(function(){
		$box.animate({right: "0px"});
	});
	$("#closeMe").click(function(){
		$box.animate({right: "-180px"});
	});
	//设置字号
	var sWidth = $(window).width();
	if(sWidth < 255){
		$("body").css("font-size","12px");
	}
	// 去除产品详情中img的行内样式
	$(".lsdcontent img").removeAttr("style");
	$(".lsdcontent img").removeAttr("width");
	$(".lsdcontent img").removeAttr("height");
	$(".lsdcontent img").removeAttr("align");
    $(".close a").click(function(){
        confirm("你确定要关闭交易");
    });
});