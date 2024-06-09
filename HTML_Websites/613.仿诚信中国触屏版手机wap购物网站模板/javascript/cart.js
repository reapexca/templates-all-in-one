$(function(){
	$(".add_cart").click(function(){
	
		var pro_id = $(this).attr("proid");
		
		$.ajax({url:'cartaction.php',
			type:'POST',
			data:{act:"cartadd",proid:pro_id},
			success:function(data){
				
				var obj = JSON.parse(data);
				alert(obj.msg);
			}
		});
	});
})