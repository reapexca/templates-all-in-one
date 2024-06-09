<?php
header('content-type:text/html;charset=utf-8');
date_default_timezone_set('asia/chongqing');

require_once 'conf.inc.php';

/*从环境变量里取出数据库连接需要的参数*/
$host = getenv('HTTP_BAE_ENV_ADDR_SQL_IP');
$port = getenv('HTTP_BAE_ENV_ADDR_SQL_PORT');
$user = getenv('HTTP_BAE_ENV_AK');
$pwd = getenv('HTTP_BAE_ENV_SK');




$mysql = @new mysqli($host, $user, $pwd, DBNAME, $port);
if($mysql->connect_errno) {
    die("Connect Server Failed: " . $mysql->connect_error);
}
$mysql->query("SET NAMES 'utf8'"); 
$mysql->query("SET CHARACTER_SET_CLIENT=utf8"); 
$mysql->query("SET CHARACTER_SET_RESULTS=utf8"); 

$CurrUser =array();
if(isset($_COOKIE['auth']))
    $CurrUser = (array)json_decode(base64_decode(urldecode($_COOKIE['auth'])));


function shutdown(){
    global $link;
    if(is_resource($link))
        $link->close();
    
}

function getIP()
{
    static $realip;
    if (isset($_SERVER)){
        if (isset($_SERVER["HTTP_CLIENTIP"])){
            $realip = $_SERVER["HTTP_CLIENTIP"];
        } else if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
            $realip = explode(',',$_SERVER["HTTP_X_FORWARDED_FOR"]);
            $realip = $realip[0];
        } else {
            $realip = $_SERVER["REMOTE_ADDR"];
        }
    } else {
        if (getenv("HTTP_X_FORWARDED_FOR")){
            $realip = getenv("HTTP_X_FORWARDED_FOR");
            $realip = explode(',',$realip);
            $realip = $realip[0];
        } else if (getenv("HTTP_CLIENT_IP")) {
            $realip = getenv("HTTP_CLIENT_IP");
        } else {
            $realip = getenv("REMOTE_ADDR");
        }
    }

    return $realip;
}

function genRandomString($len=10) 
{ 
    $chars = array( 
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",  
        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",  
        "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",  
        "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",  
        "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",  
        "3", "4", "5", "6", "7", "8", "9" 
    ); 
    $charsLen = count($chars) - 1; 
    shuffle($chars);    // 将数组打乱 
    $output = ""; 
    for ($i=0; $i<$len; $i++) 
    { 
        $output .= $chars[mt_rand(0, $charsLen)]; 
    } 
    return $output; 
 
} 




function counter_incr($countname){
    require_once ( "BaeCounter.class.php" ) ;
    $cr = new BaeCounter();
    if(!$cr->isExist($countname))
         $cr->register($countname);
    $cr->increase($countname,1);
}


function counter_decr($countname){
    require_once ( "BaeCounter.class.php" ) ;
    $cr = new BaeCounter();
    if(!$cr->isExist($countname))
        return;
    $cr->get($countname) > 0 && $cr->decrease($countname);
}


function counter_get($countname){
    require_once ( "BaeCounter.class.php" ) ;
    $cr = new BaeCounter();
    return  $cr->isExist($countname) ?  $cr->get($countname) : 0;
}

function  setupSize( $fileSize ) {
    $size = sprintf ( " %u " ,   $fileSize );
    $sizename  = array ( " Bytes " ,   "  KB " ,   "  MB " ,   "  GB " ,   "  TB " ,   "  PB " ,   "  EB " ,   "  ZB " ,   "  YB " );
    return   round ( $size / pow ( 1024 ,  ( $i   =   floor ( log ( $size ,   1024 )))) ,  3 )  .   $sizename [ $i ];
}

register_shutdown_function('shutdown');

?>