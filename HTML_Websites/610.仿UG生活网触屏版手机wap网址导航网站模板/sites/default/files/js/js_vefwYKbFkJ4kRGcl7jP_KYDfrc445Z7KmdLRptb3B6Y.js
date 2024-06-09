Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"Edit":"\u7f16\u8f91","Configure":"\u914d\u7f6e","Done":"\u5b8c\u6210","Show":"\u663e\u793a","Not published":"\u672a\u53d1\u8868","Please wait...":"\u8bf7\u7a0d\u7b49...","Hide":"\u9690\u85cf","Loading":"\u6b63\u5728\u52a0\u8f7d","By @name on @date":"By @name \u5728 @date","By @name":"\u6309 @name","Not in menu":"\u4e0d\u5728\u83dc\u5355\u4e2d","Alias: @alias":"\u522b\u540d\uff1a@alias","No alias":"\u65e0\u522b\u540d","New revision":"\u65b0\u5efa\u4fee\u8ba2\u7248\u672c","Drag to re-order":"\u62d6\u653e\u91cd\u65b0\u6392\u5e8f","Changes made in this table will not be saved until the form is submitted.":"\u5728\u6b64\u8868\u683c\u4e2d\u7684\u4fee\u6539\u53ea\u6709\u5728\u6574\u4e2a\u8868\u5355\u63d0\u4ea4\u540e\u624d\u4f1a\u88ab\u4fdd\u5b58\u3002","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"\u8fd9\u4e9b\u533a\u5757\u7684\u53d8\u66f4\u4e0d\u4f1a\u88ab\u50a8\u5b58\u8d77\u6765\uff0c\u9664\u975e\u60a8\u6309\u4e0b\u003Cem\u003E\u50a8\u5b58\u533a\u5757\u003C\/em\u003E\u7684\u6309\u94ae\u3002","Show shortcuts":"\u663e\u793a\u5feb\u6377\u65b9\u5f0f","No revision":"\u6ca1\u6709\u4fee\u8ba2\u7248\u672c","@number comments per page":"\u6bcf\u9875 @number \u6761\u8bc4\u8bba","Not restricted":"\u672a\u53d7\u9650\u5236","(active tab)":"\uff08\u6d3b\u52a8\u6807\u7b7e\uff09","An AJAX HTTP error occurred.":"\u53d1\u751f\u4e00\u4e2aAJAX HTTP\u9519\u8bef\u3002","HTTP Result Code: !status":"HTTP\u8fd4\u56de\u4ee3\u7801\uff1a!status","An AJAX HTTP request terminated abnormally.":"\u4e00\u4e2aAJAX HTTP\u8bf7\u6c42\u5f02\u5e38\u7ec8\u6b62\u3002","Debugging information follows.":"\u8c03\u8bd5\u4fe1\u606f\u5982\u4e0b\u3002","Path: !uri":"\u8def\u5f84\uff1a!uri","StatusText: !statusText":"\u72b6\u6001\u6587\u672c: !statusText","ResponseText: !responseText":"\u54cd\u5e94\u6587\u672c\uff1a !responseText","ReadyState: !readyState":"\u51c6\u5907\u72b6\u6001\uff1a !readyState","Not customizable":"\u4e0d\u53ef\u81ea\u5b9a\u4e49\u7684","Restricted to certain pages":"\u9650\u5236\u5230\u7279\u5b9a\u7684\u533a\u5757","The block cannot be placed in this region.":"\u8fd9\u4e2a\u533a\u5757\u4e0d\u80fd\u653e\u624d\u8fd9\u4e2a\u533a\u57df\u4e2d\u3002","Customize dashboard":"\u81ea\u5b9a\u4e49\u9762\u677f","Hide summary":"\u9690\u85cf\u6458\u8981","Edit summary":"\u7f16\u8f91\u6458\u8981","@title dialog":"@title \u5bf9\u8bdd\u6846","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"\u9009\u62e9\u7684\u6587\u4ef6%filename\u65e0\u6cd5\u4e0a\u4f20\u3002\u53ea\u6709\u4ee5\u4e0b\u7c7b\u578b\u7684\u6587\u4ef6\u88ab\u5141\u8bb8\uff1a%extensions\u3002","Re-order rows by numerical weight instead of dragging.":"\u4e0d\u7528\u62d6\u653e\u64cd\u4f5c\uff0c\u800c\u7528\u6570\u5b57\u6743\u91cd\u65b9\u5f0f\u91cd\u65b0\u5bf9\u884c\u6392\u5e8f\u3002","Show row weights":"\u663e\u793a\u884c\u7684\u6743\u91cd","Hide row weights":"\u9690\u85cf\u884c\u7684\u6743\u91cd","Autocomplete popup":"\u81ea\u52a8\u5b8c\u6210\u7684\u5f39\u51fa\u7a97\u53e3","Searching for matches...":"\u6b63\u5728\u67e5\u627e\u5339\u914d\u9879...","Hide shortcuts":"\u9690\u85cf\u5feb\u6377\u952e"}} };;
  jQuery(function(){
    //360 jQuery(window).width() 
    var win_width = jQuery(window).width();
    var client_type = getCookie('CLIENT_TYPE');
    if(client_type == 'null') {
        win_width = 480;
        jQuery('#page').width(480);
    }
    
    var per = win_width/480;
    if(win_width < 480) {
      
      jQuery('.dlpic').each(function(){
        var new_w = 72*per;
        jQuery(this).width(new_w);
      });
      var new_width = jQuery('.download a').width()*per;
      new_width = 87*per;
      jQuery('.front .termdetailimg').width(110*per).height(109*per).css({'background-size':110*per}).parent('.termdetail_center_box').width(110*per).find('img').width(100*per);
      jQuery('#fenlei_navfllist .fenlei-termlist .termdetailimg').width(105*per).height(112*per).find('img').width(95*per);
      jQuery('#fenlei_navfllist .fenlei-termlist .termdetail_center_box').width(105*per).find('.proimga').width(105*per).height(105*per);
      jQuery('.feileiimg').width(100*per).height(99*per);

      jQuery('.navterm .feileiimg').width(110*per).height(110*per).find('.proimga').height(110*per);
      
      
      
      jQuery('#front_termlist  a.proimga').width(108*per).height(107*per);
      
      jQuery('.termdetail .title ').width(100*per);
      jQuery('#front_termlist .termlist .title ').width(110*per);
      
      //jQuery('.title-appraisal img').width(128*per);
      
      jQuery('.mobile_tv .fenlei-termlist .termdetail_center_box').width(100*per);
      jQuery('.mobile_tv .termdetailimg').width(100*per).height(100*per).parent('.termdetail_center_box').width(100*per);
      jQuery('.mobile_tv .movie .termdetailimg').width(100*per).height('auto').parent('.termdetail_center_box').width(100*per);
      jQuery('.mobile_tv .termdetailimg a.proimga').width(98*per).height(92*per).find('img').width('82%');
      jQuery('.mobile_tv .title ').width(100*per);
       
    }
    
    jQuery('.banner #focus').height(214*per).find('.banner_img').width(win_width);
    
    

    jQuery('.container-inline').width(win_width - 20).find('.form-text').val('应用搜索').focus(function(){
        if(jQuery(this).val() =='应用搜索') {
            jQuery(this).val('');
        }
        jQuery(this).css({'color':'#333333'});
    }).blur(function(){
        if(jQuery(this).val() =='') {
            jQuery(this).val('应用搜索').css({'color':'#AEAEAE'});
        }
    });
    
    jQuery('#header .search_left_width .form-text').focus(function(){
        var v = jQuery(this).val();
        var t = jQuery(this).attr('title');
        
        jQuery(this).css({'color':'#333'});
        
        if(v == t) {
            jQuery(this).val('');
        }
    }).blur(function(){
        var t = jQuery(this).attr('title');
        
        if(!jQuery(this).val()) {
            jQuery(this).val(t);
            jQuery(this).css({'color':'#aeaeae'});
        }
    });
    
    jQuery('.search').show();
    
    
    //广告图片滑动效果
    //czh 2012-11-27
    jQuery('.advertising_a').width(win_width);
    ads_slide('#advertising_top', win_width);
    ads_slide('#advertising_middle', win_width);
    
    //slides_effects('#advertising_middle', '.advertising_div');
    
    //关闭广告
    //czh 2012-11-27
    jQuery('.advertising_close').click(function(){
        jQuery(this).parent('.advertising_box').fadeOut();
    });
    
    //三大分类导航条切换
    //nav_touch_move_change('#s_navigation a', '.main_term_box');
    //nav_click_move_change('#s_navigation a', '.main_term_box');
    
    //手机应用-分类切换
    nav_touch_move_change('.mobile_dlnav a', '.shou-ji-ying-yong .termlist');
    
    //移动电视切换
    nav_touch_move_change('#m_navigation .nav_position a', '.mobile_tv .fenlei_navfllist');
    
    //统计下载次数
    jQuery('.add_download_count').click(function(){
        var nid = jQuery(this).attr('alt');
        var node_url_id = "#node_url_" + nid;
        var node_url = jQuery(node_url_id).val();
        jQuery.post(
                node_url, 
                {'is_ajax' : '1' ,'action' : 'set_download', 'nid' : nid}, 
                function(data) {}, 
                'text'
        );
     });

  });
  
