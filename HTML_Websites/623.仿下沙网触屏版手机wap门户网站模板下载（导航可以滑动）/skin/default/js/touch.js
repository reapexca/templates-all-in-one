var touchX = [];
var touchY = [];
var htouchX=[];
var htouchY=[];
var imgw = 408;
var x,y;        
var inoff;
function touchStart(event) {
	htouchX = [];
	htouchY = [];
	inoff = $("#idSlider").offset();
	x = event.touches[0].pageX;
	y = event.touches[0].pageY;
	htouchX.push(x);
	htouchY.push(y);
}            
function touchMove(event) {
	event.preventDefault();
	var nowoff= $("#idSlider").offset();
	var touches = event.touches;
	var fristTouch = touches[0];
	var lastX = $(window).scrollLeft();
	var lastY = $(window).scrollTop();
	touchX.push(fristTouch.pageX);
	touchY.push(fristTouch.pageY);
			
	var mdis = touchX[0] - touchX[1];
	var mdisy = touchY[0] - touchY[1];
	if (Math.abs(mdisy) > 5) {
		
	}else{
		event.preventDefault();
		var md = touchX[touchX.length - 1] - touchX[touchX.length - 2];
		$("#idSlider").css({"left": $("#idSlider").offset().left + md});
	}
}
//触屏  离开屏幕事件

function touchEnd(event) {
	event.preventDefault();
	var num = $("#idSlider li").length;
	var touches = event.touches;
	var fristTouch = touches[0];
	var yuluoffset = $("#idSlider").offset();
	if (touchX != undefined && touchX.length > 1) {
		var startX = parseInt(touchX.shift(), 10);
		var endX = parseInt(touchX.pop(), 10);
		var disValue = Math.abs(startX - endX);
		var xvalue = startX - endX;
		if (touchY.length > 1) {
			var lastX = $(window).scrollLeft();
			event.preventDefault();
			var dis = touchY[touchY.length - 2] - touchY[touchY.length - 1];
			if (Math.abs(dis) > 50 && Math.abs(dis) > disValue) {
				window.scrollTo(lastX, window.lastY + dis);
			} else {
				if (disValue > 50) {
					if (xvalue > 0) {
						if (inoff.left <= -(num - 1) * imgw) {
							inoff.left = 0;
							var X = 0;
						} else
							var X = inoff.left - imgw ;
					}
					else {
						if (inoff.left >= 0) {
							inoff.left = -(num - 1) * imgw;
							var X = -(num - 1) * imgw;
						} else
							var X = inoff.left + imgw;
					} 
					$("#idSlider li").removeClass("on");
					$("#idSlider").animate({"left": X});
					var index = Math.ceil(Math.abs(X) / 408);
					var obj=$('#idNum li').eq(index);
				   $('#idNum li').each(function (){
						$(this).find('span').eq(0).removeClass("on");
						$(this).find('span').eq(1).addClass("hide");
				   })
					obj.find('span').eq(0).addClass("on");
					obj.find('span').eq(1).removeClass("hide");
				}
			}
		}
	} else {
			return false;
	}
	touchX = [];
	touchY = [];
}



   function navtouchMove(event){  
	event.preventDefault();
	var touches = event.touches;
	var fristTouch = touches[0];
	var lastX = $(window).scrollLeft();
	var lastY = $(window).scrollTop();
	htouchX.push(fristTouch.pageX);
	htouchY.push(fristTouch.pageY);
}
function navtouchEnd(event){
	var touches = event.touches;
	var fristTouch = touches[0];
	$("#nav1 .navcon").width();
	var yuluoffset = $("#nav1 .navcon").offset();
   var dis= htouchX[htouchX.length-1]-htouchX[0];
   var movex=yuluoffset.left+dis;
   if(movex>=0){
		$("#nav1 .navcon").animate({"left":10});
		$("#nav1 .navcon").animate({"left":0});
   }
  else if(movex<-300){
	   $("#nav1 .navcon").animate({"left":-310});
	   $("#nav1 .navcon").animate({"left":-300});
   }
   else{
   $("#nav1 .navcon").animate({"left":movex});
   }        
	htouchX = [];
	htouchY = [];
}            

/**
 *  绑定触屏触发事件
 * @param start
 * @param end
 */
//            function bindEvent(start, end) {
//                if (start >= end) {
//                    st.Next();
//                } else {
//                    st.Previous();
//                }
//            }
//            st.Run();