$(document).ready(function(){
	(function(){
		$(".footer-menu dt a").click(function(){
			$(this).prop("href", "javascript:;");
			$("html, body").animate({scrollTop: 0}, 0);
		});
	})();

    //标签切换
    (function(){
        var $tabBoxs = $(".tab-box");
        if($tabBoxs.length === 0){ return false; }

        $tabBoxs.each(function(){
            var $tabs = $(this).find(".tab a");
            var $items = $(this).find(".item");

            $tabs.each(function(index){
                $(this).click(function(){
                    $tabs.removeClass("on");
                    $(this).addClass("on");
                    $items.hide().eq(index).show();
                });
            });

            var startX = 0;
            var startY = 0;
            var x = 0;
            var y = 0;
            var isOk = false;

            var $wrap = $(this);
            var curIndex = 0;
            var len = $tabs.length;
            var direction = '';
            var distance = 0;

            $wrap.get(0).addEventListener("touchstart", function(event){
                if(event.targetTouches.length == 1){
                    event.preventDefault();
                    startX = event.targetTouches[0].pageX;
                    startY = event.targetTouches[0].pageY;
                }
            }, false);

            $wrap.get(0).addEventListener('touchmove', function(event) {
                if(event.targetTouches.length == 1){
                    var touch = event.targetTouches[0];

                    x = touch.pageX - startX;
                    y = touch.pageY - startY;
                    distance = Math.abs(x);

                    if(x > 0){
                        direction = "right";
                    }else{
                        direction = "left";
                    }

                    if (Math.abs(y) < Math.abs(x)) {
                        if(distance < 0){ distance = 0; }
                        if(distance > 100 ){
                            event.preventDefault();
                            isOk = true;
                        }
                    }
                }
            }, false);

            $wrap.get(0).addEventListener("touchend", function(event){
                if(isOk){
                    if(direction == "right"){
                        if(curIndex >= len - 1){
                            curIndex = -1;
                        }

                        curIndex++;
                        $tabs.eq(curIndex).trigger("click");
						slideRight(curIndex);
                    }

                    if(direction == "left"){
                        if(curIndex <= 0){
                            curIndex = len;
                        }

                        curIndex--;
                        $tabs.eq(curIndex).trigger("click");
						slideLeft(curIndex);
                    }
                }
            }, false);

			function slideRight(i){
				$items.eq(i).addClass('slideInLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass('slideInLeft animated');
				});
			}

			function slideLeft(i){
				$items.eq(i).addClass('slideInRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass('slideInRight animated');
				});
			}
        });
    })();

    //成功提示信息上下居中
    (function(win){
        var $wrap = $(".success-wrap, .fail-wrap");
        if($wrap.length === 0){ return false; }

        var h = $(win).height() - $(".top-bar-wrap").outerHeight() - $(".footer").outerHeight();
        var selfHeight = $wrap.outerHeight();
        var padding = (h -selfHeight)/2;

        if(padding > 0){
            padding += "px";
            $wrap.css({paddingTop: padding, paddingBottom: padding});
        }
    })(window);
});

