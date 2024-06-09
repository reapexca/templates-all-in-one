<?php

require_once 'OAuth.Base.php';

class OAuth2
{
    public $provider = NULL;
    public $platform = NULL;
    public function __construct($plat ,$callbackurl=''){
        $this->platform = $plat;
        switch ($this->platform){
            case 'baidu':
                require 'Baidu.php';
                $this->provider = new Baidu();
                break;
            case 'qq':
                require 'qq.oauth.php';
                $this->provider = new QQOAuth();
                break;
            case 'sina':
                require 'oauth.sina.php';
                $this->provider = new SianOAuth();
                break;
        }
        if($this->provider)
            $this->provider->setCallback($callbackurl);
    }
    
    
    public function setCallback($callback){
         $this->provider->setCallback($callback);
    }
    
    
    /**
     * 获取OAuth登录地址
     */
    public function getLoginUrl(){
        
       return $this->provider->LoginUrl();
    }
    
    
    
    public function postWeibo($params = array()){
        $this->provider->postWeibo($params);
    }
    
    
    
    public function Logout(){
            $this->provider->Logout;
    }
    
    /**
     * 获取AccessToken，实际上这一步已经做了强化，会返回：expires_in/userid/accesstoken/refershtoken/sessionkey/session_secret/openid/client_id/refershtime/username/createtime/
     */
    public function getAccessToken(){
            $user = array();
            $user['platform'] = $this->platform;
            $user['expires_in'] = 0;
			$user['userid'] = '';
			$user['access_token'] = '';
			$user['refresh_token'] = '';
			$user['session_key'] = '';
			$user['session_secret'] = '';
			$user['openid'] = '';
			$user['client_id'] = '';
			$user['refershtime'] = time();
			$user['username'] = '';
			$user['createtime'] = time();
			
            $rtn =  $this->provider->getAccessToken();
            
             $user['userid'] = $this->platform=='qq' ? $rtn['openid'] : $rtn['uid'];
//             $user['username'] = $rtn['username'];
//             $user['access_token'] = $rtn['access_token'];
//             $user['refresh_token'] = $rtn['refersh_token'];
//             $user['session_key'] = $rtn['session_key'];
//             $user['session_secret'] = $rtn['session_secret'];
//             $user['openid'] = $rtn['openid'];
// 			$user['client_id'] = $rtn['client_id'];
// 			$user['expires_in'] = $rtn['expires_in'];
//             $user['avatar'] = $rtn['avatar'];    
            $user = array_merge($user,$rtn);
            
            return $user;
    }
}