<?php
require_once 'common.inc.php';
?>
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css" media="screen">
        *{
            margin:0;padding:0;
            font-family:arial, sans-serif;
            color:#222;
        }
        html,body{
            height:100%;width:100%;
            background:#515151;
        }
        #drag{
            position: absolute;
            top:12%;left:12%;right:10%;bottom:8%;
            border:3px dashed #333;
            border-radius:2px;
            background:#515151;
        }
        #drag-text{
            position: absolute;
            top:50%;left:0;right:0;
            margin-top:-20px;
            height:40px;
            line-height:40px;
            text-align:center;
            font-size:20px;
            color:#999;
        }
        #drag-fileElement{
            position: absolute;
            display: block;
            top:0;left:0;bottom:0;right:0;
            opacity: 0;
            -moz-opacity: 0;
            filter:alpha(opacity=0);
        }
        #rs{
            position: absolute;
            top:10%;left:10%;right:10%;bottom:7%;
            border-radius:2px;
            background:#eee;
            box-shadow:0 0 3px #000;
            text-align:center;
            display: none;
        }
        .rs-btn{
            height:45px;
            position: absolute;
            bottom:0;left:0;right:0;
        }
        .rs-top{
            position: absolute;
            top:10px;bottom:55px;left:10px;right:10px;  
        }
                .rs-top-va-outer{
            text-align: center;
            width: 100%;
            height: 100%;
            display: table;
        }
        .rs-top-va-inner{
            display: table-cell;
            vertical-align: middle;
        }
        #rs-img{
            max-height:100%;
            max-width:100%;
                    border-radius:5px;
            background:#fff;
        }
        #rs-text{
            background-color: #eee;
            padding: 8px 3px;
            font-size: 16px;
            border: none;
            box-shadow:0 0 3px #333 inset;
            border-radius: 2px;
            text-align: center;
            width: 80%;
        }
        #rs-close{
            position: absolute;
            right:0px;top:0px;
            color:#444;
            width:20px;height:20px;line-height:20px;text-align:center;
            cursor: pointer;
        }
                .about{
            position: absolute;
            bottom:0;left:0;right:0;height:25px;
            line-height:25px;text-align:center;
                        font-size:10px;
                    color:#666;
        }
        
        #status{
            position: absolute;
            top:10px;left:10%;right:10%;
            border-radius:2px;
            background:#515151;
            font-size:12px;
            color:#fff;
        }
        #status span,#status .qq,#status .baidu,#status .sina{
            padding-left:16px;
            color:#fff;
        }
        #status span.icon_baidu,#status .baidu{
	        background:url('http://<?php echo HOST;?>/static/img/ico_baidu.gif') no-repeat scroll left center transparent;
        }
        #status span.icon_qq,#status .qq{
        	background:url('http://<?php echo HOST;?>/static/img/icon_t.png') no-repeat scroll left center transparent;
        }
        #status span.icon_sina,#status .sina{
	        background:url('http://<?php echo HOST;?>/static/img/icon_sina.png') no-repeat scroll left center transparent;
        }
        #status a{
            margin-right:5px;
            color:#fff;
        }
    </style>
