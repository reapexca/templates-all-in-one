<?php
require("hm.php");
$_hmt = new _HMT("01eee509ee2f68dc6014898c309e86bf");
$_hmtPixel = $_hmt->trackPageView();

if(!file_exists(dirname(__FILE__).'/data/common.inc.php'))
{
header('Location:install/index.php');
exit();
}
require_once (dirname(__FILE__) . "/include/common.inc.php");
require_once DEDEINC."/arc.partview.class.php";
$GLOBALS['_arclistEnv'] = 'index';
$row = $dsql->GetOne("Select * From `#@__homepageset`");
$row['templet'] = MfTemplet($row['templet']);
$pv = new PartView();
$pv->SetTemplet($cfg_basedir . $cfg_templets_dir . "/" . $row['templet']);
$pv->Display();
?>