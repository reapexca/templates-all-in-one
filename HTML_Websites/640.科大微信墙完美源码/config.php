<?php
#管理信息
define('SUSER', 'admin');//管理用户名
define('SPASS', 'admin');//登录密码

/***************微信接口配置********************/
#微信验证token
define('TOKEN', 'yang');//有用拓展接口请和拓展接口的token一样,不懂联系我
define('API_EXT', '');//拓展接口api地址,必须是标准xml接口,如果不用请设为空串,优先级比微信墙低
#又注，“可能”某些特殊URL处理会有bug，具体请联系我
#上面不懂都请联系我


/**************数据库信息**************/
#不懂配置请联系我


define('DATABASE', 'qiang');//数据库名
define('HOST', "103.24.0.184");//主机IP
define('HOST_S', '103.24.0.184');//主机IP,同上
define('PORT', '3306');//端口
define('USER', 'root');//数据库用户名
define('PASSWORD', '713001991');//数据库密码


/*
#Bae
define('DATABASE', 'AJtGvdnHybVXpbdaMOWw');//数据库名，使用Bae只需要改这里
define('HOST', getenv('HTTP_BAE_ENV_ADDR_SQL_IP'));//主库
define('HOST_S', getenv('HTTP_BAE_ENV_ADDR_SQL_IP'));//从库
define('PORT', getenv('HTTP_BAE_ENV_ADDR_SQL_PORT'));//端口
define('USER', getenv('HTTP_BAE_ENV_AK'));//用户名
define('PASSWORD', getenv('HTTP_BAE_ENV_SK'));//密码
*/

/*
#Sae
define('DATABASE', SAE_MYSQL_DB);//数据库名
define('HOST', SAE_MYSQL_HOST_M);//主库
define('HOST_S', SAE_MYSQL_HOST_S);//从库
define('PORT', SAE_MYSQL_PORT);//端口
define('USER', SAE_MYSQL_USER);//用户名
define('PASSWORD', SAE_MYSQL_PASS);//密码
*/


#表名
define('CONTENT', 'wechat_screen_content');//上墙内容表
define('CONFIG', 'wechat_screen_config');//配置表
define('VOTE', 'wechat_screen_vote');//投票信息表
define('VOTE_USER', 'wechat_screen_vote_user');//投票用户表
define('WX_USER', 'wechat_user');//微信用户

/***************初始化********************/
define('ROOT_DIR',dirname(realpath(__FILE__)));
$GLOBALS['pdo'] = 0;
$GLOBALS['pdos'] = 0;
header('Content-Type:text/html;charset=utf-8');
require_once ROOT_DIR.'/inc/fun.php';

#清除多余斜线！！！
if(get_magic_quotes_gpc()){
    function stripslashes_deep($value){
	    $value = is_array($value) ? array_map('stripslashes_deep',$value) : stripslashes($value);
	    return $value;
	}

	$_POST = array_map('stripslashes_deep',$_POST);
	$_GET = array_map('stripslashes_deep',$_GET);
    $_COOKIE = array_map('stripslashes_deep',$_COOKIE);
	$_REQUEST = array_map('stripslashes_deep',$_REQUEST);
}