//–ﬁ∏ƒÕº∆¨¥Û–°
function reImageSize(I_showpic, limit_width){
	//image=new Image();
	I_showpic.each(function(){
		var width = $(this).width();
		if(width>limit_width){
			$(this).css({"width":limit_width+"px"});
			bili=width/limit_width;
			$(this).css({"height":($(this).attr("height")/bili)+"px"});
		}
	});
}

/**
 * loadImg —”≥ŸÕº∆¨‘ÿ»Î
 */
var loadImg= function(elements, limit_width){
	var _window=$(window);
	_window.bind("scroll.lazyload resize.lazyload", function() {
		var $images = $("img."+elements);
	
		if (!!$images.length) {
			var top = _window.scrollTop() + _window.height();
			$.each($images, function(){
				var $this = $(this);
				if ($this.offset().top < top) {
					$this.removeClass(elements);
					var src = $this.attr("data-original");
					
					var img = new Image();
					img.src = src;
					img.limit_width = limit_width;
					if(img.complete){
						getImgOriginalSize($this, img);
						img = null;
					}else{
						img.onload=function(){
							getImgOriginalSize($this, img);
							img = null;
						};
					}
				}
			});
		} else {
			_window.unbind("scroll.lazyload resize.lazyload");
		}
	});
	_window.resize()
}


function getImgOriginalSize(obj, img){
	var width = img.width;
	if(width>img.limit_width){
		obj.css({"width":img.limit_width+"px"});
		bili=width/img.limit_width;
		obj.css({"height":(img.height/bili)+"px"});
	}
	obj.attr("src", img.src);
}