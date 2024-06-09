<?php
require_once 'OAuth.Base.php';
class SianOAuth extends OAuthBase{
    
    const APP_KEY=SINA_OAUTH2_APPID;
    const APP_SECRET = SINA_OAUTH2_APPSECRET;
    
    public function __construct(){
        parent::__construct();
    }
    
    public function postWeibo($params=array()){
        $url='https://api.weibo.com/2/statuses/update.json';
        $data = array();
        $data['access_token'] = $params['access_token'];
        $data['status']       = urlencode(trim($params['content']));
        $url = $url.'?'.http_build_query($data);
        $rtn = $this->do_post($url, NULL);
        $this->Logger->logWrite(2,'发表新浪微博：'.$rtn);
    }
    
    public function LoginUrl(){
        $url = vsprintf('https://api.weibo.com/oauth2/authorize?client_id=%s&redirect_uri=%s&response_type=code',
            array(self::APP_KEY,urlencode($this->redirect_uri)));
        return $url;    
    }
    
    public function Logout(){
        
    }
    
    public function getAccessToken(){
        $url = 'https://api.weibo.com/oauth2/access_token';
        $post = array();
        $post['client_id'] = self::APP_KEY;
        $post['client_secret'] = self::APP_SECRET;
        $post['grant_type'] = 'authorization_code';
        $post['code'] = $_GET['code'];
        $post['redirect_uri'] = $this->redirect_uri;
        $url  = $url.'?'.http_build_query($post);
       
        
        $response = $this->do_post($url, NULL);
       
        $response = json_decode($response);
        $rtn = array();
        if(isset($response->access_token)){
            $rtn['access_token'] = $response->access_token;
            $rtn['expires_in']   = $response->expires_in;
            $rtn['uid']          = $response->uid;
        }
        
        //获取个人信息
        $url = 'https://api.weibo.com/2/users/show.json?access_token='.$rtn['access_token'].'&uid='.$rtn['uid'];
        $response = $this->get_url_contents($url);
        $this->Logger->logWrite(2,'sina show.json:'.$url."\n".$response);
        $response = json_decode($response);
        if(isset($response->id)){
            $rtn['username'] = $response->name;
            $rtn['avatar'] = $response->profile_image_url;
        }
        
        return $rtn;
        
    }
    
    
}