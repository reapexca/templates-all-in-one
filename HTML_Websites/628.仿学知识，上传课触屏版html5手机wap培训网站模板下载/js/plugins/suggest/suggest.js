if (typeof KK != 'object') {var KK = {};}

KK.$ = function(id) {
	return document.getElementById(id);
};

KK.Ajax = KK.Ajax || {};
KK.Ajax.InitAjax = function() {
    var http_request = false;

    if (window.XMLHttpRequest) {
        try {
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } catch (e) {}
    } else if (window.ActiveXObject) {
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
            for(var n = 0; n < MSXML.length; n ++) {
                try {
                    http_request = new ActiveXObject(MSXML[n]);
                    break;
                } catch(e) {}
            }
        }
    }
    return http_request;
};

if (typeof(String.prototype.trim) == 'undefined') {
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
};

if (typeof(String.prototype.stripTags) == 'undefined') {
    String.prototype.stripTags=function() {
        return this.replace(/<\/?[^>]+>/gi, '');
    };
};

KK.Suggest = {
	_version:'1.0',
	_sugInterface: "@mod=search&act=suggest&keyword=",
	_inputField:null,
	_userInput:null,
	_userLastInput:null,
	_xmlHttp:null,
	_sugContainer:null,
	_sugSubContainer:null,
	_minInputChars:1,
	_maxInputChars:30,
	_sugDelay:10,
	_sugDelayTimer:null,
	_sugSize:0,
	_sugSizeMax:10,
	_numItemsInBox:0,
	_sugInviewSizeMax:10,
	_currentItem:null,
	_userAgent:null
};

KK.Suggest.Rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

KK.Suggest.Init = function() {
	KK.Suggest._userInput = '';
	KK.Suggest._userLastInput = '';
	KK.Suggest._sugSize = 0;
};

KK.Suggest.Install = function(inputID, sugDivID) {
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('msie') != -1) KK.Suggest._userAgent = 'ie';
	if (userAgent.indexOf('gecko') != -1) KK.Suggest._userAgent = 'gecko';
	if (userAgent.indexOf('opera') != -1) KK.Suggest._userAgent = 'opera';
	
	KK.Suggest._inputField = KK.$(inputID);
	KK.Suggest._inputField.autocomplete = 'off';
	KK.Suggest._inputField.setAttribute("autocomplete", "off");
	KK.Suggest._userInput = KK.Suggest._inputField.value.replace(/^\s+/g, '');
	
	KK.Suggest._sugContainer = KK.$(sugDivID);
	KK.Suggest._sugContainer.innerHTML = '<div id="SugContent" class="srh_list"></div>';
	KK.Suggest._sugSubContainer = KK.$('SugContent');
	
	KK.Suggest.Init();
	
	KK.Suggest._xmlHttp = KK.Ajax.InitAjax();
	KK.Suggest._inputField.onkeyup = KK.Suggest.InputOnKeyup;
	KK.Suggest._inputField.onkeydown = KK.Suggest.InputOnKeydown;
	
	if ('ie' == KK.Suggest._userAgent) {
		document.attachEvent("onclick", KK.Suggest.SugOnBlur);
		KK.Suggest._sugContainer.attachEvent("onclick", KK.Suggest.PreventClose);
		KK.Suggest._inputField.attachEvent("onclick", KK.Suggest.PreventClose);
	} else {
		document.addEventListener("click", KK.Suggest.SugOnBlur, false);
		KK.Suggest._sugContainer.addEventListener("click", KK.Suggest.PreventClose, false);
		KK.Suggest._inputField.addEventListener("click", KK.Suggest.PreventClose, false);
	}
	
	window.onresize = function() {
		if (KK.Suggest.GetShowStatus()) {
			KK.Suggest.Show();
		}
	};
};

KK.Suggest.SugOnBlur = function(event) {
	if (KK.Suggest._sugDelayTimer) clearTimeout(KK.Suggest._sugDelayTimer);
	KK.Suggest.Hide();
};

KK.Suggest.PreventClose = function(event) {
	var e = event || window.event;
	if ('ie' == KK.Suggest._userAgent) {
		e.cancelBubble = true;
	} else {
		e.stopPropagation();
	}
};

