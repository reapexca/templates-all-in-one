<?php
function screen_init($wx){
    $configs = get_configs();
  if($wx->GetMsgType() == 'text' || $_GET['debug']){
    if($wx->is_processed == 0 && $wx->menu_id == 0){
      $keyword = $wx->GetTextContent();
      $username = $wx->GetUserName();
      
      $check = 1;
      if($configs['need_check']) $check = 0;
      
      if(stripos($keyword, $configs['act_word']) !== FALSE){
         _screen($keyword, $username, $check);
        $wx->SetMsgType('text');
        $str = $configs['res_word'];
        if($configs['open_luck']){
            $temp = shorturl($username);
            $str .= "\n\n您的抽奖Id为:\n【".$temp[0].'】';
        }
        $wx->SetTextContent($str);
        $wx->is_processed++;
      }elseif(stripos($keyword, $configs['vote_word']) !== FALSE && $configs['open_vote']){
           preg_match_all("/[0-9]+/",$keyword,$b);
           if($configs['vote_pub']) _screen($keyword, $username, $check);
           $str = $configs['res_word'];
           $wx->SetMsgType('text');
           
           $vote_limit_time = $configs['vote_time'];
           $rtn = _screen_vote($b[0][0], $username, $vote_limit_time);
           if($rtn == 1) $str .= "\n\n投票成功!";
           elseif($rtn == -1) $str = "\n\n投票失败!\n你已经投过票了,请稍候再投";
           else $str = "\n\n投票失败!\n请检查投票编号";
           $wx->SetTextContent($str);
           $wx->is_processed++;
       }
    }
  }
}

function _screen($keyword, $wxid, $check){
    $con = $keyword;
    
    if($con) try{
        $pdobj = getpdobj();
        if($pdobj){
            $q = 'insert into `'.CONTENT.'` set `wxid` = ?, `check` = ?, `content` = ?';
            $stmt = $pdobj->prepare($q);
            $stmt->execute(array($wxid, $check, $con));
        }else{
            die('-02');
        }
    }catch(PDOException $e){
        die('-1');
    }
}

function _screen_vote($voit_id, $wxid, $vote_limit_time){
    $con = (int)$voit_id;
    
    
    if($con) try{
        $pdobj = getpdobj();
        if($pdobj){
            $q = 'select * from `'.VOTE_USER.'` where `wxid` = ?';
            $stmt = $pdobj->prepare($q);
            $stmt->execute(array($wxid));
            $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            if($row[0]['last_time'] <= time() - $vote_limit_time) {
                $q = 'update `'.VOTE.'` set `count` = `count` + 1 where `id` = ?';
                $stmt = $pdobj->prepare($q);
                $stmt->execute(array($con));
                
                if($stmt->rowCount()){
                    $q = 'delete from `'.VOTE_USER.'` where `wxid` = ?';
                    $stmt = $pdobj->prepare($q);
                    $stmt->execute(array($wxid));
                    
                    $q = 'insert into `'.VOTE_USER.'` set `wxid` = ?, `last_time` = ?';
                    $stmt = $pdobj->prepare($q);
                    $stmt->execute(array($wxid, time()));
                
                    return 1;
                    
                }else return 0;
            }else return -1;
            
        }else{
            die('-02');
        }
    }catch(PDOException $e){
        die('-1');
    }
}