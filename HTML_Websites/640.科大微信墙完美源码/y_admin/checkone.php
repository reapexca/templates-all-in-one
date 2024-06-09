<?php
require_once '../config.php';
$id = (int)$_GET['id'];
if(!$id) die('Id错误!');
try{
    $pdobj = getpdobj();
    if($pdobj){
        $max_id = (int)$pdobj->query('select max(id) from `'.CONTENT.'`')->fetchColumn();
        
        $q = 'update `'.CONTENT.'` set `check` = \'1\', `id` = ? where `id` = ?';
        $stmt = $pdobj->prepare($q);
        $stmt->execute(array($max_id + 1, $id));
        
        die('0');
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}