</head>
<body>
<div id="status">
        <?php if($CurrUser):;?>
            Hi~<span class="icon_<?php echo $CurrUser['platform']?>"><?php echo $CurrUser['username'];?></span>,[<a href="http://<?php echo HOST;?>/list" target="_blank">我的图床</a>]<a href="http://<?php echo HOST;?>/home?logout">退出</a>
        <?php else:?>
        登录会更好~
            <a href="http://<?php echo HOST;?>/connect/qq/" target="_blank" class="qq" title="腾讯微博登录"></a>
            <a href="http://<?php echo HOST;?>/connect/baidu/" class="baidu" target="_blank" title="百度帐号登录"></a>
            <a href="http://<?php echo HOST;?>/connect/sina/" class="sina" target="_blank" title="微博帐号登录"></a>
        <?php endif;?>
    </div>
    <div id="drag">
    
        <div id="drag-text">
            拖拽图片到这里试试~
        </div>
        <input type="file" id="drag-fileElement" />
    </div>
    <div id="rs">
        <div class="rs-top">
                    <!--<div class="rs-top-va-outer">-->
                <!--<span class="rs-top-va-inner">-->
                    <img src="" id="rs-img"/>
                <!--</span>-->
            <!--</div>-->
        </div>              
        <div class="rs-btn"><input type="text" id="rs-text" readonly="readonly" onclick="this.select()" onmouseover="this.select()" onfocus="this.select()"/></div>
        <div id="rs-close">x</div>
    </div>
        <div class="about">
    </div>
    <script type="text/javascript"> 
    var drag = document.getElementById('drag'); 
    var dragT= document.getElementById('drag-text');    
    var dragF= document.getElementById('drag-fileElement'); 
    var rs   = document.getElementById('rs');   
    var rsT  = document.getElementById('rs-text');  
    var rsI  = document.getElementById('rs-img');
    var rsC = document.getElementById('rs-close');


    var t1 = '拖拽图片到这里来~';
    var t2 = '努力上传中~';

    var upLoadUrl  = 'http://<?php echo HOST;?>/upload';
    var upLoadFlag = true;
    
    var upLoad = function(file, text){
        var xhr = new XMLHttpRequest();
        var url = upLoadUrl;
        var data;
        //check
        if(upLoadFlag === false){
            alert('正在上传文件');
            return false;
        }
        if(!file && !text){
            alert('文件不存在,请重试');
            return false;
        }
        if(file && file.type.indexOf('image') === -1){
            alert('亲～只能上传图片格式');
            return false;
        }   
        if(text && !/^http/i.test(text)){
            alert('图片地址必须http打头');
            return false;
        }

        //upload
        data = new FormData();
        file && data.append('my_uploaded_file', file);
        text && data.append('my_uploaded_url', text);
        xhr.open("POST", url);
        xhr.onreadystatechange = function(){
            var rsText;         
            if(xhr.readyState == 4 && xhr.status == 200){   
                upLoadFlag = true;      
                dragT.innerHTML = t1;   
                
                var obj =eval('('+xhr.responseText+')'); 
                if(obj.code==0){
                    rsText = xhr.responseText;
                    rs.style.display = 'block';
                    rsI.src = rsT.value = obj.data;     
                }
                else
                {
                    alert(obj.message);
                }
                // rsText = eval(xhr.responseText);
                // rs.style.display = 'block';
                // rsI.src = rsT.value = rsText;               
            }
        }
        xhr.send(data);
        upLoadFlag = false;
        dragT.innerHTML = t2;
    }
    var dropHandler = function(e){
        var file,text;
        e.preventDefault();
        text = e.dataTransfer.getData && e.dataTransfer.getData('text/html');
        text = text.match(/src\=\"(http.*?)\"/i);
        text = text && text[1];
        file = e.dataTransfer.files && e.dataTransfer.files[0];
        upLoad(file, text);
    }
    var inputFileHandler = function(){
        var file = dragF.files[0];
        upLoad(file);   
    }
    var popCloseHandler = function(){
        rs.style.display = 'none';
        rsT.value = rsI.src = '';
    }
    
    //event
    document.body.addEventListener('dragenter', function(e) {
    　e.preventDefault();
    }, false);
    document.body.addEventListener('dragleave', function(e) {
    　e.preventDefault();
    }, false);
    document.body.addEventListener('dragover', function(e) {
    　e.preventDefault();
    }, false);
    document.body.addEventListener('drop', function(e) {
    　dropHandler(e);
    }, false);
    dragF.addEventListener('change', function() {
        inputFileHandler();
    }, false);
    rsC.addEventListener('click', function() {
        popCloseHandler();
    }, false);
    </script>
</body>
</html>