<?php
require_once '../config.php';
$id = $_POST['clear_data'];
if($id != 'clear') die('Id错误!');
try{
    $pdobj = getpdobj();
    if($pdobj){
        $q = 'truncate table `'.CONTENT.'`';
        $stmt = $pdobj->prepare($q);
        $stmt->execute();
        header('location:index.php');
        die('0');
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}