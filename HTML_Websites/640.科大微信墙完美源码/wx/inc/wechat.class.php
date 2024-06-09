<?php
/********************************
* 微信公众平台消息处理类
* BY:洋子
* wyzyok@qq.com
* 2013-4-4
********************************/


/*发送文字消息模板*/
define("SEND_TEXT_TPL","<xml>
						<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							<FuncFlag>%s</FuncFlag>
							</xml>"); 

/*图文消息模板*/
define('SEND_NEWS_TPL1',"<xml>
 <ToUserName><![CDATA[%s]]></ToUserName>
 <FromUserName><![CDATA[%s]]></FromUserName>
 <CreateTime>%s</CreateTime>
 <MsgType><![CDATA[%s]]></MsgType><ArticleCount>%s</ArticleCount>
 <Articles>");
 
define('SEND_NEWS_TPL2',"<item>
 <Title><![CDATA[%s]]></Title> 
 <Description><![CDATA[%s]]></Description>
 <PicUrl><![CDATA[%s]]></PicUrl>
 <Url><![CDATA[%s]]></Url>
 </item>");
 define('SEND_NEWS_TPL3',"</Articles>
 <FuncFlag>%s</FuncFlag>
 </xml>");

/*音乐消息模板*/
define('MUSIC_TPL',"<xml>
 <ToUserName><![CDATA[%s]]></ToUserName>
 <FromUserName><![CDATA[%s]]></FromUserName>
 <CreateTime>%s</CreateTime>
 <MsgType><![CDATA[%s]]></MsgType>
 <Music>
 <Title><![CDATA[%s]]></Title>
 <Description><![CDATA[%s]]></Description>
 <MusicUrl><![CDATA[%s]]></MusicUrl>
 <HQMusicUrl><![CDATA[%s]]></HQMusicUrl>
 </Music>
 <FuncFlag>&s</FuncFlag>
 </xml>");


/*微信类*/
class WeChat{
  /*获得的*/
  private $user_name;//用户
  private $my_name;//开发者
  private $msg_id;//消息id
  private $get_msg_type;//获得消息类型
  private $get_msg_time;//获得消息时间戳
  
  private $get_text;//获得的文本内容
  
  /*获得事件内容，数组
  $get_event['event']//事件类型
  $get_event['key']//事件key值
  */
  private $get_event;//事件内容
    
    /*获得的地理位置信息，数组
    $get_location['x']//x坐标
    $get_location['y']//y坐标
    $get_location['scale']//缩放大小
    $get_location['lable']//信息
    */
    private $get_location;
  
  /*还会继续增加*/
  
  /*发送的*/
  private $send_msg_type = 'text';//发送的消息类型
  private $send_text;//发送的的文本内容
  private $msg_flag = '0';//消息标志，为 0x0001时星标刚收到的消息
  
  /*音乐消息，数组
  $send_music['title']
  $send_music['description']
  $send_music['url']
  $send_music['hq_url']
  */
  private $send_music;
  
  /*图文内容为数组
  $x[0]['count']数目，不超过10
  $x[$i]['title']一个item标题
  $x[$i]['description']描述
  $x[$i]['pic_url']图片url
  $x[$i]['url']链接url*/
  private $send_news;//图文内容
  
  /*还会继续增加*/
  public $is_processed = 0;//消息处理次数
  public $menu_id = 0;//菜单id
  
  /*获取消息，发送处理消息前调用*/
  public function GetMsg(){
    $post_str = $GLOBALS["HTTP_RAW_POST_DATA"];
    if(!empty($post_str)){
      $post_obj = simplexml_load_string($post_str,'SimpleXMLElement',LIBXML_NOCDATA);
      $this->user_name = $post_obj->FromUserName;
      $this->get_msg_time = $post_obj->CreateTime;
      $this->get_msg_type = $post_obj->MsgType;
      $this->my_name = $post_obj->ToUserName;
      $this->get_text = trim($post_obj->Content);
      $this->get_event['event'] = $post_obj->Event;
      $this->get_event['key'] = $post_obj->EventKey;
        $this->get_location['x'] = $post_obj->Location_X;
        $this->get_location['y'] = $post_obj->Location_Y;
        $this->get_location['scale'] = $post_obj->Scale;
        $this->get_location['lable'] = $post_obj->Lable;
      $this->msg_id = $post_obj->MsgId;
    }
  }
  
  /*返回用户名*/
  public function GetUserName(){
    return (string)$this->user_name;
  }
  
  /*返回开发者用户名*/
  public function GetMyName(){
    return (string)$this->my_name;
  }
  
  
  /*返回获得消息类型*/
  public function GetMsgType(){
    return (string)$this->get_msg_type;
  }
  
  /*返回消息id*/
  public function GetMsgId(){
    return (int)$this->msg_id;
  }
  
  /*返回消息时间*/
  public function GetMsgTime(){
    return (int)$this->get_msg_time;
  }
  
  /*返回获得文本内容*/
  public function GetTextContent(){
    return (string)$this->get_text;
  }
  
  /*返回获得事件内容*/
  public function GetEvent(){
    return $this->get_event;
  }
  
  /*返回获得地理位置信息*/
  public function GetLocation(){
    return $this->get_location;
  }
  
  
  
  /*返回或设置发送消息类型*/
  public function SetMsgType($msg_type = ''){
    if($msg_type) $this->send_msg_type = $msg_type;
    return (string)$this->send_msg_type;
  }
  
  /*返回或设置发送文本*/
  public function SetTextContent($text = ''){
    if($text) $this->send_text = $text;
    return (string)$this->send_text;
  }
  
  /*返回或设置发送图文内容*/
  public function SetNewsContent($news = false){
    if($news) $this->send_news = $news;
    return $this->send_news;
  }
  
  /*返回或设置音乐内容*/
  public function SetMusicContent($music = false){
    if($music) $this->send_music = $music;
    return $this->send_music;
  }
  /*返回或设置消息flag*/
  public function SetMsgFlag($flag = ''){
    if($flag) $this->msg_flag = $flag;
    return $this->msg_flag;
  }
  
  
  
  
  /*回复消息*/
  public function ResponseMsg(){
    if($this->send_msg_type=='text'){
      $result = sprintf(SEND_TEXT_TPL,$this->user_name,$this->my_name,time(),'text',$this->send_text,$this->msg_flag);
    }elseif($this->send_msg_type=='news'){
      $result = sprintf(SEND_NEWS_TPL1,$this->user_name,$this->my_name,time(),'news',$this->send_news[0]['count']);
      for($i = 1;$i <= $this->send_news[0]['count'];$i++){
        $result .= sprintf(SEND_NEWS_TPL2,$this->send_news[$i]['title'],$this->send_news[$i]['description'],$this->send_news[$i]['pic_url'],$this->send_news[$i]['url']);
      }
      $result .= sprintf(SEND_NEWS_TPL3,$this->msg_flag);
    }elseif($this->send_msg_type == 'music'){
      $result = sprintf(MUSIC_TPL,$this->user_name,$this->my_name,time(),'music',$this->send_music['title'],$this->send_music['description'],$this->send_music['url'],$this->send_music['hq_url'],$this->msg_flag);
    }
    echo $result;
  }
  
  
  
  
  
  /*验证url*/
  public function Valid(){
    $echoStr = $_GET["echostr"];
    //valid signature , option
    if($this->checkSignature()){
      echo $echoStr;
      exit;
    }
  }
  
  private function CheckSignature(){
    $signature = $_GET["signature"];
    $timestamp = $_GET["timestamp"];
    $nonce = $_GET["nonce"];
    $token = TOKEN;
    $tmpArr = array($token, $timestamp, $nonce);
    sort($tmpArr);
    $tmpStr = implode( $tmpArr );
    $tmpStr = sha1( $tmpStr );
    
    if($tmpStr == $signature){
      return true;
    }else{
      return false;
    }
  }
  
  
  
  
  
}
