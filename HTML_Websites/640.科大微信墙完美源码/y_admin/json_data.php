<?php
require_once '../config.php';
$last_id = (int)$_GET['last_id'];

$configs = get_configs();
if(!$last_id && $configs['show_last']) $ttt = ' limit 0,50';
try{
    $pdobj = getpdobj();
    if($pdobj){
        $q = 'select * from `'.CONTENT.'` where `check` = ? and `id` > ? order by `id` desc'.$ttt;
        $stmt = $pdobj->prepare($q);
        $stmt->execute(array(0,$last_id));
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $arr = array();
        foreach($row as $r){
            $r['content'] = htmlspecialchars($r['content'],ENT_QUOTES);
            $temp = shorturl($r['wxid']);
            $r['wxid'] = $temp[0];
            $arr[] = $r;
        }
        
        die(json_encode($arr));
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}