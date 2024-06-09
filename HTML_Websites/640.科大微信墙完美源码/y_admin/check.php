<?php
require_once '../config.php';
$sid = getsid('adm_wxq');
if(!checkadmin($sid)){
    header('location:login.php');
    exit;
}

$configs = get_configs();

$color_str = 'new Array(';
foreach($configs['items_color'] as $r){
    $color_str .= '"'.$r.'",';
}
$color_str = rtrim($color_str, ",").');';

$last_id = 0;

if(!$configs['show_last']) try{
    $pdobj = getpdobj();
    if($pdobj){
        $last_id = (int)$pdobj->query('select max(id) from `'.CONTENT.'`')->fetchColumn();
    }else{
        die('-02');
    }
}catch(PDOException $e){
    die('-1');
}
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width" />
<meta name="viewport" content=" initial-scale=1.0,user-scalabel=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
<link rel="stylesheet" href="../css/m.css" type="text/css" media="screen" />
<link rel="stylesheet" href="../css/n.css" type="text/css" media="screen" />
<script type="text/javascript" src="../js/jq.js"></script>
<script type="text/javascript" src="js/m.js"></script>
<title><?php echo $configs['site_name']; ?>-审核</title>
<script type="text/javascript">
ref_time = <?php echo $configs['ref_time']; ?>;//刷新时间
run = <?php echo (int)$configs['run']; ?>;//是否进入就播放
init_qrcode = <?php echo (int)$configs['init_qrcode']; ?>;//是否进入显示二维码
lid = <?php echo $last_id; ?>;//起始id
colors = <?php echo $color_str; ?>//颜色

site_name = "<?php echo $configs['site_name']; ?>";
wechat_name = "<?php echo $configs['wechat_name']; ?>";
act_word = "<?php echo $configs['act_word']; ?>";
re_luck = "<?php echo $configs['re_luck']; ?>";
</script>
<style type="text/css">
.check, .del{
  margin: 0 10px;
  cursor: pointer;
}
</style>
</head>
<body>
<div class="main">
<!-- 头部 -->
<div class="head">
<div id="head_left">
<div class="head_info">
<h1>微信上墙审核</h1>
</div>
<div class="head_flag"></div>
</div>

<div class="head_right">
<img alt="bababa" src="../img/bullhorn.png" />
<h2>添加</h2><h1><?php echo $configs['wechat_name']; ?></h1><h3>发送<span><?php echo $configs['act_word']; ?> 你想说的话</span>即可上墙</h3>
</div>
<div class="clear"></div>
</div>
<!-- 内容区 -->
<div class="contents">
<ul id="items">

</ul>
</div>

</div>
<!-- 底部控制 -->
<div id="control">
<div class="ctrl_button" title="显示/隐藏" id="ctrl_hide"><img alt="qrcode" src="../img/arrow-left.png" /></div>

<div class="ctrl_button" title="二维码" id="ctrl_qrcode"><img alt="qrcode" src="../img/qrcode-ico.png" /></div>
<div class="ctrl_button" title="开始/暂停" id="ctrl_run"><img alt="run" src="../img/play.png" /></div>
<div class="ctrl_button" title="手动更新" id="ctrl_ref"><img alt="ref" src="../img/spinner.png" /></div>
<!-- div class="ctrl_button" title="抽奖" id="ctrl_luck"><img alt="luck" src="../img/spinner2.png" /></div!-->
<em class="load_text right">载入中……</em>
</div>
<!-- 抽奖层 -->
<div id="luck">
<div>
<img class="close_luck right" title="关闭" alt="close" src="../img/close.png" />
<div class="goodluck">
<h1>幸运抽奖</h1>
<ul id="luck_now">
</ul>
<button class="btn_ex" id="luck_start">开始</button><button class="btn_ex" id="luck_com">确认</button>
<ul id="luck_result">
</ul>
<button class="btn_ex" id="luck_clear">清空结果</button><b id="luck_count" class="right"></b>
</div>
</div>
</div>
<!-- 二维码图片 -->
<div id="qrcode">
<div>
<img class="close_qrcode right" title="关闭" alt="close" src="../img/close.png" />
<img class="qrcode_big" alt="qrcode" src="../img/qrcode.jpg" />
</div>
</div>
<!-- 背景图  -->
<img class="bg" src="../img/bg.jpg" alt="bg" />

</body>
</html>