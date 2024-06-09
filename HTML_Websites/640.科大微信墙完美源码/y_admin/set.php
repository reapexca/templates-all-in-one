<?php
require_once '../config.php';
$sid = getsid('adm_wxq');
if(!checkadmin($sid)){
    header('location:login.php');
    exit;
}
$configs = get_configs();

$site_name = trim($_POST['site_name']);
$wechat_name = trim($_POST['wechat_name']);
$act_word = trim($_POST['act_word']);
$res_word = trim($_POST['res_word']);
$ref_time = (int)trim($_POST['ref_time']);
$run = trim($_POST['run']);
$init_qrcode = trim($_POST['init_qrcode']);
$show_last = trim($_POST['show_last']);
$open_luck = trim($_POST['open_luck']);
$re_luck = trim($_POST['re_luck']);
$items_color = trim($_POST['items_color']);
$need_check = trim($_POST['need_check']);
$vote_word = trim($_POST['vote_word']);
$vote_list = trim($_POST['vote_list']);
$vote_time = (int)trim($_POST['vote_time']);
$open_vote = trim($_POST['open_vote']);
$vote_pub = trim($_POST['vote_pub']);
$vote_name = trim($_POST['vote_name']);
$vote_key = trim($_POST['vote_key']);
$vote_auto_zoom = trim($_POST['vote_auto_zoom']);

try{
    $pdobj = getpdobj();
    if($pdobj){
        $pdobj->query('delete from `'.CONFIG.'` where 1');
        
        $q = 'insert into `'.CONFIG.'` set `key` = ?, `value` = ?';
        $stmt = $pdobj->prepare($q);
        
        $stmt->execute(array('site_name', $site_name));
        $stmt->execute(array('wechat_name', $wechat_name));
        $stmt->execute(array('act_word', $act_word));
        $stmt->execute(array('res_word', $res_word));
        $stmt->execute(array('ref_time', $ref_time));
        $stmt->execute(array('run', $run));
        $stmt->execute(array('show_last', $show_last));
        $stmt->execute(array('init_qrcode', $init_qrcode));
        $stmt->execute(array('open_luck', $open_luck));
        $stmt->execute(array('re_luck', $re_luck));
        $stmt->execute(array('need_check', $need_check));
        $stmt->execute(array('items_color', $items_color));
        $stmt->execute(array('vote_list', $vote_list));
        $stmt->execute(array('vote_word', $vote_word));
        $stmt->execute(array('vote_time', $vote_time));
        $stmt->execute(array('open_vote', $open_vote));
        $stmt->execute(array('vote_pub', $vote_pub));
        $stmt->execute(array('vote_key', $vote_key));
        $stmt->execute(array('vote_name', $vote_name));
        $stmt->execute(array('vote_auto_zoom', $vote_auto_zoom));
        header('location:index.php');
        
        if($vote_list && trim($_POST['change_vote_list'])){
            $vote_list_arr = explode("|", $vote_list);
            $pdobj->query('truncate table `'.VOTE.'`');
			$pdobj->query('truncate table `'.VOTE_USER.'`');
            $q = 'insert into `'.VOTE.'` set `name` = ?';
            $stmt = $pdobj->prepare($q);
            
            foreach($vote_list_arr as $vote_name){

                $stmt->execute(array($vote_name));
            }
        }
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}