function ads_slide(ads_id, win_width) {
    var len = jQuery(ads_id + " .advertising_a").length;
    
    if(len == 0) return;
    
	var index = 0;
	var picTimer;
    jQuery(ads_id).width(win_width).height(win_width / 5);
    jQuery(ads_id + ' .advertising').width(win_width * len);
    if(len > 1) {
        jQuery(ads_id).hover(function() {
            clearInterval(picTimer);
        },function() {
            picTimer = setInterval(function() {
                jQuery(ads_id + " .advertising").animate({"left":-win_width},600,'swing',function(){
                    jQuery(this).css({"left":0});
                    jQuery(ads_id + " .advertising_a:first").appendTo(this);
                });
            },4000); 
            touch_move_change(ads_id, win_width);
        }).trigger("mouseleave");
    }
}
  
  
  
function touch_move_change(ads_id, win_width) {
	jQuery(ads_id).touchwipe({
				min_move_x: 40,
				min_move_y: 40,
				wipeLeft: function() {
                    jQuery(ads_id + " .advertising").animate({"left":-win_width},600,'swing',function(){
                        jQuery(this).css({"left":0});
                        jQuery(ads_id + " .advertising_a:first").appendTo(this);
                    });
                },
				wipeRight: function() { 
                    jQuery(ads_id + " .advertising_a:last").prependTo(ads_id + " .advertising");
                    jQuery(ads_id + " .advertising").css({"left":-win_width}).animate({"left":0},600,'swing',function(){
                        
                    });
                    
                },
               //wipeUp: function() { return true;}, 
               //wipeDown: function() { return true;}, 
				preventDefaultEvents: false
		});

}
  
  
function nav_touch_move_change(nav, box) {
  var index = 0;
  var len = jQuery(nav).length;

  var cur = nav_click_move_change(nav, box);
  
  if(cur) {
    index = cur;
  }

/*   jQuery(box).touchwipe({
    min_move_x: 70,
    min_move_y: 70,
    wipeLeft: function() {
        if(jQuery(box).eq(index).attr('id') != 'mobile_termlist') {
          index++;
          if(index == len) index = 0;
          jQuery(box).fadeOut(300).eq(index).fadeIn(300);
          jQuery(nav).removeClass('current').eq(index).addClass('current');
        }
    },
    wipeRight: function() { 
        if(jQuery(box).eq(index).attr('id') != 'mobile_termlist') {
          index--;
          if(index < 0) index = len - 1;
          jQuery(box).fadeOut(300).eq(index).fadeIn(300);
          jQuery(nav).removeClass('current').eq(index).addClass('current');
        }
    },
    preventDefaultEvents: false
  }); */
  
  return false;
}