KK.Suggest.InputOnKeyup = function(event) {
	var showStatus = KK.Suggest.GetShowStatus();
	var e = event || window.event;
	var eventKey = e.charCode || e.keyCode;

	if (((eventKey >= 48 && eventKey <= 57) 
		|| (eventKey >= 65 && eventKey <= 90) 
		|| 61 == eventKey || 107 == eventKey || 187 == eventKey || 43 == eventKey 
		|| 109 == eventKey || 189 == eventKey || 45 == eventKey 
		|| 191 == eventKey  || 111 == eventKey || 47 == eventKey 
		|| 8 == eventKey 
		|| 32 == eventKey 
		|| 46 == eventKey
	) && KK.Suggest._userLastInput != KK.Suggest._inputField.value) {
		if ('' == KK.Suggest._inputField.value.trim()) {
			KK.Suggest.Hide();
			KK.Suggest.Init();
		} else {
			KK.Suggest.Query();
		}
	}

	if (38 == eventKey) {
		if (showStatus && !KK.Suggest._sugSize) {
			KK.Suggest.Hide();
		}
	}

	if (40 == eventKey) {
		if (!showStatus) {
			if ('' != KK.Suggest._inputField.value.trim()) {
				KK.Suggest.Query();
			} else {
				KK.Suggest.Show();
			}
		}
	}

	if (13 == eventKey && KK.Suggest._sugSize > 0) {
		if (showStatus) {
			if (KK.Suggest._currentItem) KK.Suggest.ItemOnSelect(KK.Suggest._currentItem);
			KK.Suggest.Hide();
			return false;
		}
	}
};

KK.Suggest.InputOnKeydown = function (event) {
	var showStatus = KK.Suggest.GetShowStatus();
	var e = event || window.event;
	var eventKey = e.charCode || e.keyCode;

	if (38 == eventKey) {
		if (showStatus && KK.Suggest._sugSize > 0) {
			KK.Suggest.InputOnScrollup();
			KK.Suggest.ItemOnSelect(KK.Suggest._currentItem);
		}
	}
	
	if (40 == eventKey) {
		if (showStatus && KK.Suggest._sugSize > 0) {
			KK.Suggest.InputOnScrolldown();
			KK.Suggest.ItemOnSelect(KK.Suggest._currentItem);
		}
	}
};

/**
* scroll up
*
* 1 刚刚初始化，没有当前节点
* 2 当前节点为第一个节点
* 3 当前节点不是第一个节点
*/
KK.Suggest.InputOnScrollup = function () {
	var lastItem = null;
	if (null == KK.Suggest._currentItem) {
		KK.Suggest._currentItem = KK.Suggest._sugSubContainer.firstChild.lastChild;
	} else if (KK.Suggest._currentItem == KK.Suggest._sugSubContainer.firstChild.firstChild) {
		lastItem = KK.Suggest._currentItem;
		KK.Suggest._currentItem = null;
	} else {
		lastItem = KK.Suggest._currentItem;
		KK.Suggest._currentItem = KK.Suggest._currentItem.previousSibling;
	}
	if (lastItem) KK.Suggest.ItemHighlight(lastItem, false);
	if (KK.Suggest._currentItem) KK.Suggest.ItemHighlight(KK.Suggest._currentItem, true);
};

KK.Suggest.InputOnScrolldown = function () {
	var lastItem = null;
	if (null == KK.Suggest._currentItem) {
		KK.Suggest._currentItem = KK.Suggest._sugSubContainer.firstChild.firstChild;
	} else if (KK.Suggest._currentItem == KK.Suggest._sugSubContainer.firstChild.lastChild) {
		lastItem = KK.Suggest._currentItem;
		KK.Suggest._currentItem = null;
	} else {
		lastItem = KK.Suggest._currentItem;
		KK.Suggest._currentItem = KK.Suggest._currentItem.nextSibling;
	}
	if (lastItem) KK.Suggest.ItemHighlight(lastItem, false);
	if (KK.Suggest._currentItem) KK.Suggest.ItemHighlight(KK.Suggest._currentItem, true);
};

KK.Suggest.Query = function () {
	if (KK.Suggest._sugDelayTimer) clearTimeout(KK.Suggest._sugDelayTimer);
	KK.Suggest._userInput = KK.Suggest._inputField.value.replace(/^\s+/g, '');
	KK.Suggest._userLastInput = KK.Suggest._userInput;
	if (KK.Suggest._userInput.length >= KK.Suggest._minInputChars && KK.Suggest._userInput.length <= KK.Suggest._maxInputChars && KK.Suggest._userInput != '') {
		KK.Suggest._sugDelayTimer = setTimeout(KK.Suggest.Start, KK.Suggest._sugDelay);
		return true;
	} else {
		KK.Suggest._sugSize = 0;
		return false;
	}
};

KK.Suggest.Start = function () {
	var keyword = KK.Suggest._userInput;
	KK.Suggest._xmlHttp.open("GET", KK.Suggest._sugInterface + encodeURIComponent(keyword) + '&random='+Math.random(), true);
	KK.Suggest._xmlHttp.onreadystatechange = KK.Suggest.GetSuggestData;
	KK.Suggest._xmlHttp.setRequestHeader('Connection', 'close');
	KK.Suggest._xmlHttp.send(null);
};

