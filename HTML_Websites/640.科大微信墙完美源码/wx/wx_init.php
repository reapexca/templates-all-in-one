<?php
/********************************
* 微信公众平台 插件式框架
* BY:洋子
* 429740278@qq.com
* 2013-4-4
********************************/

include 'config.php';
include 'inc/fun.php';
include 'inc/wechat.class.php';
include 'work/main.php';

$wx = new WeChat();

if($_GET['echostr']){
	$wx->Valid();
	exit;//微信原生接口URL验证
}

$wx->GetMsg();

Work($wx);

if($wx->is_processed != 0){
    $wx->ResponseMsg();
    exit;
}else{
    if(defined('API_EXT') && trim(API_EXT)) one(trim(API_EXT));
    else exit();
}

//这里的接口，如果没有响应请返回空白内容，否则影响后面接口的处理



function one($r){
    $url = $r.'?'.$_SERVER['QUERY_STRING'];
//     $token = $r['token'];

     $c = xml_post($GLOBALS['HTTP_RAW_POST_DATA'], $url);
//     $post_str = $c;
//     $post_obj = simplexml_load_string($post_str,'SimpleXMLElement',LIBXML_NOCDATA);

//     $get_msg_type = $post_obj->MsgType;
//     $con = trim($post_obj->Content);


//     if(($get_msg_type == 'text' && $con) || $get_msg_type != 'text'){
        die($c);
//    }

}


// open a http channel, transmit data and return received buffer
function xml_post($post_xml, $url){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/xml"));
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_xml);
    //curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $data = curl_exec($curl);
    curl_close($curl);
    return $data;
}