function nav_click_move_change(nav, box) {

  jQuery(nav).click(function(){
  
    var cur = jQuery(this).index();

    jQuery(nav).each(function(){
      if(jQuery(this).index() == cur) {
        jQuery(this).addClass('current');
      }
      else {
        jQuery(this).removeClass('current');
      }
    });
    
    // var search_type = jQuery(box).eq(cur).find('.to_search_type').val();
    // jQuery('.search_type').each(function(){
        // if(jQuery(this).attr('id') == search_type) {
            // jQuery(this).show();
        // }
        // else {
            // jQuery(this).hide();
        // }   
    // });
    
    jQuery(box).each(function(){
      if(jQuery(this).index() == cur) {
        jQuery(this).show();
      }
      else {
        jQuery(this).hide();
      }
    }); 
    
    return cur;
  });

}

function slides_effects(window_area, show_content) {
    var	carousel,
        el,
        i,
        page;
    var slides = new Array();

    jQuery(show_content).each(function(i) {
        slides[i] = jQuery(this).html();
    });

    carousel = new SwipeView(window_area, {
        numberOfPages: slides.length,
        hastyPageFlip: true
    });

    // Load initial data
    for (i=0; i<3; i++) {
        page = i==0 ? slides.length-1 : i-1;

        el = document.createElement('span');
        el.innerHTML = slides[page];
        carousel.masterPages[i].appendChild(el)
    }

    carousel.onFlip(function () {
        var el,
            upcoming,
            i;

        for (i=0; i<3; i++) {
            upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;

            if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
                el = carousel.masterPages[i].querySelector('span');
                el.innerHTML = slides[upcoming];
            }
        }
    });
}

