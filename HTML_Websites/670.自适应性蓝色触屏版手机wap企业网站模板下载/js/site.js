
$(document).ready(function() {

	
	/*Accordion*/
	$( "#accordion_menu" ).accordion();
	
	/*Like*/
	$("a.like").toggle(function() {
	   $('a.like').css('backgroundPosition', 'right -30px');
       }, function(){
       $('a.like').css('backgroundPosition', 'right 1px');
	   return(false);
	});
	/*Search*/
	$(".nav_search a").toggle(function() {
		 $('#search').slideDown(400);	
		 }, function(){
		 $('#search').slideUp(300);		 
	});
	/* Drop Down Menu */
	$(".navigation > li.dropdown").click(function () {
		$(this).toggleClass("expanded");
	});
	

	
});