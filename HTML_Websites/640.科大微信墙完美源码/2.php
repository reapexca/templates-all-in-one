<?php
function getScore($num , $pwd){
	$url = "http://202.118.40.5/jwc/sjcx/cjcx/login.asp";
	$postdata = "xuehao=$num&mima=$pwd";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$content = curl_exec($ch);
	curl_close($ch);
	list($header, $body) = explode("\r\n\r\n", $content);
	preg_match("/set\-cookie:([^\r\n]*)/i", $header, $matches);
	// curl_setopt($ch, CURLOPT_COOKIE, $cookie);
	$cookie = $matches[1];

	//echo $header;
	$url = "http://202.118.40.5/jwc/sjcx/cjcx/SEARCH.ASP?XUEHAO=$num";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_COOKIE, $cookie);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$content = curl_exec($ch);

	$content = iconv('GB2312', 'UTF-8', $content);
    $content = str_replace("思想道德修养与法律基础","思修",$content );
      $content = str_replace("马克思主义基本原理","马列",$content );
     $content = str_replace("细胞化学与生物学","生化",$content );
         $content = str_replace("中国近现代史纲要","历史",$content );
    $content = str_replace("人体形态科学","人形",$content );
    $content = str_replace("医用物理学","医用物理",$content );
    $content = str_replace("形势与政策","形势政策",$content );
    $content = str_replace("高等数学","高数",$content );
     $content = str_replace("普通化学","普化",$content );
    
 
    
   
    
	$cookie = "none";
	if(strpos($content , '需重新输入学号及密码') != false)return false;
	preg_match_all("/<td><FONT COLOR=\'#000000\'>(.*?)<\/font>/i", $content, $arr);
	return $arr;
}

echo $content;
$xh = isset($_GET["xh"]) ? $_GET["xh"] : '';
$mm = isset($_GET["mm"]) ? $_GET["mm"] : '';
header("Content-Type:text/plain;charset=utf-8");

$arr = getScore($xh , $mm);
if(!$arr){echo '学号密码输入错误,请重试'; exit(0);}
echo "本页面最终解释权归属 微信公众号：Energy CMU". "\n";
echo "\n";
echo "学号: " . $arr[1][0] . "\n";
echo "姓名: " . $arr[1][1] . "\n";
echo "成绩:\n";
echo " "."学期\t课程\t"."      "."课程类型\t分数\n";
echo "\n";
for($i = 0 ; isset($arr[1][$i]) ; $i += 9)
{
    echo "  " . $arr[1][$i+4] . "\t" . $arr[1][$i+5] ."     "."\t" . $arr[1][$i+7] . "\t" . $arr[1][$i+8] . "\n";
}
?>