<?php
/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * Baidu.php
 *百度连接类 
 * 
 * @package	Baidu
 * @author	wulin02(wulin02@baidu.com)
 * @version	$Revision: 1.0 Mon Jun 27 10:52:18 CST 2011
 **/

// In PHP 5.2 or higher we don't need to bring this in
if (!function_exists('json_encode')) {
	
	require_once(dirname(__FILE__) . '/JSON.php');

	function json_encode($value)
	{
		$services_json = new Services_JSON();
		return $services_json->encode($value);
	}

	function json_decode($json, $assoc = false)
	{
		$services_json = new Services_JSON($assoc ? SERVICES_JSON_LOOSE_TYPE : 0);
		return $services_json->decode($json);
	}
}

require_once(dirname(__FILE__) . '/BaiduStore.php');

// when using bae(baidu app engine) to deploy the application,
// just uncomment the following two lines.
//require_once('app_config.php');
//require_once(BAE_API_PATH . '/BaeFetchUrl.class.php'); 

require_once 'OAuth.Base.php';

class Baidu extends OAuthBase
{

    protected $apiKey = BAIDU_OAUTH2_APPID;
    protected $apiSecret = BAIDU_OAUTH2_APPSECRET;

    public function __construct()
    {
        $store = new BaiduCookieStore($this->apiKey);
    	
    }
    
    
    public function postWeibo($params = array()){
        return;
    }
	
	public function getAccessToken()
	{

        $code = $_GET['code'];
        $url = 'https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code='.$code.'&client_id='.$this->apiKey.'&client_secret='.$this->apiSecret.'&redirect_uri='.urlencode($this->redirect_uri);
        $rtn = $this->get_url_contents($url);
        
        $rtn = json_decode($rtn);
        $session = array();
        if(isset($rtn->access_token)){
            
            $session['refresh_token'] = $rtn->refresh_token;
            $session['session_key'] = $rtn->session_key;
            $session['session_secret'] = $rtn->session_secret;
            $session['uid'] = 0;
            $session['username'] = '';
            $session['access_token'] = $rtn->access_token;
            $session['expires_in'] = $rtn->expires_in;
            $session['avatar'] = '';
            $url = 'https://openapi.baidu.com/rest/2.0/passport/users/getLoggedInUser?access_token='.$rtn->access_token;
           
            $rtn = json_decode($this->get_url_contents($url));
            if(isset($rtn->uid)){
                 $session['uid'] = $rtn->uid;
                 $session['username'] = $rtn->uname;
                 $session['avatar'] = 'http://himg.bdimg.com/sys/portraitn/item/'.$rtn->portrait.'.jpg';

            }

        }
        
        return $session;


	
	}
	
	public function LoginUrl()
	{
	    

        return 'https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id='.$this->apiKey.'&redirect_uri='.urldecode($this->redirect_uri);

	}
	
	
	public function Logout(){}
	
	
}