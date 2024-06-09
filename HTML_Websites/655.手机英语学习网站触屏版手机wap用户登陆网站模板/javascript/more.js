$(function(){
   $("li.more").click(function(){
     $(this).toggleClass("on")
   });
    
   var url=window.location.href;
   if(url=="login.html@type=tfdown"){
       $("#registerId").attr("href","register.html@type=tfdown");
   }else if(url=="login.html@type=ysdown"){
       $("#registerId").attr("href","register.html@type=ysdown");
   }


 })



$(function(){
	$("li.more").click(function(){
		$(this).toggleClass("on")
	});
	$('.menguo_cls').click(function(event){
		console.log(event);
		$(this).parent().slideUp();
		return false;
	});
})


 function showdaydiv(obj){
    for (var i = 1; i <= 3; i++) {      
    if (obj== i) {  
      $("#d"+i).addClass("on");
      $("#day" + i).show();  
    } else {     
      $("#d"+i).removeClass("on");
      $("#day" + i).hide();     
     }      
    } 
   } 