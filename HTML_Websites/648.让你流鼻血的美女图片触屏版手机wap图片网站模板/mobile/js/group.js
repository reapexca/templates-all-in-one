$(document).ready(function(){	
					   
	//mouseover效果
	function liMouseOn(){
		$(".silder .wallpaper li").attr("class","");
		for(var i=0; i<$(".silder .wallpaper li").length;i++) {
			(function(j){
				$(".silder .wallpaper li:eq("+j+")").mouseover(function(){
					if($(".silder").attr("class") == "dSmallList" || $(".silder").attr("class") == "dMiddleList") {
						if($(this).attr("class") != "liSelected") {
							$(this).attr("class","liSelected");
						}
					}
				});
				$(".silder .wallpaper li:eq("+j+")").mouseout(function(){
					if($(".silder").attr("class") == "dSmallList" || $(".silder").attr("class") == "dMiddleList") {
						if($(this).attr("class") == "liSelected") {
							$(this).attr("class","");
						}
					}
				});
			}) (i);
		}
	}
	
	//定义当前、之前、之后要显示图片的排位
	var curPic=0,nextPic=-1,prePic=-1;preShowPic=-1;
	var allPic=$(".silder .wallpaper li").length;
	
	//输出总数
	$(".silder .title i").html($("ul.wallpaper li").length);
	$(".silder .title em").html()
	
	//初始化当前、之前、之后要显示图片的排位
	function numInit(num){
		if(num=="init"){
			if(allPic > 1) {
				nextPic=curPic+1;
				prePic=allPic-1;
			}else if(allPic == 1){
				nextPic=0;
				prePic=0;
			}
			$(".silder .wallpaper li:eq("+curPic+")").attr("class","liSelected");
		}else if(num == "plus"){
			preShowPic=curPic;
			prePic=curPic;
			curPic=nextPic;
			if(curPic < (allPic-1)) {
				nextPic=curPic+1;
			}else if(curPic == (allPic-1)) {
				nextPic=0;
			}
			$(".silder .wallpaper li:eq("+curPic+")").attr("class","liSelected");
			if(preShowPic != curPic) {
				$(".silder .wallpaper li:eq("+preShowPic+")").attr("class","");
			}
		}else if(num == "minus") {
			preShowPic=curPic;
			nextPic=curPic;
			curPic=prePic;
			if(curPic > 0) {
				prePic=curPic-1;
			}else if(curPic == 0 && allPic > 1) {
				prePic=allPic-1;
			}
			$(".silder .wallpaper li:eq("+curPic+")").attr("class","liSelected");
			if(preShowPic != curPic) {
				$(".silder .wallpaper li:eq("+preShowPic+")").attr("class","");
			}
		}else{
			preShowPic=curPic;
			curPic=num;
			if(curPic == (allPic-1)) {
				nextPic=0;
				if(allPic > 1) {
					prePic=curPic-1;
				}else if(allPic == 1) {
					prePic=0;
				}
			}else if(curPic == 0) {
				prePic=allPic-1;
				if(allPic > 1) {
					nextPic=1;
				}else if(allPic == 1) {
					nextPic=0;
				}
			}else{
				nextPic=curPic+1;
				prePic=curPic-1;
			}
			$(".silder .wallpaper li:eq("+curPic+")").attr("class","liSelected");
			if(preShowPic != curPic) {
				$(".silder .wallpaper li:eq("+preShowPic+")").attr("class","");
			}
		}
		$(".silder .title em").html(curPic+1);
	}
	
	//大图左右按钮初始化
	function btnAInit(){
		if(allPic < 2) {
			$("#sLeftBtnA").attr("class","sLeftBtnABan");
			$("#sRightBtnA").attr("class","sRightBtnABan");
		}else{
			if(curPic == 0) {
				$("#sLeftBtnA").attr("class","sLeftBtnABan");
				$("#sRightBtnA").attr("class","sRightBtnA");
			}else if(curPic == (allPic-1)) {
				$("#sLeftBtnA").attr("class","sLeftBtnA");
				$("#sRightBtnA").attr("class","sRightBtnABan");
			}else{
				$("#sLeftBtnA").attr("class","sLeftBtnA");
				$("#sRightBtnA").attr("class","sRightBtnA");
			}
		}
	}

	//大图按钮效果
	$("#sLeftBtnA").mouseover(function(){
		if($(this).attr("class")=="sLeftBtnA") {
			$(this).attr("class","sLeftBtnASel");
		}
	});
	
	$("#sLeftBtnA").mouseout(function(){
		if($(this).attr("class")=="sLeftBtnASel") {
			$(this).attr("class","sLeftBtnA");
		}
	});
	
	$("#sLeftBtnA").click(function(){
		if($(this).attr("class")=="sLeftBtnASel") {
			numInit("minus");
			if(curPic == 0) {$("#sLeftBtnA").attr("class","sLeftBtnABan");}
			if(curPic < (allPic-1) && $("#sRightBtnA").attr("class")=="sRightBtnABan") {$("#sRightBtnA").attr("class","sRightBtnA");}
		}
	});
	
	$("#sRightBtnA").mouseover(function(){
		if($(this).attr("class")=="sRightBtnA") {
			$(this).attr("class","sRightBtnASel");
		}
	});
	
	$("#sRightBtnA").mouseout(function(){
		if($(this).attr("class")=="sRightBtnASel") {
			$(this).attr("class","sRightBtnA");
		}
	});
	
	$("#sRightBtnA").click(function(){
		if($(this).attr("class")=="sRightBtnASel") {
			numInit("plus");
			if(curPic == (allPic-1)) {$("#sRightBtnA").attr("class","sRightBtnABan");}
			if(curPic > 0 && $("#sLeftBtnA").attr("class")=="sLeftBtnABan") {$("#sLeftBtnA").attr("class","sLeftBtnA");}
		}
	});

	liMouseOn();
	numInit("init");
	btnAInit();
});