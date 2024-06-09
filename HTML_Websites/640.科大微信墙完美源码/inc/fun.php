<?php
#引入文件
function require_once_ex($file_path){
    if(is_array($file_path)){
        foreach($file_path as $one){
            require_once(ROOT_DIR.$one);
        }
    }else{
    	require_once(ROOT_DIR.$file_path);
    }
}

#短网址的算法
function shorturl($input) {
//     $base32 = array (
//             'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
//             'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
//             'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
//             'y', 'z', '0', '1', '2', '3', '4', '5'
//     );
    
    $base32 = array (
            '洋', '子', '天', '地', '江', '湖', '海', '风',
            '花', '雪', '月', '桥', '柳', '道', '松', '竹',
            '桐', '桂', '木', '梅', '莲', '荷', '燕', '蝶',
            '雨', '露', '雾', '春', '夏', '秋', '冬', '兰'
    );

    $hex = md5($input);
    $hexLen = strlen($hex);
    $subHexLen = $hexLen / 8;
    $output = array();

    for ($i = 0; $i < $subHexLen; $i++) {
        $subHex = substr ($hex, $i * 8, 8);
        $int = 0x3FFFFFFF & (1 * ('0x'.$subHex));
        $out = '';

        for ($j = 0; $j < 6; $j++) {
            $val = 0x0000001F & $int;
            $out .= $base32[$val];
            $int = $int >> 5;
        }

        $output[] = $out;
    }

    return $output;
}

#获取用户配置
function get_configs(){
    try{
        $pdobj = getpdobj();
        if($pdobj){
            $q = 'select * from `'.CONFIG.'`';
            $stmt = $pdobj->prepare($q);
            $stmt->execute();
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            $arr = array();
            foreach($row as $r){
                $arr[$r['key']] = $r['value'];
            }
            
            $arr['items_color'] = json_decode($arr['items_color'], true);
            //var_dump($arr);
//             $arr['vote_word'] = '#投票#';
//             $arr['vote_list'] = '王力宏|李云迪|林志颖|郭德纲';
            return $arr;
        }else{
            die('-02');
        }
    }catch(PDOException $e){
        die('-1');
    }
    
//     return array(
//             'site_name' => '微信大屏幕',
//             'wechat_name' => '辽科大助手',
//             'act_word' => '#你好呀#',
//             'res_word' => '感谢您的参与！！！',
            
//             'items_color' => array(
//                     'rgba(93,181,11,.8)',
//                     'rgba(229,182,0,.8)',
//                     'rgba(239,112,39,.8)',
//                     'rgba(10,106,54,.8)',
//                     'rgba(0,175,215,.8)'
                    
//             )
//     );
}

#Pdo
function getpdobj($s = false){
    if($s){
        if(!$GLOBALS['pdos']){
			try{
				$GLOBALS['pdos'] = new PDO('mysql:host='.HOST_S.';port='.PORT.';dbname='.'DATABASE;charset=utf8',USER,PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "set names utf8"));
				$GLOBALS['pdos']->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
			}catch(PDOException $e){
				echo '连接错误：'.$e->getMessage();
				die('-2');
			}
        }
        return $GLOBALS['pdos'];
    }else{
        if(!$GLOBALS['pdo']){
            try{
                $GLOBALS['pdo'] = new PDO('mysql:host='.HOST.';port='.PORT.';dbname='.DATABASE.';charset=utf8',USER,PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND => "set names utf8"));
                $GLOBALS['pdo']->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
            }catch(PDOException $e){
                echo '连接错误：'.$e->getMessage();
                die('-2');
            }
        }
        return $GLOBALS['pdo'];
    }
}

function checkadmin($sid){
    return (md5(SUSER.' <>'.SPASS) == $sid);
    //return false;
    //return true;
}

function writesid($sid,$e = ''){
    //if($sid){
    if(checkadmin($sid)){
        setcookie('sid'.$e,$sid,time()+24*60*60,'/',$_SERVER['SERVER_NAME'],false,true);
        // header('location:'.$_SERVER['PHP_SELF']);
        // die('跳转');
    }else{
        setcookie('sid'.$e,'',time(),'/',$_SERVER['SERVER_NAME'],false,true);
    }
    // }else{
    // if(isset($_COOKIE['sid'])){
    // $sid = $_COOKIE['sid'];
    // if(!checkuser($sid)){
    // setcookie('sid','',time(),'/',$_SERVER['SERVER_NAME'],false,true);
    // }
    // }
    // }
}

function getsid($e = ''){
    if(isset($_COOKIE['sid'.$e])){
        $sid = $_COOKIE['sid'.$e];
        if(!checkadmin($sid)){
            setcookie('sid'.$e,'',time(),'/',$_SERVER['SERVER_NAME'],false,true);
            return '';
        }else{
            return $sid;
        }
    }else{
        return '';
    }
}