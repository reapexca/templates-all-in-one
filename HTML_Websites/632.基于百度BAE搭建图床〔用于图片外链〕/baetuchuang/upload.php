<?php
require_once 'common.inc.php';
if($_FILES)
{
    require_once 'bcs.class.php';
    require_once "BaeLog.class.php";
    $host = 'bcs.duapp.com'; 
   
    
    $object = "/".genRandomString();
    $file = $_FILES['my_uploaded_file']['tmp_name'];
    $originalname = $_FILES['my_uploaded_file']['name'];
    $contenttype = '';
    $fileType = exif_imagetype($file);
    $filesize = filesize($file);
    


    if($fileType!=IMAGETYPE_GIF && $fileType!=IMAGETYPE_JPEG && $fileType!=IMAGETYPE_PNG)
    {
        die(json_encode(array('code'=>1,'message' =>'不是有效的图片格式,只支持gif/jpeg/png.','data'=>null)));

    }
    switch ($fileType) {
        case IMAGETYPE_PNG:
            $object .=".png"; 
            $contenttype="image/png";
            break;
        case IMAGETYPE_GIF:
            $object .=".gif";
            $contenttype = "image/gif";
            break;
        case IMAGETYPE_JPEG:
            $object .=".jpg";
            $contenttype="image/jpeg";
            break;
    }
    $baidu_bcs = new BaiduBCS ( BCS_AK, BCS_SK, $host );
   
    try {
        $response = (array)$baidu_bcs->create_object(BUCKET, $object, $file,array('acl'=>'public-read',
                'contenttype'=>$contenttype
        ));
    } catch (Exception $e) {
        sendsms('百度云存储创建对象失败');
        echo json_encode(array('code'=>500,'message' =>'bcs error','data'=>NULL));
        exit;
    }
    
    if($response['status']==200){
        $userid = $CurrUser ? $CurrUser['userid'] : '0';
        $platform = $CurrUser ? $CurrUser['platform'] : '';
        $fileurl = "http://bcs.duapp.com/".BUCKET.$object;
        
        counter_incr('pic_total',1);
        
        $sql="insert into filestore (filename,created,contenttype,clientip,filesize,originalname,userid,platform) values ('".str_replace('/', '', $object)."',".time().",'".$contenttype."','".getIP()."',".$filesize.",'".$originalname."','".$userid."','".$platform."')";
        
        $mysql->query($sql);
            
            
            if($userid){
                $sql="update users set filecount = filecount + 1 where userid=".$userid." and platform='".$platform."'";
                $mysql->query($sql);
            }
        
        echo json_encode(array('code'=>0,'message' =>'OK','data'=>$fileurl));
    }
    else
    {
        
        echo json_encode(array('code'=>500,'message' =>'对不起，服务器错误['.$response['status'].']','data'=>null));
    }
}
else
{
    echo json_encode(array('code'=>403,'message' =>'FILE IS EMPTY','data'=>NULL));
    
}
?>