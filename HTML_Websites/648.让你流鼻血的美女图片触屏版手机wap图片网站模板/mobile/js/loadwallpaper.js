$(function() {
    // cid, offset 由程序输出
    var loadurl = '@c=mobile-wallpaper&a=load', loaded = false, sTimer, onloading = false;
    var container = $('.container');
    var jLoading = $('#loading');
    function loadMore() {
        if (loaded == 1) return;
        onloading = true;
        jLoading.show();
        $.getJSON(loadurl, {'cid' : cid, 'offset': offset, math: Math.random() }, function(json){
            if('undefined' == json || json.enabled ==0){
                loaded = 1;
            }else{
                container.append(json.html);
                offset = json.offset;
            }
            jLoading.hide();
            onloading = false;
        });
    }

    $(window).scroll(function scrollHandler(){
        if (onloading) {
            return;
        }
        clearTimeout(sTimer);
        sTimer = setTimeout(function() {
            if(loaded == 1){$(window).unbind("scroll", scrollHandler);}
            var c=document.documentElement.clientHeight || document.body.clientHeight, t=$(document).scrollTop();
            if(t+c >= container.offset().top+container.height()){loadMore();}
        }, 100);
    });
});
