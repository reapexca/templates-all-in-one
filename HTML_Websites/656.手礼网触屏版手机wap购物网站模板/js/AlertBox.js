/*!
 * AlertBox
 * Copyright (c) 2010 cloudgamer
 * Blog: http://cloudgamer.cnblogs.com/
 * Date: 2010-10-10
 */

//显示层对象
var AlertBox = function(box, options){
	//初始化程序
	this._initialize( box, options );
	this._initBox();
};
AlertBox.prototype = {
  _initialize: function(box, options) {
	
	this.box = $$(box);//显示层
	
	this._css = null;//备份样式
	
	this._setOptions(options);
	
	this.fixed = !!this.options.fixed;
	this.zIndex = this.options.zIndex;
	
	this.onShow = this.options.onShow;
	this.onClose = this.options.onClose;
	
	$$CE.fireEvent( this, "init" );
  },
  //设置默认属性
  _setOptions: function(options) {
    this.options = {//默认值
		fixed:		false,//是否固定定位
		zIndex:		1000,//层叠值
		onShow:		$$.emptyFunction,//显示时执行
		onClose:	$$.emptyFunction//关闭时执行
	};
    return $$.extend(this.options, options || {});
  },
  //初始化显示层对象
  _initBox: function() {
	var style = this.box.style;
	this._css = { "display": style.display, "visibility": style.visibility, "position": style.position, "zIndex": style.zIndex };//备份样式
	style.display = "none";
	style.visibility = "visible";
	document.body.insertBefore(this.box, document.body.childNodes[0]);
	$$CE.fireEvent( this, "initBox" );
  },
  //显示
  show: function(isResize) {
	//定位显示
	var style = this.box.style;
	style.position = this.fixed ? "fixed" : "absolute";
	style.zIndex = this.zIndex;
	$$CE.fireEvent( this, "show", isResize );
	style.display = "block";
	this.onShow();
  },
  //关闭
  close: function() {
	this.box.style.display = "none";
	$$CE.fireEvent( this, "close" );
	this.onClose();
  },
  //销毁程序
  dispose: function() {
	$$CE.fireEvent( this, "dispose" );
	$$D.setStyle( this.box, this._css );//恢复样式
	//清除属性
	this.box = this.onShow = this.onClose = null;
  }
};



//修正fixed对象
var RepairFixed = function() {
	if ( !$$B.ie6 ) return;
	var layer, body, parent = "__repairfixed";//记录父节点
	function Create(){//创建定位层函数
		body = document.body
		if (body.currentStyle.backgroundAttachment !== "fixed") {
			if (body.currentStyle.backgroundImage === "none") {
				body.runtimeStyle.backgroundRepeat = "no-repeat";
				body.runtimeStyle.backgroundImage = "url(about:blank)";
			}
			body.runtimeStyle.backgroundAttachment = "fixed";
		}
		layer = document.createElement("<div style='position:absolute;border:0;padding:0;margin:0;overflow:hidden;background:transparent;top:expression((document).documentElement.scrollTop);left:expression((document).documentElement.scrollLeft);width:expression((document).documentElement.clientWidth);height:expression((document).documentElement.clientHeight);display:block;'>");
		Create = $$.emptyFunction;
	}
	return {
		"append": function(elem){
			Create();
			elem[ parent ] = elem.parentNode;
			layer.appendChild(elem).runtimeStyle.position = "absolute";
			//插入body
			if ( layer.parentNode !== body ) body.insertBefore(layer, body.childNodes[0]);
		},
		"remove": function(elem){
			if ( !layer ) return;
			//移除元素
			if ( elem.parentNode === layer ) {
				elem.runtimeStyle.position = "";
				elem[ parent ] ? elem[parent].appendChild(elem) : layer.removeChild(elem);
				elem.removeAttribute(parent);//不能用delete
			}
			//没有内部元素就移除
			if ( !layer.childNodes.length && layer.parentNode == body ) body.removeChild(layer);
		}
	};
}();

