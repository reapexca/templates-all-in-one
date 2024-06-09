<?php
require_once '../config.php';
$id = (int)$_GET['id'];
if(!$id) die('Id错误!');
try{
    $pdobj = getpdobj();
    if($pdobj){
        $q = 'delete from `'.CONTENT.'` where `id` = ?';
        $stmt = $pdobj->prepare($q);
        $stmt->execute(array($id));
        
        die('0');
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}