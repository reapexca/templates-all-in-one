<?php
require_once 'config.php';
$act = (int)$_GET['act'];
$ord = '`id`';

if($act == 1) $ord = '`count` desc';

$configs = get_configs();
try{
    $pdobj = getpdobj();
    if($pdobj){
        $q = 'select * from `'.VOTE.'` order by '.$ord.'';
        $stmt = $pdobj->prepare($q);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $q = 'select SUM(count) from `'.VOTE.'`';
        $stmt = $pdobj->prepare($q);
        $stmt->execute();
        $vote_count = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $q = 'select max(count) from `'.VOTE.'`';
        $stmt = $pdobj->prepare($q);
        $stmt->execute();
        $max_count = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        //var_dump($vote_count);
        
        $arr = array();
        $arr['count'] = $vote_count[0]['SUM(count)'];
        $arr['max_count'] = $max_count[0]['max(count)'];
        $arr['list'] = $row;
        
        
        die(json_encode($arr));
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}