<?php
require_once '../config.php';
$sid = getsid('adm_wxq');
if(!checkadmin($sid)){
    header('location:login.php');
    exit;
}

try{
    $pdobj = getpdobj();
    if($pdobj){
        
        $q = 'update `'.VOTE.'` set `count` = ? where `id` = ?';
        $stmt = $pdobj->prepare($q);
        
        foreach($_POST as $key => $r){
            $id = (int)str_replace('vote_','',$key);
            $r = (int)$r;
            $stmt->execute(array($r, $id));
        }
        
        header('location:change_vote_data.php');
        
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}
