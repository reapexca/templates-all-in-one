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
    $q = 'select * from `'.VOTE.'` order by `id`';
    $stmt = $pdobj->prepare($q);
    $stmt->execute();
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $html = '';
    foreach($row as $r){
        $html .= '<label>'.$r['id'].': '.$r['name'].'<br /><input type="text" name="vote_'.$r['id'].'" value="'.$r['count'].'" placeholder="整数" required="true" maxlength="9" /></label>';
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
<script type="text/javascript" src="../js/jq.js"></script>
<title><?php echo $configs['site_name']; ?>-修改投票数据</title>
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

});
</script>
</head>
<body>
<div class="main" style="text-align:center;">
<div style="padding: 2px 30px;text-align: right;border: 1px #e7e7e7 solid;background: #f5f5f5;">
<span>您好！<?php echo SUSER; ?> | </span>
<a href="login.php">注销</a>
</div>
<h2 style="text-align:center">微信上墙后台管理-更改投票数据</h2>
</div>
<div class="main">

<form id="vote_form" action="change_vote_date_c.php" method="post">
<fieldset class="fd">
<legend>投票数据:</legend>
<?php echo $html; ?>

<button class="btn">保存</button>

</fieldset>

</form>
</div>
</body>
</html>