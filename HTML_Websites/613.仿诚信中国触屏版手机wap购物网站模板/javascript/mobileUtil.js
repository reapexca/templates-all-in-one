// 通过class获取元素
function getByClass(oParent, sClass){
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	var i = 0;

	for(i = 0; i < aEle.length; i++){
		if(aEle[i].className.indexOf(sClass) >= 0){
			aResult.push(aEle[i]);
		}
	}

	return aResult;
}

// 获取元素的样式
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false)[attr];
	}
}

// 设置图片的缩放比例
function setImg(sClass, n){
	var sBody = document.getElementsByTagName('body')[0];
	var iImgs = getByClass(sBody, sClass);
	var i = 0;
	for(i = 0; i < iImgs.length; i++){
		iImgs[i].style.height = parseFloat(getStyle(iImgs[i], "width")) * n + "px";
	}	
}