//兼容ie6扩展
if ( $$B.ie6 ) { AlertBox.prototype._initialize = (function(){
	var init = AlertBox.prototype._initialize,
		methods = {
			"init": function(){
				this._iframe = null;//遮盖select的iframe
				this.fixSelect = !!this.options.fixSelect;
			},
			"show": function(isResize) {
				RepairFixed[ this.fixed ? "append" : "remove" ]( this.box );
				if ( this.fixSelect ) {
					if ( !this._iframe ) {
						this._iframe = this.box.appendChild( document.createElement("<iframe style=\"position:absolute;z-index:-1;filter:alpha(opacity=0);\"></iframe>") );
						isResize = true;
					}
					if ( isResize ) {
						var size = $$D.getSize(this.box);
						$$D.setStyle( this._iframe, {
							height: size.height + "px", width: size.width + "px",
							top: -this.box.clientTop + "px", left: -this.box.clientLeft + "px"
						});
					}
				}
			},
			"close": function() {
				RepairFixed.remove( this.box );
			},
			"dispose": function() {
				RepairFixed.remove( this.box );
				if ( this._iframe ) this.box.removeChild( this._iframe );
				this._iframe = null;
			}
		};
	return function(){
		var args = [].slice.call(arguments), options = args[1] = args[1] || {};
		//扩展options
		$$.extend( options, {
			fixSelect:	true//是否修复select遮盖问题
		}, false );
		//扩展钩子
		$$A.forEach( methods, function( method, name ){
			$$CE.addEvent( this, name, method );
		}, this );
		init.apply( this, args );
	}
})();}


//居中扩展
AlertBox.prototype._initialize = (function(){
	var init = AlertBox.prototype._initialize,
		methods = {
			"init": function(){
				this._centerCss = null;//记录原始样式
				this.center = !!this.options.center;
			},
			"show": function(isResize){
				if ( this.center ) {
					if ( !this._centerCss ) {
						var style = this.box.style;
						this._centerCss = { marginTop: style.marginTop, marginLeft: style.marginLeft, left: style.left, top: style.top };
						isResize = true;
					}
					if ( isResize ) {
						var size = $$D.getSize(this.box);
						$$D.setStyle( this.box, {
							marginTop: (this.fixed ? 0 : $$D.getScrollTop()) - size.height / 2 + "px",
							marginLeft: (this.fixed ? 0 : $$D.getScrollLeft()) - size.width / 2 + "px",
							top: "50%", left: "50%"
						});
					}
				} else {
					if ( this._centerCss ) {
						$$D.setStyle( this.box, this._centerCss ); this._centerCss = null;
					}
				}
			},
			"dispose": function(){
				if ( this._centerCss ) $$D.setStyle( this.box, this._centerCss );
				this._centerCss = null;
			}
		};
	return function(){
		var args = [].slice.call(arguments), options = args[1] = args[1] || {};
		//扩展options
		$$.extend( options, {
			center:	false//是否居中
		}, false );
		//扩展钩子
		$$A.forEach( methods, function( method, name ){
			$$CE.addEvent( this, name, method );
		}, this );
		init.apply( this, args );
	}
})();


//覆盖层
var OverLay = function(){
	var overlay;
	function Create(){
		var lay = document.body.insertBefore(document.createElement("div"), document.body.childNodes[0]);
		$$D.setStyle( lay, {
			overflow: "hidden", width: "100%", height: "100%",
			border: 0, padding: 0, margin: 0, top: 0, left: 0
		});
		overlay = new AlertBox( lay, { fixed: true } );
		Create = $$.emptyFunction;
	}
	return {
		"color":	"#000",//背景色
		"opacity":	.5,//透明度(0-1)
		"zIndex":	100,//层叠值
		"show": function(){
			Create();
			$$D.setStyle( overlay.box, {
				backgroundColor: this.color, opacity: this.opacity
			});
			overlay.zIndex = this.zIndex;
			overlay.show();
		},
		"close": function(){ overlay && overlay.close(); }
	};
}()