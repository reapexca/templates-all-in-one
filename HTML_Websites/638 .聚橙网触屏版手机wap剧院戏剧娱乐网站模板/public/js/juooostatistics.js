
//来源url
var ref_url=document.referrer;

//当前url
var now_url=window.location.href;
//时间戳，js的是十三位，最后三位是毫秒

var timestamp = (new Date()).valueOf();

//随机数
var r_str=juooo_bigdata_getRandomStr(19);

//获取用户ID
var userid=juooo_bigdata_getCookie("app_user_id");

//新时间戳，js的10位数
var new_time=Math.round(new Date().getTime()/1000);

var new_timestamp=juooo_bigdata_getCookie("new_timestamp");

if(juooo_bigdata_isEmpty(new_timestamp)){
  juooo_bigdata_setCookie('new_timestamp',new_time);
}

var random_id=juooo_bigdata_getCookie('random_id');

if(juooo_bigdata_isEmpty(random_id)){
  var random_id=timestamp+r_str;
  juooo_bigdata_setCookie('random_id',random_id);
}
var type = 'webapp';

$.ajax({
      dataType:'jsonp',
      async: false,
      jsonp: "callback",
      url: '../api.juooo.com/referer/insertContent.php@userid='+userid+'&random_id='+random_id+'&ref_url='+ref_url+'&now_url='+now_url+'&new_timestamp='+new_timestamp+'&type='+type,
      success: function(result){
        //alert(result);

      },
      error:function(){
        //alert(123);
      }
});


function juooo_bigdata_isEmpty(s) { 
  return ((s == undefined || s == null || s == "") ? true : false); 
} 

//js获取cookie
/*获取Cookie值*/

function juooo_bigdata_getCookie(name)//取cookies函数     
{  
   var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
   if(arr != null) return (arr[2]); return null;  
  
}  

//JS操作cookies方法! *****************************************************************

//写cookies

function juooo_bigdata_setCookie(name,value)
{
 var Days = 365;
 var exp = new Date();
 exp.setTime(exp.getTime() + Days*24*60*60*1000);
 document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//传入数字得到该位数的随机数
function juooo_bigdata_getRandomStr(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

