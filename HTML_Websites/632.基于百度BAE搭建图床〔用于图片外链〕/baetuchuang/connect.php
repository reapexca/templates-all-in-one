<?php
//连接
require_once 'common.inc.php';
$plat = trim($_GET['plat']);
require_once 'libs/OAuth.php';
$OAuth = new OAuth2($_GET['plat']);
$OAuth->setCallback('http://'.HOST.'/login_callback.php?plat='.$plat);
header('location:'.$OAuth->getLoginUrl());
exit;
?>