//-------------------------------------------------------------------------------------
//Name:tipsWindow 2.2
//Author:By Await 
//Date:2010-12-18
//WebSite:http://leotheme.cn
//---------------------------------------------------------------------------------------
;(function(){	   
	$.tipsWindow=function(options){
		defaults = $.extend({
			___title: "",			//窗口标题文字
			___content: "text:内容",			//内容(可选内容为){ text | id | img | url | iframe }
			___width: "100%",					//窗口宽度
			___height: "100%",					//窗口离度
			___titleClass: "boxTitle",			//窗口标题样式名称
			___closeID:"",						//关闭窗口ID
			___triggerID:"",					//相对于这个ID定位
			___boxBdColor:"#E9F3FD",			//弹出层外层边框颜色
			___boxBdOpacity:"1",				//弹出层外层边框透明度
			___boxWrapBdColor:"#A6C9E1",		//弹出层内部边框颜色
			___time:"",							//自动关闭等待时间
			___drag:"",							//拖动手柄ID
			___showbg:false,					//是否显示遮罩层
			___offsets:{left:"auto",top:"auto"},//设定弹出层位置,默认居中
			___fns:function(){}					//关闭窗口后执行的函数
		},options);
		if ($('#___box').length==0)$.tipsWindow.init(defaults);
	};
	var isIE6 = !-[1,] && !window.XMLHttpRequest;
	$.extend($.tipsWindow,{
		//初始化
		init: function (options){
			$.tipsWindow.showBox(options);
			$("#___boxTitle>span").live("click",function(){	//默认关闭按钮
				$.tipsWindow.removeBox();
			});
			if(options.___closeID != ""){
				$("#"+options.___closeID).live("click",function(){	
					$.tipsWindow.removeBox();
				});
			};
			if(options.___time != "") {
				setTimeout($.tipsWindow.removeBox,options.___time);
			};
			if(options.___showbg != "" && options.___showbg == true){
				var $boxBgDom = "<div id=\"boxBg\" style=\"position:absolute;width:100%;height:"+$(document).height()+"px;left:0;top:0;z-index: 999991\"></div>";
				$("body").append($boxBgDom);
			};
			if(options.___drag != "") {
				$.tipsWindow.dragBox(options);
			};
			if(options.___showbg != true){
				var $box = $("#___box");
					$box.addClass("shadow");
			};
			$.tipsWindow.contentBox(options);
			if(isIE6){//IE6下隐藏下拉菜单
				$("select").css("visibility","hidden");
				$box.find("select").css("visibility","visible");
			};
			$.tipsWindow.keyDown();
			if(options.___fns != "" && $.isFunction(options.___fns)) {
				options.___fns.call(this);
			};
		},
		//构造并定位弹出层
		showBox: function(options) {
			var	___width = options.___width < 100 ? 100 : options.___width,
				___height= options.___height < 50 ? 50 : options.___height;//设置最小宽高
			var $width = parseInt(options.___width) > 1000 ? 1000 : parseInt(options.___width),
				$height = parseInt(options.___height)+33 > 550 ? 550 : parseInt(options.___height)+33;//设置最大宽高
			var $boxDom = "<div id=\"___box\" class=\"box\"><div id=\"___boxWrap\">";
				$boxDom += "<div id=\"___boxTitle\"><h3></h3><span>关闭</span></div>";
				$boxDom += "<div id=\"___boxContent\" class=\"boxContent\"></div></div>";
				//$boxDom += "<div id=\"___boxBg\"></div>";
				$boxDom += "</div>";
				$("body").append($boxDom);
			var $box = $("#___box");
				$box.css({
					"position":"fixed",
					//left:"50%",
					//top:"50%",
					//width:$width+"px",
					//height:$height+"px",
					//marginLeft:-(parseInt($width/2))+"px",
					//marginTop:-(parseInt($height/2)+5)+"px",
					zIndex: "999999"
				});
			var $boxContent = $("#___boxContent");
				$boxContent.css({
					position: "relative",
					width:___width-12+"px",
					height:___height-10+"px",
					borderColor:options.___boxWrapBdColor,
					background:"#ffffff"
				});
		
			var $boxBg = $("#___boxBg");
				$boxBg.css({
					position: "absolute",
					width:$width+"px",
					height:$height+"px",
					left: "0",
					top: "0",
					opacity: options.___boxBdOpacity,
					background:options.___boxBdColor,
					zIndex: "1"
				});
			var $boxWrap = $("#___boxWrap");
				$boxWrap.css({
					position:"absolute",
					left:"5px",
					top:"5px",
					width:___width-10+"px",
					height:___height-10+"px",
					zIndex: "2"
				});
			var $title = $("#___boxTitle>h3");
				$title.html(options.___title);
				$title.parent().css({
					position: "relative",
					borderColor:options.___boxWrapBdColor
				});
			if(options.___titleClass != ""){
				$title.parent().addClass(options.___titleClass);
				$title.parent().find("span").hover(function(){
					$(this).addClass("hover");
				},function(){
					$(this).removeClass("hover");
				});
			};
			if(!isIE6){
				if(options.___offsets.left != null && options.___offsets.left != "auto" && options.___offsets.top != "auto"){//且指定了left和top值
					if(options.___triggerID!=""){
						$.tipsWindow.getDomPosition(options);
						$box.css({
							position:"absolute",
							left:setBoxPosition[0],
							top:setBoxPosition[1],
							margin:"0"
						});
						$(window).resize(function(){
							$box.css({
								left:setBoxPosition[0],
								top:setBoxPosition[1]
							});
						});
					}else{
						$box.css({
							left:options.___offsets.left+"px",
							top:options.___offsets.top+"px",
							margin:"0"
						});
					};
				};
			}else{
				if(options.___offsets.left != null && options.___offsets.left != "auto" && options.___offsets.top != "auto"){
					if(options.___triggerID!=""){
						$.tipsWindow.getDomPosition(options);
						$box.css({
							position:"absolute",
							left:setBoxPosition[0],
							top:setBoxPosition[1],
							margin:"0"
						});
						$(window).resize(function(){
							$box.css({
								left:setBoxPosition[0],
								top:setBoxPosition[1]
							});
						});
					}else{
						$box.css({
							position:"absolute",
							left:options.___offsets.left,
							top:options.___offsets.top,
							margin:"0"
						});
						$("body").css("background-attachment","fixed").css("background-image","url(about:blank)");
						var $layer = document.createElement("<div style='position:absolute;border:0;padding:0;margin:0;overflow:hidden;background:transparent;top:expression((document).documentElement.scrollTop);left:expression((document).documentElement.scrollLeft);width:expression((document).documentElement.clientWidth);height:expression((document).documentElement.clientHeight);display:block;z-index:999992'>");
						$("body").append($layer);
						$box.appendTo($layer);
					}
				}else{
					$box.css({
						position:"absolute",
						top:document.documentElement.offsetHeight/2-$height/2-5+"px",
						marginTop:"0"
					});
					$(window).resize(function(){
						$box.css({
							top:document.documentElement.offsetHeight/2-$height/2-5+"px"
						});
					});
					$("body").css("background-attachment","fixed").css("background-image","url(about:blank)");
					var $layer = document.createElement("<div style='position:absolute;border:0;padding:0;margin:0;overflow:hidden;background:transparent;top:expression((document).documentElement.scrollTop);left:expression((document).documentElement.scrollLeft);width:expression((document).documentElement.clientWidth);height:expression((document).documentElement.clientHeight);display:block;z-index:999992'>");
					$("body").append($layer);
					$box.appendTo($layer);
				};
			};
		},
		//获取要吸附的ID的left和top值并重新计算弹出层left和top值
		getDomPosition: function (options) {
			var $box = $("#___box");
			var sw = $box.outerWidth();
			var sh = $box.outerHeight();
			var $offset = $("#"+options.___triggerID).offset();
			var ol = $offset.left;
			var ot = $offset.top;
			var ___left = options.___offsets.left >= 0 ? options.___offsets.left+ol : options.___offsets.left+ol-sw;
			var ___top = options.___offsets.top >= 0 ? options.___offsets.top+ot : options.___offsets.top+ot-sh;
			setBoxPosition = new Array(___left,___top);
		},
		//装载弹出层内容
		contentBox: function (options) {
			var $contentID = $("#___boxContent");
				$contentType = options.___content.substring(0,options.___content.indexOf(":"));
				$content = options.___content.substring(options.___content.indexOf(":")+1,options.___content.length);
			switch($contentType) {
				case "text":
					$contentID.html($content);
				break;
				case "id":
					$contentID.html($("#"+$content).html());
				break;
				case "img":
				$contentID.ajaxStart(function() {
					$(this).html("<p class='boxLoading'>loading...</p>");
				});
				$.ajax({
					error:function(){
						$contentID.html("<p class='boxError'>加载数据出错...</p>");
					},
					success:function(html){
						$contentID.html("<img src="+$content+" alt='' />");
					}
				});
				break;
				case "url":
				var contentDate=$content.split("?");
				$contentID.ajaxStart(function(){
					$(this).html("<p class='boxLoading'>loading...</p>");
				});
				$.ajax({
					type:contentDate[0],
					url:contentDate[1],
					data:contentDate[2],
					error:function(){
						$contentID.html("<p class='boxError'>加载数据出错...</p>");
					},
					success:function(html){
						$contentID.html(html);
					}
				});
				break;
				case "iframe":
				$contentID.css({overflowY:"hidden"});
				$contentID.ajaxStart(function(){
					$(this).html("<p class='boxLoading'>loading...</p>");
				});
				$.ajax({
					error:function(){
						$contentID.html("<p class='boxError'>加载数据出错...</p>");
					},
					success:function(html){
						$contentID.html("<iframe id=\"___boxIframe\" src=\""+$content+"\" width=\"100%\" height=\""+parseInt(options.___height)+"px\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
					}
				});
			};
		},
		//绑定拖拽
		dragBox: function (options){
			var moveX = 0,moveY = 0,
				drag = false;
			var ___ID = document.getElementById("___box"),
				___Handle = document.getElementById(options.___drag);
			___Handle.onmouseover = function() {
				this.style.cursor = "move";
			};
			___Handle.onmousedown = function(e) {
				drag = true;
				e = window.event?window.event:e;
				moveX = e.clientX - ___ID.offsetLeft;
				moveY = e.clientY - ___ID.offsetTop;
				document.onmousemove = function(e) {
					if (drag) {
						e = window.event?window.event:e;
						window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();//阻止浏览器默认选取
						var x = e.clientX - moveX;
						var y = e.clientY - moveY;
							___ID.style.left = x + "px";
							___ID.style.top = y + "px";
							___ID.style.margin = "auto";
					};
				};
				document.onmouseup = function(){
					drag = false;
				};
			};
		},
		//关闭弹出层
		removeBox: function (options){
			var $box = $("#___box");
			var $boxbg = $("#boxBg");
				$("select").css("visibility","visible");//关闭弹出层后显示下拉菜单
			if($box != null || $boxbg != null){
				$box.remove();
				$boxbg.remove();
			};
		},
		//健盘事件，当按Esc的时候关闭弹出层
		keyDown: function() {
			document.onkeydown = function(e) {
				e = e || event;
				if(e.keyCode == 27){
					$.tipsWindow.removeBox();
				};
			};
		}
	});
})(jQuery);