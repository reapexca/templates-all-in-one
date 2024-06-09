<?php 
require_once 'common.inc.php';
if(isset($_GET['logout'])){
	$CurrUser = NULL;
	setcookie('auth',null,time()-86400);
	header('location:/');
	exit;
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title><?php echo SITENAME;?></title>
        <link rel="stylesheet" href="static/main_style.css" />
        <!--[if lt IE 9]>
          <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>
    
    <body>
    <div id="bsaHolder">
        <div class="bsa_it_ad ad1 odd">
             <?php
            if($CurrUser){?>
            <img class="avatar" src="<?php echo $CurrUser['avatar'];?>" />
            <p>
                        您好：<span class="icon_<?php echo $CurrUser['platform']?>"><?php echo $CurrUser['username'];?></span>,[<a href="/list">我的文件</a>]<a href="?logout">退出</a>
            </p>
        <?php
        }else{
     ?>
                        <span>登录可以管理上传的文件哦～</span>
            		   <ul class="login">
            		   <li><a href="/connect/qq/" class="qq">腾讯微博登录</a>
            		   </li>
            		  <!--  <li><a href="/connect/baidu/" class="baidu">百度帐号登录</a>
            		   </li>
            		    <li><a href="/connect/sina/" class="sina">微博帐号登录</a>
            		   </li>-->
            		   </ul>
                       <?php }?>
        <div style="clear:both;"></div>

        </div>
     <a href="#1" id="bsa_closeAd" title="关闭"></a>
     </div>
		
	
		<div id="fav">
		 <p>
    <a href="http://www.xp-seo.com">玖翼BAE <em>图床系统</em></a> </p>

    <p>
        <a href="javascript:void(function(){var%20d%20=%20document,a%20=%20'setAttribute',s%20=%20d.createElement('script');s[a]('tyle','text/javascript');s[a]('src','http://<?php echo HOST;?>/static/js/bookmark.js');d.head.appendChild(s);})();" title="图床|TUCHUANG">图床|TUCHUANG</a>
          &lt;&mdash; 拖拽到收藏栏试试</p>
		</div>
		<div id="dropbox">
			<span class="message">Drop images here to upload. <br /><i>(they will only be visible to you)</i></span>
		</div>
        <footer>
            <h3>
                图床,您的图片存储库,基于百度云存储构建。<span>已成功托管 <?php echo number_format(counter_get('pic_total'));?> 张美图</span>,<a href="/chart/">统计</a>
            </h3>
	       
        </footer>
		<script src="http://code.jquery.com/jquery-1.6.3.min.js"></script>
		<script src="static/js/jquery.filedrop.js"></script>
		<script type="text/javascript">
$(document).ready(function(){
	$('#bsa_closeAd').click(function(){
		$('#bsaHolder').hide();
	});
});
		</script>
       
    
    </body>
</html>

