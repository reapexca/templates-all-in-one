// JavaScript Document
//右侧就医服务新
document.writeln("<div class=\"QQboxa\" id=\"divQQboxa\" style='right:0px;POSITION:absolute;TOP:180px; width:36px'>");
document.writeln("<div class='Qlista' id='divOnlinea' style='display : block;width:36px;'>");
document.writeln("<div class=\"conaa\">");
document.writeln('<a href=\"http://wt.zoosnet.net/LR/Chatpre.aspx?id=LRW41861572\"><img src=\"/templets/shouji/images/floatService.gif" class=\"press\" alt=\"在线客服\"></a>');
document.writeln("<\/div>");
document.writeln("<\/div>");
document.writeln("<\/div>");

//<![CDATA[
var tips; var theTop = 180/*这是默认高度,越大越往下*/; var old = theTop;
function initFloatTips() {
  tips = document.getElementById('divQQboxa');
  moveTips();
};
function moveTips() {
  var tt=50;
  if (window.innerHeight) {
    pos = window.pageYOffset
  }
  else if (document.documentElement && document.documentElement.scrollTop) {
    pos = document.documentElement.scrollTop
  }
  else if (document.body) {
    pos = document.body.scrollTop;
  }
  pos=pos-tips.offsetTop+theTop;
  pos=tips.offsetTop+pos/10;

  if (pos < theTop) pos = theTop;
  if (pos != old) {
    tips.style.top = pos+"px";
    tt=10;
  //alert(tips.style.top);
  }

  old = pos;
  setTimeout(moveTips,tt);
}
//!]]>
initFloatTips();

function OnlineOver(){
	document.getElementById("divMenua").style.display = "none";
	document.getElementById("divOnlinea").style.display = "block";
	document.getElementById("divQQboxa").style.width = "36px";
}
function OnlineOut(){
	document.getElementById("divMenua").style.display = "block";
	document.getElementById("divOnlinea").style.display = "none";
}

 function hideMsgBox(theEvent){  //theEvent用来传入事件，Firefox的方式
 　       if (theEvent){
   　           var browser=navigator.userAgent;   //取得浏览器属性
   　           if (browser.indexOf("Firefox")>0){  //如果是Firefox
    　　             if (document.getElementById('divOnlinea').contains(theEvent.relatedTarget)) {  //如果是子元素
     　　                  return;   //结束函式
                        } 
                  } 
                  if (browser.indexOf("MSIE")>0){  //如果是IE
                       if (document.getElementById('divOnlinea').contains(event.toElement)) {  //如果是子元素
                                return;  //结束函式
                          }
                   }
             }
            /*要执行的操作*/
		document.getElementById("divMenua").style.display = "block";
		document.getElementById("divOnlinea").style.display = "none";
 }
 
 function left_closes()
	{
	document.getElementById("divQQboxa").innerHTML="";
	}




////////////////////////底部


document.write('<style>')
document.write(".bottom-fixed{position:fixed;z-index:10000;height:45px;width:310px;bottom:0;text-align:center;border-top:1px solid #fff;background:url(bot-bg.jpg) repeat;*bottom:auto;*position:absolute;*top:expression(eval(document.documentElement.scrollTop+657))}")
document.write("</style>")

document.write('<div class="bottom-fixed"><img src="http://wap.ar0101.com/bottom.jpg" border="0" usemap="#Mapbt" /><map name="Mapbt" id="Mapbt"><area shape="rect" coords="76,3,161,35" href="tel:4000189777" /><area shape="rect" coords="6,4,74,35" href="http://wt.zoosnet.net/LR/Chatpre.aspx?id=LRW41861572" /><area shape="rect" coords="166,4,235,36" href="http://wap.ar0101.com/yiyuandizhi/" /></map></div>')