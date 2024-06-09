<?php
require_once 'common.inc.php';
require_once "BaeLog.class.php";
$plat = trim($_GET['plat']);
require_once 'libs/OAuth.php';
$OAuth = new OAuth2($plat);

$OAuth->setCallback('http://'.HOST.'/login_callback.php?plat='.$plat);

$token = $OAuth->getAccessToken();
if($token['userid']=='' && $token['access_token']==''){
    $url = '/connect/'.$plat;
    @header('content-type:text/html;charset=utf-8');
    echo '很不幸，未能正确获取您的信息，可能需要<a href="'.$url.'">重试一次</a>';
    echo '<div style="display:none;">'.print_r($token,TRUE).'</div>';
    exit;
}

$sql="select * from users where platform='".$token['platform']."' and userid= '".$token['userid']."' limit 1 ";
$query = $mysql->query($sql);
$obj = $query->fetch_object();

if(!$obj){
    $now = time();
    $sql="INSERT INTO  `users`
    (`platform` ,`userid` ,`accesstoken` ,`refershtoken` ,`sessionkey`,`session_secret` ,`refershtime` ,`expires_in` ,`username` ,`createtime`,`client_id`,`openid`,`avatar`)
    VALUES
    ('".$token['platform']."',  '".$token['userid']."',  '".$token['access_token']."',  '".$token['refresh_token']."',
    '".$token['session_key']."',  '".$token['session_secret']."',  ".$now.",  '".$token['expires_in']."',
    '".$token['username']."',".$now.",'".$token['client_id']."','".$token['openid']."','".$token['avatar']."')";
    $OAuth->postWeibo(array(
            'content'=>'我刚登录了'.SITENAME.',这是一个免费的图片存储库,你也可以来看看哦~',
            'clientip'=>getIP(),
            'access_token'=>$token['access_token'],
            'openid'=>$token['openid']
    ));
    
}
else
{
    $sql=vsprintf("update `users` set accesstoken='%s',refershtoken='%s',sessionkey='%s',session_secret='%s',expires_in='%d',avatar='%s' 
    where id = %d",array($token['access_token'],$token['refresh_token'],$token['session_key'],$token['session_secret'],
            $token['expires_in'],$token['avatar'],$obj->id));
    
}


$mysql->query($sql);
setcookie('auth',urlencode(base64_encode(json_encode($token))),time()+60*60*24*30,'/');
$CurrUser = $token;
header('location:/');
exit;
?>