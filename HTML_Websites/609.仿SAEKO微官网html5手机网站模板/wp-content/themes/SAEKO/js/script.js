/**
JAVASCRIPT AT SAEKO;
 */

/*-------------------------------------------*/

$(function(){

/*--------------------------------------------------------------------------*
 *  device divider
 *--------------------------------------------------------------------------*/

function sp_flug(){
if($('html').width() > 640){
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
		return false;	
	}else{
		return true;		
	}
}else{
		return false;
}
}
sp_flug();

/*--------------------------------------------------------------------------*
 *  #header
 *--------------------------------------------------------------------------*/

function drop_navi(){
if($('html').width() < 640){

	$('#header,#drop_navi').on("click", function(){
		if (!$("#nav").hasClass("active")){
		if ($("#nav").is(":hidden")){
			$("#nav").stop().slideDown("slow",function(){$("#nav").addClass('active');});
			return false;
		}
		}
	
		if ($("#nav").hasClass("active")){
		if ($("#nav").is(":visible")){
			$("#nav").stop().slideUp("slow",function(){$("#nav").removeClass('active');});
			return false;
		}
		}
		
	});

	$('#nav li a').on("click", function(){
		$("#nav").stop().hide(0,function(){$("#nav").removeClass('active');});
		return false;
	});


}else{
	$("#nav").removeAttr('style');
	$('#header,#drop_navi').on("click", function(){
		$("#nav").stop();
	});
}
}

drop_navi();

/*--------------------------------------------------------------------------*
 *  #VISUAL
 *--------------------------------------------------------------------------*/

function visual_height(){

if($('html').width() < 640){

	$('#visual').css('height',"auto");
	$('#visual img').show();
	
}else if($('html').width() < 940){
	
	var vh = ($('html').width()*19)/30;
	$('#visual').css('height',vh+"px");
	$('#visual img').hide();

}else{
	$('#visual').css('height',"auto");
	$('#visual img').show();
}

}

visual_height();

///////////////////////////

var nav = $('.nav');
var navTop = nav.offset().top;
$(window).scroll(function(){
if($('html').width() > 640){
	var winTop = jQuery(this).scrollTop();
	if (winTop >= navTop) {
		nav.addClass('fixed');
		$('#main').addClass('fixed');
	}else if(winTop <= navTop){
		nav.removeClass('fixed');
		$('#main').removeClass('fixed');
	}
}else{
	nav.removeClass('fixed');
	$('#main').removeClass('fixed');	
}
});

///////////////////////////

function background_height(){

if(sp_flug()){

if($(window).scrollTop() > 84){
	var vh = $('#visual').height();
	var sh = vh+"px";
	$('body').css({"background-attachment":"fixed","background-position":"left 56px","background-size":"auto "+sh});
}else if($(window).scrollTop() < 84){
	$('body').css({"background-attachment":"scroll","background-position":"center 140px","background-size":"100% auto"});
}

}
	
}

/*--------------------------------------------------------------------------*
 *  #topics
 *--------------------------------------------------------------------------*/

function connect_each_height(){
	$('section#topics article#topics_right div ul li a,section#topics article#topics_right div ul li span').css('height',$('section#topics article#topics_right div ul li a,section#topics article#topics_right div ul li span').width()+"px");
}

connect_each_height();



/*--------------------------------------------------------------------------*
 *  #blog
 *--------------------------------------------------------------------------*/

$('#blog .more').click(function(){
if($('html').width() > 640){
	if($('#blog .exerpt').is(':visible')){
		$(this).css("background-image","url(images/close_bt.png)");
		$('#blog .exerpt').hide();
		$('#blog .full').css({"visibility":"visible"}).fadeTo(0,0).fadeTo(2000,1);
		var fh = $('#blog .full').height() + 430;
		$('#blog').stop().animate({"height": fh + "px"},1000);
	}else{
		$(this).css("background-image","url(images/more_bt.png)");
		$('#blog').stop().animate({"height":"800px"},1000);
		$('#blog .full').hide();
		$('#blog .exerpt').show();
	}
}else{
	if($('#blog .exerpt').is(':visible')){
		$(this).css("background-image","url(images/close_bt.png)");
		$('#blog .exerpt').hide();
		$('#blog .full').show();
	}else{
		$(this).css("background-image","url(images/more_bt.png)");
		$('#blog .full').hide();
		$('#blog .exerpt').show();
	}
}
	
});

/*--------------------------------------------------------------------------*
 *  #topics
 *--------------------------------------------------------------------------*/



var lih = 0;
$('#topics #topics_left ul li').each(function(){
	lih += 26;
	var title = $("span",this).text();
	if (title.length > 35) title = title.substring(0,35) + "…";
	$("span",this).text(title);
	
});

if(lih < 150){
	$('#topics #show_more_bt').hide();
}

function topic_bt_appearance(y){
	if(typeof y === "undefined"){
		y = -130;
	}
	var lh= (lih-131)*( -1);	
		if(y < lh){
			$('#topics #show_more_bt').addClass('close').fadeTo(500,0);
		}else{
			$('#topics #show_more_bt').removeClass('close').fadeTo(500,1);
		}
	
		if(y == 0){
			$('#topics #show_more_bt_up').addClass('close').fadeTo(500,0);
		}else{
			$('#topics #show_more_bt_up').removeClass('close').fadeTo(500,1);		
		}	
}

function li_top(y){
	
	var rate = Math.round(y/130);
	var li_y = rate * 130;
	$('#topics #topics_left ul li:first-child').animate({'marginTop':li_y+"px"},2000,"easeOutQuart",function(){});
}


$('#topics #show_more_bt,#topics #show_more_bt_up').hover(function(){
	if($(this).hasClass('close')){
		$(this).hide();
	}else{
		$(this).stop().fadeTo("fast",0.7);		
	}
},function(){
	if($(this).hasClass('close')){
		$(this).hide();
	}else{
		$(this).stop().fadeTo("fast",1.0);
	}
});


///////////////////////////

$('#topics #show_more_bt').click(function(){

	$("span",this).css("background-image","url(images/topics_arrow_down.png)");
	$("#show_more_bt_up").css("display","block");

	ly = $('#topics ul li').css('margin-top').replace("px","");
	y = parseInt(ly) - 130;
	if(y > -lih){
		li_top(y);
	}
	topic_bt_appearance(y);

});

///////////////////////////

$('#topics #show_more_bt_up').click(function(){
	ly = $('#topics ul li').css('margin-top').replace("px","");	
	ly = Math.round(ly);
	y = parseInt(ly) + 130;
	$('#topics #show_more_bt_up').text(y);
	if(y <= 1){
		li_top(y);
	}
	topic_bt_appearance(y);

});


/*--------------------------------------------------------------------------*
 *  WORKS
 *--------------------------------------------------------------------------*/
function thumbnali_works(){

thumbnail_works_width = 220;
thumbnail_works_height = 312;
$('.thumbnail_works').each(function(){
	var twh = $(this).height();
	var rw = twh/thumbnail_works_height;
	var tww = $(this).width()*rw;	
	if(thumbnail_works_width < tww){
	if($(this).hasClass('left')){
		negative = 0;
	}else if($(this).hasClass('right')){
		negative = (thumbnail_works_width - tww);		
	}else{
		negative = (thumbnail_works_width - tww)/2;		
	}
	
	$(this).css("margin-left",negative);
	}
});
}

thumbnali_works();

///////////////////////////

function works_ul(){

if($('html').width() < 640){
	var hw = $('html').width();
	$('#works_sp_unit ul.slides').height((hw*1.1875)+"px");
	$('#works_sp_unit ul.slides li').css({width:(hw*0.85)+"px"});	
}

}

works_ul();

///////////////////////////

$('#works .more').click(
	function(){
		more_bt = $(this);
		if($('#works article').is(':visible')){

			$('#works article').hide(2000);
			thumbnali_works();
			more_bt.css("background-image","url(images/more_bt.png)");

		}else{			
			$('#works article').show("slow");
			thumbnali_works();
			more_bt.css("background-image","url(images/close_bt.png)");	

		}
});



/*--------------------------------------------------------------------------*
 *  RECOMMEND
 *--------------------------------------------------------------------------*/
function recommend_hover(){
if($('html').width() > 640){
$('#recommend .slides li').hover(function(){
	
	$("span",this).css("top","172px").stop().animate({"top":"0px"},300,"swing");
	
},function(){
	
});
}
}

recommend_hover();

/*--------------------------------------------------------------------------*
 *  Hash auto scroll 
 *--------------------------------------------------------------------------*/
$("a[href^=#]").click(function(){
		var Hash = $(this.hash);
		var HashOffset = $(Hash).offset().top;
		$("html,body").animate({
			scrollTop: HashOffset
		}, 1000);
		return false;
});

/*--------------------------------------------------------------------------*
 *  a hover 
 *--------------------------------------------------------------------------*/
function a_hover(){
if($('html').width() > 640){
$('a').not('.nav li a').hover(function(){
		$(this).stop().fadeTo("fast",0.7);
	},function(){
		$(this).stop().fadeTo("fast",1.0);	
});
}else{

$('a').not('.nav li a').hover(function(){
		$(this).stop().fadeTo("fast",1);
	},function(){
		$(this).stop().fadeTo("fast",1);	
});
	
}
}

a_hover();

/*--------------------------------------------------------------------------*
 * nav a hover 
 *--------------------------------------------------------------------------*/
$('.nav li a').hover(function(){
		$(this).stop().fadeTo("fast",1.0);
	},function(){
		$(this).stop().fadeTo("fast",0.6);	
});

/*--------------------------------------------------------------------------*
 *  scroll
 *--------------------------------------------------------------------------*/

$(window).bind('scroll',function(e){
	background_height();
});


/*--------------------------------------------------------------------------*
 *  .to_top
 *--------------------------------------------------------------------------*/
function to_top_visible(){
if($('html').width() > 640){
var ct = $('#content').offset().top;
if ($(this).scrollTop() > ct) {
	$('.to_top').fadeIn();
} else {
	$('.to_top').fadeOut();
}

}else{
	$('.to_top').fadeOut();	
}

}

/*--------------------------------------------------------------------------*
 *  #to_scroll
 *--------------------------------------------------------------------------*/
function to_scroll(){
if($('html').width() > 640){
if ($(this).scrollTop() < 2) {
	$('#to_scroll').fadeIn();
} else {
	$('#to_scroll').fadeOut();
}

}else{
	$('#to_scroll').fadeOut();	
}

}

$(window).scroll(function(){

to_top_visible();
to_scroll();

});

/*--------------------------------------------------------------------------*
 *  resize
 *--------------------------------------------------------------------------*/

$(window).resize(function(){
	sp_flug();
	connect_each_height();
	visual_height();
	background_height();
	works_ul();
	recommend_hover();
	a_hover();
	drop_navi();
	to_top_visible();
});

});