KK.Suggest.GetSuggestData = function () {
	if (KK.Suggest._xmlHttp.readyState == 4) {
		if (KK.Suggest._xmlHttp.status == 200 && KK.Suggest._xmlHttp.responseText.length > 0) {
			var xmlhttpres = KK.Suggest._xmlHttp.responseText.trim();
			if (xmlhttpres && xmlhttpres.indexOf("\n")) {
				xmlhttpres = xmlhttpres.split("\n");
				KK.Suggest._sugSize = xmlhttpres.length;
				if (KK.Suggest._sugSize > 0) {
					KK.Suggest.Display(xmlhttpres);
				}
			} else if ('' != xmlhttpres) {
				xmlhttpres = [xmlhttpres];
				KK.Suggest.Display(xmlhttpres);
			}
		}
	}
};

KK.Suggest.Display = function(suggests) {
	var item = null;
	KK.Suggest._numItemsInBox = (KK.Suggest._sugSize > KK.Suggest._sugSizeMax) ?  KK.Suggest._sugSizeMax : KK.Suggest._sugSize;
	KK.Suggest.Clear();
	var pitem = document.createElement("ul");
	
	for (var i = 0; i < KK.Suggest._numItemsInBox; i++) {
		suggests[i] = suggests[i].trim();

		item = document.createElement("li");
		item.sugItemId = i;

		var pattern4HighLight = new RegExp("^"+KK.Suggest._userInput.replace(/(\||\{)/g, "\\$1"), "i");

		item.sugData = suggests[i].stripTags();
		item.innerHTML = suggests[i].replace(pattern4HighLight, '<b>'+KK.Suggest._userInput+'</b>');

		item.className = '';
		item.onmouseover = KK.Suggest.ItemOnMouseover;
		item.onmouseout = KK.Suggest.ItemOnMouseout;
		item.onclick = KK.Suggest.ItemOnClick;
		pitem.appendChild(item);
	}

	KK.Suggest._sugSubContainer.appendChild(pitem);

	KK.Suggest._currentItem = null;
	KK.Suggest.Show();
};

KK.Suggest.ItemOnMouseover = function(event) {
	if (KK.Suggest._currentItem) KK.Suggest.ItemHighlight(KK.Suggest._currentItem, false);
	KK.Suggest._currentItem = this;
	KK.Suggest.ItemHighlight(this, true);
};

KK.Suggest.ItemOnMouseout = function(event) {
	if (KK.Suggest._currentItem) KK.Suggest.ItemHighlight(KK.Suggest._currentItem, false);
	KK.Suggest._currentItem = null;
	KK.Suggest.ItemHighlight(this, false);
};

KK.Suggest.ItemOnClick = function(event) {
	KK.Suggest.ItemOnSelect(this);
	$("#head_searchSubmit").trigger('click');
};

KK.Suggest.SetOffsets = function() {
	KK.Suggest._sugContainer.style.left = (KK.Suggest.GetOffsetLeft(KK.Suggest._inputField)-_index_suggest_left_off) + "px";
	KK.Suggest._sugContainer.style.top = (KK.Suggest.GetOffsetTop(KK.Suggest._inputField) + KK.Suggest._inputField.offsetHeight -2) + "px";
};

KK.Suggest.GetOffsetLeft = function(node) {
	return KK.Suggest.GetOffset(node, "offsetLeft");
};

KK.Suggest.GetOffsetTop = function(node) {
	return KK.Suggest.GetOffset(node, "offsetTop");
};

KK.Suggest.GetOffset = function(node, attr) {
	var offset = 0;
	while (node) {
		offset += node[attr];
		node = node.offsetParent;
	}
	return offset;
};

KK.Suggest.ItemOnSelect = function (item) {
	if (item) {
		KK.Suggest._inputField.value = item.sugData;
	} else {
		KK.Suggest._inputField.value = KK.Suggest._userInput;
	}
};

KK.Suggest.SugSelectPart = function () {};

KK.Suggest.Clear = function () {
	KK.Suggest._sugSubContainer.innerHTML = '';
};

KK.Suggest.Show = function() {
	KK.Suggest._sugContainer.style.visibility = 'visible';
};

KK.Suggest.Hide = function () {
	KK.Suggest._sugContainer.style.visibility = 'hidden';
};

KK.Suggest.GetShowStatus = function() {
	return ('visible' == KK.Suggest._sugContainer.style.visibility ? true : false);
};

KK.Suggest.ItemHighlight = function(item, isHighlight) {
	if (isHighlight) {
		item.className = 'curr';
	} else {
		item.className = '';
	}
};