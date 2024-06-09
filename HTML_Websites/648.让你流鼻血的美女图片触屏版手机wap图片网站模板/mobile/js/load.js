
$(window).resize(function(){
    var container = $('#images .items');
    var masonryContainer = $('#images');
    container.imagesLoaded(function(){
        container.fadeIn();
        masonryContainer.masonry({
            itemSelector : '.items',
            isAnimated: true
        });
    });
})

//masonry
/*
$(document).ready(
    function() {
        var container = $('#images .items');
        var masonryContainer = $('#images');
        container.imagesLoaded(function(){
            container.fadeIn();
            masonryContainer.masonry({
                itemSelector : '.items',
                isAnimated: true
            });
        });
    }
);
*/
    
/////////////////////////////////////////////////////////////////////////////////////////////////////



$(function() {
    var loadurl = '@c=mobile-pic&a=load', loaded = false, sTimer, onloading = false;
    var jWindow = $(window), container = $("#images .items"), masonryContainer = $('#images');
    var jLoading = $('#loading');
    function loadMore() {
        if (loaded == 1) return;
        onloading = true;
        jLoading.show();
        $.getJSON(loadurl, {'tag' : tagId, 'offset': offset, math: Math.random() }, function(json){
            if('undefined' == json || json.enabled ==0){
                loaded = 1;
            }else{
                var options = masonryContainer.data("masonry").options, bakAnimated = options.isAnimated;
                options.isAnimated = false;
                masonryContainer.append(json.html).masonry("reload");
                offset = json.offset;
                options.isAnimated = bakAnimated;
            }
            tagShow();
            jLoading.hide();

            onloading = false;
        });
    }

    function tagShow() {
        $("#images .items").imagesLoaded(function(){
            $("#images .items:hidden").fadeIn();
            masonryContainer.masonry({
                itemSelector : '.items',
                isAnimated: true
            });
        });
    }

    tagShow();
    $(window).scroll(function scrollHandler(){
        if (onloading) {
            return;
        }
        clearTimeout(sTimer);
        sTimer = setTimeout(function() {
            if(loaded == 1){$(window).unbind("scroll", scrollHandler);}
            var c=document.documentElement.clientHeight || document.body.clientHeight, t=$(document).scrollTop();
            if(t+c >= masonryContainer.offset().top+masonryContainer.height()){loadMore();}
        }, 100);
    });
});
