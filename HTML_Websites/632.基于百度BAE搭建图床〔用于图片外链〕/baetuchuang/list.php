<?php
include 'common.inc.php';
if(!$CurrUser){
    header('location:/');
    exit;
}

$page = max(1,intval($_GET['page']));
$pagesize = 60;
$userid = $CurrUser['userid'];
$platform = $CurrUser['platform'];

$sql="select count(0) as total from  filestore nolock where userid = '".$userid."' and platform='".$platform."' ";
$query = $mysql->query($sql);
$row = $query->fetch_object();
$totalcount = $row->total;

$sql="select * from  filestore nolock where userid = '".$userid."' and platform='".$platform."' order by id desc limit ".($page-1)*$pagesize." ,".$pagesize;

require_once "BaeLog.class.php";
$logger=BaeLog::getInstance();
$logger ->logNotice($sql);

$pagesize = ceil($totalcount/$pagesize);
$query = $mysql->query($sql);
$rows = array();
while ($obj = $query->fetch_object()) {
    $rows[] = $obj;
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title><?php echo SITENAME;?></title>
        
        <!-- Our CSS stylesheet file -->
        <link rel="stylesheet" href="/static/main_style.css" />
        <link rel="stylesheet" href="/static/style.css" />
        <!--[if lt IE 9]>
          <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        <script src="http://code.jquery.com/jquery-1.6.3.min.js"></script>
        <script type="text/javascript" src="/static/js/jquery.lazyload.js"></script>
        <script type="text/javascript">
        $(function(){
            $( 'div.picthumb img' ).imglazyload();
        });

        $(document).ready(function($) {

            $('#bsaHolder').css('position','fixed');
            $('#bsa_closeAd').click(function(){
                $('#bsaHolder').hide();
            });
            $('#uploadlink').click(function(){
                var id = "pass_script_cross";
                //if(document.getElementById(id)) return;
                var element = document.createElement("script");
                element.setAttribute("type", "text/javascript");
                element.setAttribute('charset','utf-8');
                element.setAttribute("id", id);
                element.setAttribute("src",'http://<?php echo HOST;?>/static/js/bookmark.js');
                document.body.appendChild(element);
            });
            $('div.album li').hover(function(){
                $(this).find('a.delete').toggle();
            });
            $('a.delete').click(function(){
                var parent = $(this).parent();
                if(confirm('确定要删除么?')){
                    var url='/delete/?fid='+$(this).attr('rel');
                    $.getJSON(url,function(data){
                        
                        if(data.code==0){
                            
                            parent.fadeOut(1000);
                        }
                        else
                            $('#notice').html(data.msg).show();
                            
                    });
                }
            });
        });
    </script>
        
    </head>
    
    <body>
    <div id="bsaHolder">
        <div class="bsa_it_ad ad1 odd">
            
            <img class="avatar" src="<?php echo $CurrUser['avatar'];?>" />
            <p>
                        您好：<span class="icon_<?php echo $CurrUser['platform']?>"><?php echo $CurrUser['username'];?></span>,[<a href="/">首页</a>]<a href="/home?logout">退出</a>
            </p>
       
        <div style="clear:both;"></div>

        </div>
     <a href="#1" id="bsa_closeAd" title="关闭"></a>
     </div>
		
	
		
		
		    <div id="body">
		    <div style="clear:both">
<?php if($pagesize>1):;?>
<ul class="pager">
<?php for($i = 1;$i<=$pagesize;$i++):;?>
<li>
    <?php if($i==$page):;?>
        <span><?php echo $i;?></span>
    <?php else:?>
        <a href="/list/?page=<?php echo $i;?>"><?php echo $i;?></a>
    <?php endif;?>
</li>
<?php endfor;?>
</ul>
<?php endif;?>
</div>


    <div class="album">
        <?php if($rows):;?>
        <ul>
        <?php foreach($rows as $row):;?>
            <li>
                <a class="delete" rel="<?php echo $row->id;?>">x</a>
                <div  class="picthumb"><img src="/static/img/placeholder.png" lazy-src="http://bcs.duapp.com/<?php echo BUCKET;?>/<?php echo $row->filename;?>"/></div>
                <span class="filesize">size:<?php echo setupSize($row->filesize);?> @ <?php echo date('Y-m-d H:i',$row->created);?></span>
                <input type="text" onclick="this.select()" onmouseover="this.select()" onfocus="this.select()" readonly="readonly" class="picurl" value="http://bcs.duapp.com/<?php echo BUCKET;?>/<?php echo $row->filename;?>" />
            </li>
        <?php endforeach;?>
        </ul>
        <?php else:?>
        哇！你居然一张图片都没有上传过，<a href="#1" id="uploadlink">马上传一张试试</a>~~~~
        <?php endif;?>
    </div>
<div style="clear:both">
<?php if($pagesize>1):;?>
<ul class="pager">
<?php for($i = 1;$i<=$pagesize;$i++):;?>
<li>
    <?php if($i==$page):;?>
        <span><?php echo $i;?></span>
    <?php else:?>
        <a href="/list/?page=<?php echo $i;?>"><?php echo $i;?></a>
    <?php endif;?>
</li>
<?php endfor;?>
</ul>
<?php endif;?>
</div>
</div>    
    </body>
</html>
<?php 
unset($rows);
?>
