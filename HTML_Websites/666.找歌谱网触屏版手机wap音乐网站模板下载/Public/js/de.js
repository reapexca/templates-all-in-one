function jiemi(key,txt){
	var detxt = de(unescape(txt),key);
	var c = detxt.split("★"); 
	var kuan="";
	var gao="";
	if(c[1]=="" || c[1]==0){}else{kuan=" width=\"" + c[1] + "\"";}
	if(c[2]=="" || c[2]==0){}else{gao=" height=\"" + c[1] + "\"";}
	var img_html = "<a href=\"" + c[0] + "\" target=\"_blank\" title=\"" + c[3] + "\"><img alt=\"" + c[3] + "\"  src=\"" + c[0] + "\" /></a><br />";
    document.write(img_html);
}

function de(content,key) {
	if (content == null) return "";
	var  result="";
	var j = 0 ;
	for (var i=0; i <content.length ; i++ ){
		result += String.fromCharCode( content.charCodeAt(i) ^  key.charCodeAt(j));
		j++;
		if(j >= key.length){j=0;}
	}
 	return result;
}

function loadok(obj) {
	$(obj).parent().prev().hide();
}
