<?php
require('../config.php');
writesid('','adm_wxq');
$user = trim($_POST['uid']);
$password = trim($_POST['pass']);
$sid = md5($user.' <>'.$password);

  if($user && $password){
    if(checkadmin($sid)){
      writesid($sid,'adm_wxq');
      header('location:index.php');
    }else{
      $result = '<b style="color: red;">登录失败！</b><br />请检查您的密码帐号';
      $i = false;
    }
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
<style type="text/css">

body { background: #f6f6f6; }

.main {
  max-width: 750px;
  width: 90%;
  padding: 10px;
  margin: auto;
}

.nav_ul {
  width: 100%;
  margin: 10px auto;
  max-width: 750px;
  padding: 10px;
  background: #eee;
}

.nav_ul li a{
  padding: 10px 30px;
  font-size:18px;
}

.nav_ul li a:hover {
  background: #ccc;
}

.login {
  width:90%;
  max-width: 320px;
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


.nav_ul {
  margin: 10px auto;
  max-width: 750px;
  padding: 0 10px;
  background: #eee;
  border-bottom: 2px #ccc solid;
}

.nav_ul li a{
  padding: 10px 30px;
  font-size:18px;
  margin: 0 3px;
  margin-top: 5px;
}

.nav_ul li a:hover, .select {
  background: #ccc;
}


form {
  display: block;
  width: 90%;
}

label {
  margin-right: 10px;
}
</style>

<title>微信大屏幕-洋子</title>
<script type="text/javascript">
$(document).ready(function(){

});
</script>
</head>
<body>
<div class="main" style="text-align:center;">
<h2 style="text-align:center">微信大屏幕后台-洋子</h2>
</div>
<div class="main">

<fieldset class="login">
<legend>登录</legend>
<form action="login.php" method="post">
<div><?php echo $result; ?></div><br />
<label>用户名:<br /><input type="text" name="uid" maxlength="30" required="true" /></label>
<label>密码:<br /><input type="password" name="pass" required="true" /></label>
<button class="btn">登录</button>
</form>
</fieldset>

</div>
</body>
</html>