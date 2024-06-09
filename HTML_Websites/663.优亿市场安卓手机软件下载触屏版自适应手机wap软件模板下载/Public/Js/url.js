// JavaScript Document

/*
alert( "1:   "   +   window.location.href);
alert( "2:   "   +   window.location);
alert( "3:   "   +   location.href);
alert( "4:   "   +   parent.location.href);
alert( "5:   "   +   top.location.href);
alert( "6:   "   +   document.location.href); 
*/
//alert(GetRequest());
 
var r = new RegExp("\\?(?:.+&)?channel=(.*?)(?:&.*)?$");  
var m = window.location.toString().match(r);  
if(m){
	
	document.write(unescape("%3Cscript src='index/channel@channel="+ m[1] +"' type='text/javascript'%3E%3C/script%3E"));

}

