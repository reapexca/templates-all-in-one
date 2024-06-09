
$(document).ready(function(){
    (function(){
        //弹出分享
        var $shareBox = $("#share-box");
        if($shareBox.length === 0){ return false; }

        $(".info-control .share").click(function(){
            $shareBox.toggleClass("hide");

            if($shareBox.find(".cont").html() == ""){
                var str = '<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a></div>';
                str += '<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"32"},"share":{}};with(document)0[(getElementsByTagName(\'head\')[0]||body).appendChild(createElement(\'script\')).src=\'../../bdimg.share.baidu.com/static/api/js/share.js@v=86835285.js@cdnversion=\'+~(-new Date()/36e5)];</'+'script>';
                $("#share-box .cont").html(str);
            }
        });
    })();

    //首页图大小自适应
    (function(){
        $(window).on("load resize", function(){
            initPhotoSize();
        });
    })();

    //视频列表
    (function(){
        var $lis = $(".video-list .row-fluid");
        if($lis.length === 0){ return false; }

        $lis.each(function(){
            $(this).find("dl").first().addClass("rfloat");
            $(this).find("dl").last().addClass("lfloat");
        });
    })();

    //下拉菜单
    (function(){
        var $cateWrap = $("#category");
        if($cateWrap.length === 0){ return false; }

        var $cate = $cateWrap.find("#more-cate");
        var $more = $cateWrap.find(".more");
        var $last = $cateWrap.find("ul").last();
        $last.addClass("bdr-top-0");

        $more.click(function(){
            $cate.slideToggle();
            $more.toggleClass("down");
            $last.toggleClass("bdr-top-0");
        });
    })();
});
function initPhotoSize(){
    var $dls = $("#photos-wrap dl");
    var maxwidth = 500;
    var winWidth = parseInt($(window).width());
    if(winWidth >= maxwidth){
        $dls.css({width: maxwidth + "px"});
    }else{
        $dls.css({width: winWidth + "px"});
    }
}


(function($, window){
	var confing = {
		speed: 200,
		interval: 5000,
		startSlide: 0,
		isAuto: false,
        onSlideAfter: function() {}
	};

    $.fn.mobileSlider = function(settings){
		if(this.length == 0) return this;

		if(this.length > 1){
			this.each(function(){$(this).mobileSlider(settings)});
			return this;
        }

		var slider = {};
		var el = this;
		var timer;

		var winWidth = $(window).width();
		var winHeight = $(window).height();

		var init = function(){
			slider.confing = $.extend({}, confing, settings);
			
			slider.ul = el.find("table");
			slider.tr = el.find("tr");
			slider.li = el.find("td");
			slider.images = el.find("table img");
			slider.len = slider.images.length;
			slider.boxWidth = el.width();
			slider.boxHeight;
			slider.curIndex = 0;
			
			slider.li.css({width: slider.boxWidth});
			slider.tr.append(slider.li.clone());
			slider.ul.css({width: (slider.boxWidth * slider.len * 2) + "px", marginLeft: -(slider.boxWidth * slider.len) });
			
			var subject = $("#subject").html();
			var str = '<ol>';
			slider.images.each(function(index){
				str += '<li><b>'+ subject +'</b><span>'+ $(this).attr("alt") +'</span></li>';
			});
			str += '</ol><a href="javascript:;" class="action prev"></a><a href="javascript:;" class="action next"></a>';
			el.append(str);

			slider.oli = el.find("ol li");
			slider.oli.first().show();
			slider.prev = el.find(".prev")
			slider.next = el.find(".next")
		};

		var setup = function(){
			slider.prev.click(function(){
				stop();
				moveLeft();
			});

			slider.next.click(function(){
				stop();
				moveRight();
			});

			$(document).swipe({
				swipeLeft: function(){
					moveLeft();
				},
				swipeRight: function(){
					moveRight();
				}
			});
		}

		var moveLeft = function(){
			stop();
			if(slider.curIndex + 1 === slider.len){
				slider.ul.css({marginLeft: - (slider.boxWidth * slider.len) + slider.boxWidth });
				slider.curIndex = 0;
			}else{
				slider.curIndex++;
			}

			if(!slider.ul.is(":animated")){
				slider.ul.animate({marginLeft: parseInt(slider.ul.css("marginLeft")) - slider.boxWidth}, slider.confing.speed);
				//el.animate({ height: slider.images.eq(slider.curIndex).height() });
				slider.oli.hide().eq(slider.curIndex).show();
			}
			slider.confing.onSlideAfter();
		};

		var moveRight = function(){
			stop();
			if(slider.curIndex === 0){
				slider.curIndex = slider.len - 1;
				slider.ul.css({marginLeft: - (slider.boxWidth * slider.len)});
			}else{
				slider.curIndex--;
			}

			if(!slider.ul.is(":animated")){
				slider.ul.animate({marginLeft: parseInt(slider.ul.css("marginLeft")) + slider.boxWidth}, slider.confing.speed);
				//el.animate({ height: slider.images.eq(k).height() });
				slider.oli.hide().eq(slider.curIndex).show();
			}
			slider.confing.onSlideAfter();
		};

		var stop = function(){
			window.clearInterval(timer);
		};

		var play = function(){
			timer = setInterval(function(){
				moveLeft();
			}, slider.confing.interval);
		};

		var imgLoad = function (url, callback) {
			var img = new Image();
			img.src = url;

			if (img.complete) {
				callback(img.width, img.height);
			} else {
				img.onload = function () {
					callback(img.width, img.height);
					img.onload = null;
				};
			};
		};

		el.getCurIndex = function(){
			return slider.curIndex;
		};

		el.goToSlide = function(i){
			slider.ul.css({marginLeft: - (slider.boxWidth * slider.len) + slider.boxWidth });
			slider.ul.animate({marginLeft: parseInt(slider.ul.css("marginLeft")) - (slider.boxWidth * i) - slider.boxWidth}, slider.confing.speed);
			slider.curIndex = i;
			slider.oli.hide().eq(slider.curIndex).show();
			slider.confing.onSlideAfter();
		}

		$(window).on("resize", function(){ setup(); });
		
		init();
		setup();
		if(slider.confing.isAuto){play();}
		return this;
	};
})(jQuery, window);