<?php
//AK 公钥
define ( 'BCS_AK', '' );
//SK 私钥
define ( 'BCS_SK', '' );
//superfile 每个object分片后缀
define ( 'BCS_SUPERFILE_POSTFIX', '_bcs_superfile_' );
//sdk superfile分片大小 ，单位 B（字节）
define ( 'BCS_SUPERFILE_SLICE_SIZE', 1024 * 1024 );


//bucket名称
define('BUCKET','');

//数据库名称
define('DBNAME','');

define('HOST', $_SERVER['HTTP_HOST']);

//站点名称
define('SITENAME', '图床 | TUCHUANG - 您的网络图片库');

//百度开放平台的appid/appkey
define('BAIDU_OAUTH2_APPID','');
define('BAIDU_OAUTH2_APPSECRET','');

//新浪开放平台的appid/appkey
define('SINA_OAUTH2_APPID','');
define('SINA_OAUTH2_APPSECRET','');

//腾讯开放平台的appid/appkey
define('QQ_OAUTH2_APPID','');
define('QQ_OAUTH2_APPSECRET','');