/**
 * 获取指定名称的cookie的值
*/
function getCookie(objName){
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++) {
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
    }
}
  
  
  
  
  
  
  
  
  
  ;
  // sidebar catalogries hover
    jQuery(function(){
    jQuery("#protitemcentern .extend").hover(
    function() {
        jQuery(this).find(".sub_productlist").show();

    },
    function() {
        jQuery(this).find(".sub_productlist").hide();
    });
    });;
// jQuery effects for banner
jQuery(function() {
	var sWidth = jQuery(window).width();
	var len = jQuery("#focus ul li").length;
	var index = 0;
	var picTimer;

	jQuery("#focus ul").css("width",sWidth * (len));
	
	jQuery("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}

            
		},4000); 
        
        var touch_index = index;
        
        jQuery("#focus").touchwipe({
                    min_move_x: 40,
                    min_move_y: 40,
                    wipeLeft: function() {
                        touch_index++;
                        if(touch_index == len) {touch_index = len -1;} 
                        jQuery("#focus ul").stop(true,false).animate({"left":-touch_index*sWidth},300);
                    },
                    wipeRight: function() { 
                        touch_index--;
                        if(touch_index < 0) {touch_index = 0;}
                        jQuery("#focus ul").stop(true,false).animate({"left":-touch_index*sWidth},300);
                    },
                    preventDefaultEvents: true
            });
        
	}).trigger("mouseleave");
    
	
	function showPics(index) {
		var nowLeft = -index*sWidth;
		jQuery("#focus ul").stop(true,false).animate({"left":nowLeft},300);
	}
});;
/*
 *	----------------------
 *	TouchWipe
 *	----------------------
 *	http://www.uedcool.com 
 *	by EddyZhang (张勇辉)
 *	version 2.0
 *	2011/12/29
 *
 *	#example:
 *	$("#test").touchwipe({
 *			min_move_x: 40, //横向灵敏度
 *			min_move_y: 40, //纵向灵敏度
 *			wipeLeft: function() {$("#val").append("左，");}, //左侧滑动事件
 *			wipeRight: function() { $("#val").append("右，");}, //右侧滑动事件
 *			wipeUp: function() { $("#val").append("上，");}, //向上滑动事件
 *			wipeDown: function() { $("#val").append("下，");}, //向下滑动事件
 *			wipe:function(){$("#val").append("点击，");}, //触摸事件
 *			wipehold:function(){$("#val").append("保持，");}, //触摸保持事件
 *			preventDefaultEvents: true //阻止默认事件
 *		});
 *
 */
(function(a){
a.fn.touchwipe=function(c){
var b={
    min_move_x:20,
    min_move_y:20,
    wipeLeft:function(){},
    wipeRight:function(){},
    wipeUp:function(){},
    wipeDown:function(){},
    wipe:function(){},
    wipehold:function(){},
    preventDefaultEvents:true
};
if(c){
    a.extend(b,c)
}
this.each(function(){
    var h;
    var g;
    var j=false;
    var i=false;
    var e;
    function m(){
        this.removeEventListener("touchmove",d);
        h=null;
        j=false;
        clearTimeout(e)
    }
    function d(q){
        if(b.preventDefaultEvents){
            q.preventDefault()
        }
        if(j){
            var n=q.touches[0].pageX;
            var r=q.touches[0].pageY;
            var p=h-n;
            var o=g-r;
            if(Math.abs(p)>=b.min_move_x){
                m();
                if(p>0){
                    b.wipeLeft()
                }
                else{
                    b.wipeRight()
                }
            }
            else{
                if(Math.abs(o)>=b.min_move_y){m();if(o>0){b.wipeUp()}else{b.wipeDown()}}
            }
        }
    }
    function k(){
        clearTimeout(e);
        if(!i&&j){
            b.wipe()
        }
        i=false
    }
    function l(){
        i=true;
        b.wipehold()
    }
    function f(n){
        if(n.touches.length==1){
            h=n.touches[0].pageX;
            g=n.touches[0].pageY;
            j=true;
            this.addEventListener("touchmove",d,false);
            e=setTimeout(l,750)
        }
    }
    if("ontouchstart" in document.documentElement){
        this.addEventListener("touchstart",f,false);
        this.addEventListener("touchend",k,false)
    }
});
return this
};
a.extend(a.fn.touchwipe,{version:"2.0",author:"张勇辉"})})(jQuery);;
