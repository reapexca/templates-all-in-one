<?php
require_once 'config.php';

$link = mysql_connect(HOST.':'.PORT,USER,PASSWORD);
if($link){
    mysql_select_db(DATABASE,$link);
    mysql_query("set names 'utf8'");


    mysql_query("CREATE TABLE IF NOT EXISTS `".CONFIG."` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
    echo mysql_errno();

    mysql_query("CREATE TABLE IF NOT EXISTS `".CONTENT."` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wxid` varchar(40) NOT NULL,
  `content` varchar(500) NOT NULL,
  `check` int(11) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
    echo mysql_errno();
    
    mysql_query("CREATE TABLE IF NOT EXISTS `".VOTE."` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
    echo mysql_errno();
    
    mysql_query("CREATE TABLE IF NOT EXISTS `".VOTE_USER."` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wxid` varchar(40) NOT NULL,
  `last_time` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
    echo mysql_errno();
    
    mysql_query("CREATE TABLE IF NOT EXISTS `".WX_USER."` (
  `id` int(11) NOT NULL,
  `wxid` varchar(250) NOT NULL,
  `msg` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8");
    echo mysql_errno();

    mysql_query("
    INSERT INTO `".CONFIG."` (`id`, `key`, `value`, `time`) VALUES
(1, 'site_name', '微信大屏幕', '2013-12-01 06:48:14'),
(2, 'wechat_name', '辽科大助手', '2013-12-01 06:48:14'),
(3, 'act_word', '#上墙#', '2013-12-01 06:48:14'),
(4, 'res_word', '感谢您的参与!', '2013-12-01 06:48:14'),
(5, 'ref_time', '3', '2013-12-01 06:48:14'),
(6, 'run', '1', '2013-12-01 06:48:14'),
(7, 'show_last', '1', '2013-12-01 06:48:14'),
(8, 'init_qrcode', '', '2013-12-01 06:48:14'),
(9, 'open_luck', '1', '2013-12-01 06:48:14'),
(10, 're_luck', '', '2013-12-01 06:48:14'),
(11, 'need_check', '', '2013-12-01 06:48:14'),
(12, 'items_color', '[\"rgba(93,181,11,.8)\",\"rgba(229,182,0,.8)\",\"rgba(239,112,39,.8)\",\"rgba(10,106,54,.8)\",\"rgba(0,175,215,.8)\"]', '2013-12-01 06:48:14'),
(13, 'vote_list', '王力宏|李云迪|林志颖|郭德纲|路人甲', '2013-12-01 06:48:14'),
(14, 'vote_word', '#投票#', '2013-12-01 06:48:14'),
(15, 'vote_time', '10', '2013-12-01 06:48:14'),
(16, 'open_vote', '1', '2013-12-01 06:48:14'),
(17, 'vote_pub', '', '2013-12-01 06:48:14'),
(18, 'vote_key', '#投票#+选手编号', '2013-12-01 06:48:14'),
(19, 'vote_name', '超级投票', '2013-12-01 06:48:14');");
    echo mysql_errno();
	
	mysql_query("
    INSERT INTO `".VOTE."` (`id`, `name`, `count`, `time`) VALUES
(1, '王力宏', 20, '2013-12-01 07:04:55'),
(2, '李云迪', 56, '2013-12-01 07:04:55'),
(3, '林志颖', 84, '2013-12-01 07:04:55'),
(4, '郭德纲', 2, '2013-12-01 07:04:55'),
(5, '路人甲', 4, '2013-12-01 07:04:55');");
    echo mysql_errno();
    
    echo "<br />看到全部为0即安装成功";
}else{
    die("链接数据库失败");
}