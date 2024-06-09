
$(document).ready(function(){
    (function(){
        //弹出分享
        var $shareBox = $("#share-box");
        if($shareBox.length === 0){ return false; }

        $(".info-control .share").click(function(){
            $shareBox.toggleClass("hide");

            if($shareBox.find(".cont").html() == ""){
                var str = '<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a></div><ul><li>QQ空间</li><li>新浪微博</li><li>腾讯微博</li></ul>';
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

    //图片列表
    (function(){
        var $lis = $(".video-list .row-fluid");
        if($lis.length === 0){ return false; }

        $lis.each(function(){
            $(this).find("dl").first().addClass("rfloat");
            $(this).find("dl").last().addClass("lfloat");
        });
    })();

    //图片浏览
    (function(){
        var $bxWrap = $("#bxsliderWrap");
        var $galleries = $("#galleries");
        if($galleries.length === 0){ return false; }

		$("body").css({background: "black"});
        var $trigger = $("a.trigger");
        var $viewImgTrigger = $("#view-img-trigger");
        var $back = $(".back");
        var slider;

        var $images = $galleries.find("img");
        var str = "";
        $images.each(function(index){
            str += '<td valign="middle"><img src="'+ $(this).attr("src") +'" alt="'+ $(this).attr("title") +'"  data-url="'+ $(this).attr("data-url") +'" /></td>';
        });

        var $cur = $("#to-view").find("b");
        var $total = $("#to-view").find("em");
        $total.html($images.length);

		$bxWrap.empty().append('<div class="mb-slider" id="mb-slider"><table><tr></tr></table></div>');
		$("#mb-slider").css({height: $(window).height() - 58});
        var $ul = $("#mb-slider tr");
		$ul.append(str);

		slider = $("#mb-slider").mobileSlider({
			onSlideAfter: function(){
				var cur = slider.getCurIndex();
				var len = slider.getLength();
				if(cur === 0){
					cur = len;
				}
				$cur.html((len - cur + 1) + "../default.htm");
			}
		});


        //幻灯片方式浏览
        $trigger.click(function(){
            if($(this).hasClass("on")){
                $(this).removeClass("on");
                $bxWrap.slideDown();
                $galleries.hide();
				$("#subject").hide();
				$cur.show();
                $viewImgTrigger.parent().show();

                $back.off("click");
            }else{
                $(this).addClass("on");
                $galleries.show();
                $viewImgTrigger.parent().hide();
                $bxWrap.hide();
				$("#subject").show();
				$cur.hide();
				$("#subject").insertBefore($galleries).show();

                $back.on("click", function(){
                    $trigger.trigger("click");
                    return false;
                });
            }
        });

        //点击图片
        $images.each(function(index){
            $(this).click(function(){
                $trigger.trigger("click");
                slider.goToSlide(index);
            });
        });

        //查看原图
        $viewImgTrigger.click(function(){
            location.href = $images.eq(slider.getCurIndex()).attr("data-url");
        });

		//点击隐藏摘要
		var $allImgs = $bxWrap.find("img");
		var $summaries = $bxWrap.find("ol li");
		$bxWrap.find("img").swipe({
			tap: function(){
				var len = $summaries.length;
				var i = len - slider.getCurIndex();
				if(i === len){
					i = 0;
				}
				var $item = $summaries.eq(i).find("span");
				$item.slideToggle();
			}
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
        $dls.css({width: winWidth - 10 + "px"});
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

			if(/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase())) { 
				slider.prev = el.find(".prev").hide();
				slider.next = el.find(".next").hide();
			} else { 
				slider.prev = el.find(".prev");
				slider.next = el.find(".next");
			} 
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
			if(slider.curIndex === 0){
				slider.ul.css({marginLeft: - (slider.boxWidth * slider.len)});
				slider.curIndex = slider.len - 1;
			}else{
				slider.curIndex--;
			}

			if(slider.curIndex === 0){
				slider.ul.css({marginLeft: - (slider.boxWidth * slider.len) + slider.boxWidth});
			}

			if(!slider.ul.is(":animated")){
				slider.ul.animate({marginLeft: parseInt(slider.ul.css("marginLeft")) - slider.boxWidth}, slider.confing.speed);
				if(slider.curIndex === 0){
					slider.oli.hide().eq(0).show();
				}else{
					slider.oli.hide().eq(slider.len - slider.curIndex).show();
				}
			}
			slider.confing.onSlideAfter();
		};

		var moveRight = function(){
			stop();
			if(slider.curIndex + 1 === slider.len){
				
				slider.ul.css({marginLeft: - (slider.boxWidth * slider.len) - slider.boxWidth});
				slider.curIndex = 0;
			}else{
				slider.curIndex++;
			}

			if(!slider.ul.is(":animated")){
				slider.ul.animate({marginLeft: parseInt(slider.ul.css("marginLeft")) + slider.boxWidth}, slider.confing.speed);
				if(slider.curIndex === 0){
					slider.oli.hide().eq(0).show();
				}else{
					slider.oli.hide().eq(slider.len - slider.curIndex).show();
				}
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

		el.getLength = function(){
			return slider.len;
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

var CountData=0;
var getUrl,postUrl;
var page=2;
function ShowCount(id){
	getUrl = "../../api.cms.familydoctor.com.cn/Praise/GetPraise@token=B26D842D8D474CD5851192003C351C9A&id="+ id +"&type=1";
	$.ajax({
		url: getUrl,
		dataType: "jsonp",
		cache: !0,
		success: function(a) {
			$("#praise"+id).html(a);
		}
	});
}
function getLocalTime(cS) {
	var nS=cS.replace("/Date(","").replace(")/","");
	return new Date(parseInt(nS)).format("yyyy年MM月dd日 hh:mm").toLocaleString();
}
/*
函数：格式化日期
参数：formatStr-格式化字符串
		d：将日显示为不带前导零的数字，如1
		dd：将日显示为带前导零的数字，如01
		ddd：将日显示为缩写形式，如Sun
		dddd：将日显示为全名，如Sunday
		M：将月份显示为不带前导零的数字，如一月显示为1
		MM：将月份显示为带前导零的数字，如01
		MMM：将月份显示为缩写形式，如Jan
		MMMM：将月份显示为完整月份名，如January
		yy：以两位数字格式显示年份
		yyyy：以四位数字格式显示年份
		h：使用12小时制将小时显示为不带前导零的数字，注意||的用法
		hh：使用12小时制将小时显示为带前导零的数字
		H：使用24小时制将小时显示为不带前导零的数字
		HH：使用24小时制将小时显示为带前导零的数字
		m：将分钟显示为不带前导零的数字
		mm：将分钟显示为带前导零的数字
		s：将秒显示为不带前导零的数字
		ss：将秒显示为带前导零的数字
		l：将毫秒显示为不带前导零的数字
		ll：将毫秒显示为带前导零的数字
		tt：显示am/pm
		TT：显示AM/PM
返回：格式化后的日期
*/
Date.prototype.format = function (formatStr) {
	var date = this;
	/*
	函数：填充0字符
	参数：value-需要填充的字符串, length-总长度
	返回：填充后的字符串
	*/
	var zeroize = function (value, length) {
		if (!length) {
		 length = 2;
		}
		value = new String(value);
		for (var i = 0, zeros = ''; i < (length - value.length); i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function($0) {
		switch ($0) {
			case 'd': return date.getDate();
			case 'dd': return zeroize(date.getDate());
			case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
			case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
			case 'M': return date.getMonth() + 1;
			case 'MM': return zeroize(date.getMonth() + 1);
			case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
			case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
			case 'yy': return new String(date.getFullYear()).substr(2);
			case 'yyyy': return date.getFullYear();
			case 'h': return date.getHours() % 12 || 12;
			case 'hh': return zeroize(date.getHours() % 12 || 12);
			case 'H': return date.getHours();
			case 'HH': return zeroize(date.getHours());
			case 'm': return date.getMinutes();
			case 'mm': return zeroize(date.getMinutes());
			case 's': return date.getSeconds();
			case 'ss': return zeroize(date.getSeconds());
			case 'l': return date.getMilliseconds();
			case 'll': return zeroize(date.getMilliseconds());
			case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
			case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
		}
	});
}
var URL = "";
