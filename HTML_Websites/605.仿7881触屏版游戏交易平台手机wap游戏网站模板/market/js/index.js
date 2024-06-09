$(document).ready(function() {
	isLogin();
	
	$('#hlk_search_simple').click(function(){
		var txt_search = $('#txt_search_simple').val();
		if(txt_search == ''){
			alert('请输入游戏名称关键字');
			return false;
		}
		window.location.href='procurement/queryGamesByName.action@gamename='+encodeURI(encodeURI(txt_search));
		return false;
	});
	
});

// 判断是否登录
function isLogin(){
	jQuery.ajax({
		type : 'get',
		url : 'loginCheckReturn.action@ip=' + Math.round(Math.random()*10000),
		success : function(resultData) {
			var result = resultData.split('#');
			if (result[0] == '200' && result.length > 2) {
				//页头
				$('.mainHd .mNav').empty();
	 			 var divuserText = '<a href="personal.html">'+result[1]+'</a><a href="logout.action" class="blue">退出</a>';
	 			 $('.mainHd .mNav').html(divuserText);
				
				//页脚
				 $('.Mfoot .nav').empty();
	 			 var divuserText = '<a href="personal.html">'+result[1]+'</a><em>|</em><a href="logout.action" class="blue">退出</a><em>|</em>'
	 			 	 +'<a href="javascript:window.scrollTo(0,0);">返回顶部</a>';
	 			 $('.Mfoot .nav').html(divuserText);
			}
		}
	});
}