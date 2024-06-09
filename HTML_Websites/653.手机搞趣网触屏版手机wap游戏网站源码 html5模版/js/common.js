/* 
Document: common.js 
Created on: 2013-03-14,14:25;
Author: kimixyz
Description: 全站通用脚本
*/
(function () {
    // 适应安卓手机
    if (navigator.userAgent.match(/Android/i)) {
        var vmeta = document.getElementsByName("viewport")[0];
        vmeta.content = "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0, target-densitydpi=320";
    }

    // 返回顶部
   /* window.addEventListener('scroll', function () {
        var scaleh = 400;
        var gaoplus = document.getElementById("gaoplus");
        var commentplus = document.getElementById("commentplus");
        var st = window.scrollY;
        (st > scaleh) ? gaoplus.style.display = "block" : gaoplus.style.display = "none";
        (st > scaleh) ? commentplus.style.display = "block" : commentplus.style.display = "none";
    }, false);*/
    // 返回顶部
    window.addEventListener('scroll', function () {
        var scaleh = 400;
        var gotop = document.getElementById("gotop");
        var commentplus = document.getElementById("commentplus");
        var st = window.scrollY;
        (st > scaleh && gotop) ? gotop.style.display = "block" : gotop.style.display = "none";
    }, false);


    var isTouch = ('ontouchstart' in window);
    var touchStartEvent = isTouch ? "touchstart" : "mousedown";
    var touchEndEvent = isTouch ? "touchend" : "mouseup";
   /* function toplinkClick(dom) {
        dom.addEventListener(touchStartEvent, function () {
            event.stopPropagation();
        }, false);
        dom.addEventListener(touchEndEvent, function () {
            var linkbtn = document.getElementById("linkbtn");
            linkbtn.style.display == "none" ? linkbtn.style.display = "block" : linkbtn.style.display = "none";
            event.stopPropagation();
        }, false);
    };
    var golink_btn = document.getElementById("golink_btn");
    toplinkClick(golink_btn);*/

    function linkbtnClick(dom) {
        dom.addEventListener(touchStartEvent, function () {
            event.stopPropagation();
        }, false);
        dom.addEventListener(touchEndEvent, function () {
            event.stopPropagation();
        }, false);
    };
    var linkbtn = document.getElementById("linkbtn");
    linkbtn && linkbtnClick(linkbtn);

    function bodyClick(dom) {
        dom.addEventListener(touchStartEvent, function () {
            event.stopPropagation();
        }, false);
        dom.addEventListener(touchEndEvent, function () {
            var linkbtn = document.getElementById("linkbtn");
            if(linkbtn && linkbtn.length) {
                linkbtn.style.display = "none";
            }
            event.stopPropagation();
        }, false);
    };
    var body = document.getElementsByTagName("body")[0];
    body && bodyClick(body);

    // 横竖屏切换bug
    if (/iPhone/.test(navigator.userAgent) &&
   !/Opera Mini/.test(navigator.userAgent)) {
        window.addEventListener("orientationchange", function (e) {
            var s = document.documentElement.style;
            s.display = 'none';
            setTimeout(function () { s.display = 'block'; }, 0);
        });
    }


})();
