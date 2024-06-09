<?php
#下面是插件功能入口在的文件
include 'work/common/common.php';
include 'work/system.php';
include 'plugin/wechat_screen.php';


#各个功能间的调用顺序一定要分清楚
function Work($wx){
    SysRegister($wx);#注册用户
    //Subscribe($wx);#关注消息
    //echo microtime(true)-$GLOBALS['start_time'], "<br />";
    /*************工作插件区***************/
    
    //echo microtime(true)-$GLOBALS['start_time'], "<br />";
    screen_init($wx);
    //echo microtime(true)-$GLOBALS['start_time'], "<br />";
    //if($wx->is_processed == 0) exit;
    
    
    
    /************************************/
  //ExitMenu($wx);
  SysWriteMenuId($wx);
}
