//放到网站公共尾部，记录用户的网站访问记录
var _ckpag_u = 0;
function getRandom(min,max){
    return Math.floor(min+Math.random()*(max-min));
}
if (getCkCookie('_ck_uName')) {
	_ckpag_u = getCkCookie('_ck_uName');
	setCkCookie('_ck_uName', _ckpag_u);
} else {
	var _ckpage_nt = new Date;
	_ckpag_u = _ckpage_nt.getTime() + '' + getRandom(100000000,999999999);
	setCkCookie('_ck_uName', _ckpag_u);
}
function setCkCookie(name, val) {
    var expires = new Date(9999, 11, 31); //month:0~11
    document.cookie = name + "=" + escape(val) + "; expires=" + expires.toGMTString() + ";path=/;domain=chuanke.com";
}
function getCkCookie(name) {
    var ck = document.cookie.split("; ");
    for (var i = 0; i < ck.length; i++) {
        var c = ck[i].split("=");
        if (name == c[0]) return unescape(c[1]);
    }
}
var _ckpage_url = "../web.stat.chuanke.com/ckpage.php";
document.write("<img style=\"display:none\" src=\"" + _ckpage_url + "?h=" + encodeURIComponent(top.location.href) + "&r=" + encodeURIComponent(window.document.referrer) + "&ua=" + encodeURIComponent(navigator.userAgent) + "&an=" + encodeURIComponent(navigator.appName) + "&pf=" + encodeURIComponent(navigator.platform) + "&s=" + screen.width + "x" + screen.height + "&c=" + screen.colorDepth + "&u=" + _ckpag_u + "&rd=" + Math.floor(Math.random()*999999999+1) + "\" width=\"0\" height=\"0\">");