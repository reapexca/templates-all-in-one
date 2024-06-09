<?php
/********************************
* 微信公众平台 消息处理
* BY:洋子
* wyzyok@qq.com
* 2013-4-4
********************************/

/*注册用户，以实现多级菜单功能*/
function SysRegister($wx){
  $username = $wx->GetUserName();
  $row = GetRecord(WX_USER,'wxid',$username);
  if(!$row){
    $link = mysql_connect(HOST.':'.PORT,USER,PASSWORD);
    if($link){
      mysql_select_db(DATABASE,$link);
      @$max_id=mysql_fetch_array(mysql_query("select max(id) from ".WX_USER));
      $id=$max_id[0]+1;
      $query='INSERT INTO '.WX_USER.' VALUES("'.$id.'","'.$username.'",0,'.time().')';
        @mysql_query("set names 'utf8'");
      @mysql_query($query);
      $wx->menu_id = 0;
    }
  }else{
    /*五分钟自动超时*/
    if((time()-$row['time']) > 300){
        @mysql_query("set names 'utf8'");
      mysql_query('UPDATE '.WX_USER.' SET msg=0,time="'.time().'" WHERE wxid="'.$username.'"');
      $wx->menu_id = 0;
    }else{
      $wx->menu_id = $row['msg'];
    }
  }
}

/*写入多级菜单状态*/
function SysWriteMenuId($wx){
  $link = mysql_connect(HOST.':'.PORT,USER,PASSWORD);
  if($link){
    mysql_select_db(DATABASE,$link);
      @mysql_query("set names 'utf8'");
    mysql_query('UPDATE '.WX_USER.' SET msg="'.$wx->menu_id.'",time="'.time().'" WHERE wxid="'.$wx->GetUserName().'"');
    
    @mysql_close($link);
  }
}


/*退出菜单,其他插件调用此函数，参数e需不为0*/
function ExitMenu($wx,$e = 0){
  if($wx->menu_id != 0){
    if($wx->GetTextContent() == '退出' || $e != 0){
      $username = $wx->GetUserName();
      $wx->SetMsgType('text');
      if(GetRecord(USTL_USER,'wxid',$username)){
        $content = ★."已回到正常模式".★;
      }else{
        $content = ★."已回到正常模式".★;
      }
      $wx->SetTextContent($content);
      $wx->menu_id = 0;
      $wx->is_processed++;
    }
  }
}



?>