<?php
require_once '../config.php';
$sid = getsid('adm_wxq');
if(!checkadmin($sid)){
    header('location:login.php');
    exit;
}
$configs = get_configs();

$pdobj = getpdobj();
if($pdobj) try{
    $nRows = (int)$pdobj->query('select count(*) from '.CONTENT)->fetchColumn();
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
<script type="text/javascript" src="../js/jq.js"></script>
<title><?php echo $configs['site_name']; ?>-后台</title>
<style type="text/css">
body { background: #f6f6f6; }

.main {
  max-width: 750px;
  width: 90%;
  padding: 10px;
  margin: auto;
}

.fd {
  width:90%;
  max-width: 650px;
  padding: 30px;
  margin: 12px auto;
  border: 1px #ddd solid;
  background: #fff;
  word-wrap: break-word;
word-break: break-all;
  -moz-box-shadow: 1px 1px 1px #ccc;
  -webkit-box-shadow: 1px 1px 1px #ccc;
  box-shadow: 1px 1px 1px #ccc;
  webkit-border-radius: 2px;
    -moz-border-radius: 2px;
         border-radius: 2px;
}

label{
  margin: 10px 0;
}

textarea {
  width: 80%;
}
</style>
<script type="text/javascript">
vote_list_str = '<?php echo $configs['vote_list']; ?>';
$(document).ready(function(){
   $("#re_color").click(function(){
       $("textarea[name=items_color]").val('["rgba(93,181,11,.8)","rgba(229,182,0,.8)","rgba(239,112,39,.8)","rgba(10,106,54,.8)","rgba(0,175,215,.8)"]');
       return false;
   });

   $("#config_form").submit(function(){
       if($("textarea[name=vote_list]").val() != vote_list_str){
           if(confirm('你更改了投票项列表，继续将清空所有投票数据！')){
               $("input[name=change_vote_list]").val('1');
               return true;
           }else return false;
       }
       return true;
   });

});
</script>
</head>
<body>
<div class="main" style="text-align:center;">
<div style="padding: 2px 30px;text-align: right;border: 1px #e7e7e7 solid;background: #f5f5f5;">
<span>您好！<?php echo SUSER; ?> | </span>
<a href="login.php">注销</a>
</div>
<h2 style="text-align:center">微信上墙后台管理</h2>
</div>
<div class="main">
<fieldset class="fd">
<legend>管理:</legend>
</p><a target="_blank" href="check.php">审核上墙内容>></a></p>
</p><a target="_blank" href="change_vote_data.php"> 更改投票数据>></a></p>
<form action="clear.php" method="post">
<input type="hidden" name="clear_data" value="clear" />
<button class="btn" onclick="return confirm('确实要清除所有上墙数据？');">清空上墙数据(<?php echo $nRows; ?>)条</button>
</form>
<form action="clear_vote.php" method="post">
<input type="hidden" name="clear_data" value="clear" />
<br />
<button class="btn" onclick="return confirm('重置投票数据？不会删除候选人列表');">重置投票数据</button>
</form>
<p>将添加更多……</p>
</fieldset>

<form id="config_form" action="set.php" method="post">
<fieldset class="fd">
<legend>投票:</legend>
<label>投票活动名:<br /><input type="text" name="vote_name" value="<?php echo $configs['vote_name']; ?>" placeholder="……" maxlength="15" /></label>
<label>参与方式:<br /><input type="text" name="vote_key" value="<?php echo $configs['vote_key']; ?>" placeholder="如:#投票#+选手编号" maxlength="15" /></label>

<label>投票关键字:<br /><input type="text" name="vote_word" value="<?php echo $configs['vote_word']; ?>" placeholder="如:#投票#" maxlength="15" /></label>
<input type="hidden" name="change_vote_list" value="" />
<label>投票项列表,用 | 分隔:<br /><textarea name="vote_list" placeholder="A|B|C" maxlength="400"><?php echo $configs['vote_list']; ?></textarea></label>
<label>允许重复投票间隔(秒) 为0则不限制。:<br /><input type="text" name="vote_time" value="<?php echo $configs['vote_time']; ?>" placeholder="为0则不限制" maxlength="10" /></label>
<label><input type="checkbox" name="open_vote"<?php if((int)trim($configs['open_vote'])) echo ' checked="checked"'; ?> value="1" /> 开启用户投票</label>
<label><input type="checkbox" name="vote_pub"<?php if((int)trim($configs['vote_pub'])) echo ' checked="checked"'; ?> value="1" /> 投票内容也上墙</label>
<label><input type="checkbox" name="vote_auto_zoom"<?php if((int)trim($configs['vote_auto_zoom'])) echo ' checked="checked"'; ?> value="1" /> 柱状图自动增高(更易直观分辨相近条目)</label>

<button class="btn">保存</button>
<p>将添加更多……</p>
</fieldset>

<fieldset class="fd">
<legend>抽奖:</legend>
<label><input type="checkbox" name="open_luck"<?php if((int)trim($configs['open_luck'])) echo ' checked="checked"'; ?> value="1" /> 开启抽奖功能(若关闭，微信回复不显示抽奖代码)</label>
<label><input type="checkbox" name="re_luck"<?php if((int)trim($configs['re_luck'])) echo ' checked="checked"'; ?> value="1" /> 已抽到的人（中奖列表中）可再次参加抽奖</label>
<button class="btn">保存</button>
<p>将添加更多……</p>
</fieldset>

<fieldset class="fd">
<legend>显示:</legend>
<label>应用名称:<br /><input type="text" name="site_name" value="<?php echo $configs['site_name']; ?>" placeholder="如:我的微信墙" required="true" maxlength="15" /></label>
<label>微信名称:<br /><input type="text" name="wechat_name" value="<?php echo $configs['wechat_name']; ?>" placeholder="如:辽科大助手" required="true" maxlength="15" /></label>
<label><br />随机颜色列表:<br />
每条上墙信息随机颜色(css)列表数组，json格式，如果不清楚，<strong>请不要随意修改</strong>。<br />
<a id="re_color" href="#">恢复默认</a><br />
<textarea name="items_color" placeholder="json格式" required="true" maxlength="400"><?php echo json_encode($configs['items_color']); ?></textarea></label>

<button class="btn">保存</button>

<p>将添加更多……</p>
</fieldset>

<fieldset class="fd">
<legend>行为:</legend>
<label>上墙关键字:<br /><input type="text" name="act_word" value="<?php echo $configs['act_word']; ?>" placeholder="如:#祝福#" required="true" maxlength="15" /></label>
<label>微信回复语:<br /><textarea name="res_word" placeholder="如:感谢您的参与!" required="true" maxlength="400"><?php echo $configs['res_word']; ?></textarea></label>
<label>定时刷新间隔(秒):<br /><input type="text" name="ref_time" value="<?php echo (int)$configs['ref_time']; ?>" placeholder="单位:秒" required="true" maxlength="15" /></label>
<label><input type="checkbox" name="run"<?php if((int)trim($configs['run'])) echo ' checked="checked"'; ?> value="1" /> 进入页面即自动刷新</label>
<label><input type="checkbox"<?php if((int)trim($configs['init_qrcode'])) echo ' checked="checked"'; ?> name="init_qrcode" value="1" /> 进入页面显示二维码</label>
<label><input type="checkbox" name="show_last"<?php if((int)trim($configs['show_last'])) echo ' checked="checked"'; ?> value="1" /> 进入页面显示以前的内容（最多20条）</label>
<label><input type="checkbox" name="need_check"<?php if((int)trim($configs['need_check'])) echo ' checked="checked"'; ?> value="1" /> 开启审核，上墙的内容需要通过后台审核才能显示</label>
<button class="btn">保存</button>
<p>将添加更多……</p>
</fieldset>

</form>
</div>
</body>
</html>