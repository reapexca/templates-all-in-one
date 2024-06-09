<?php

require_once 'common.inc.php';
if(!$CurrUser)
{
    header('location:/');
    exit;
}
$fid = intval($_GET['fid']);
if($fid){
    $query = $mysql->query("select * from filestore where id=".$fid." limit 1");
    $row = $query->fetch_object();
    if($row){
        if($row->userid == $CurrUser['userid'] && $row->platform == $CurrUser['platform']){
            $mysql->query("delete from filestore where id=".$fid);
            $host = 'bcs.duapp.com';
            $bucket = BUCKET;
            $object = "/".$row->filename;
            $baidu_bcs = new BaiduBCS ( BCS_AK, BCS_SK, $host );
            $rtn = (array)$baidu_bcs->delete_object($bucket, $object);
            counter_decr('pic_total');
            die(json_encode(array('code'=>0,'msg'=>'OK','data'=>$rtn['status'])));
        }
        else
            die(json_encode(array('code'=>403,'msg'=>'您无权删除该图片','data'=>NULL)));
    }
    else
        die(json_encode(array('code'=>404,'msg'=>'指定的图片不存在','data'=>NULL)));
}
