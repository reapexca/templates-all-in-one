<?php


require_once "OAuth.Base.php";
class QQOAuth extends OAuthBase
{

	
	const APP_KEY = QQ_OAUTH2_APPID;
	const APP_SECRET = QQ_OAUTH2_APPSECRET;
	
	private $scope  = 'get_user_info,add_weibo,add_one_blog';
	
	public function __construct(){
		parent::__construct();
	}

	
	public function postWeibo($params = array()){
	  
	
	}

	
	
	public function LoginUrl(){
	    $uri = vsprintf('https://open.t.qq.com/cgi-bin/oauth2/authorize?client_id=%s&redirect_uri=%s&response_type=code',
	            array(self::APP_KEY,urlencode($this->redirect_uri))
	            );
	   
	    return $uri;
	}
	
	
	
	public function Logout(){}
	
	public function getAccessToken(){
	    $rtn = array();
	    $code = $_GET['code'];
	    $openid = $_GET['openid'];
	    $openkey = $_GET['openkey'];
	    $url=vsprintf('https://open.t.qq.com/cgi-bin/oauth2/access_token?client_id=%s&client_secret=%s&redirect_uri=%s&grant_type=authorization_code&code=%s',
	            array(self::APP_KEY,self::APP_SECRET,urlencode($this->redirect_uri),$code));
	    $rtn['client_id'] = $openkey;
	    $rtn['openid'] = $openid;
	    $response = $this->get_url_contents($url);
	   
	    list($access_token,$expires_in,$refersh_token) = explode('&', $response);
	    
	    
	    
	    
	    $access_token = explode('=', $access_token);
	    $expires_in = explode('=', $expires_in);
	    $refersh_token = explode('=',$refersh_token);
	    $rtn['access_token'] = $access_token[1];
	    $rtn['expires_in'] = $expires_in[1];
	    $rtn['refersh_token'] = $refersh_token[1];
	   
        	    
	    $url = 'https://open.t.qq.com/api/user/info';
	    $data = array();
	    $data['format'] = 'json';
	    $data['oauth_consumer_key'] = self::APP_KEY;
	    $data['access_token'] = $rtn['access_token'];
	    $data['openid'] = $openid;
	    $data['clientip'] = getIP();
	    $data['oauth_version'] = '2.a';
	    $data['scope'] = 'all';
	    
	    $url.='?'.http_build_query($data);
	    
	    $val = $this->get_url_contents($url);
	    $val = json_decode($val);
	    if(isset($val->errcode) && $val->errcode===0){
	        $rtn['username'] = $val->data->nick;
	        $rtn['avatar'] = $val->data->head.'/50';
	    }
	    return $rtn;
	
	}
	
	
	
	
// 	public function Login($callbackurl){
// 		$this->state = md5(uniqid(rand(), TRUE)); 
//     	$login_url = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=" 
//         . $this->appid . "&redirect_uri=" . urlencode($callbackurl)
//         . "&state=" . $this->state
//         . "&scope=".$this->scope
//         .'&scope=get_user_info,add_t,add_pic_t,add_share';
//     	return $login_url;
// 	}

// 	public function getAccessToken($redirect_uri){
// 	    $code = $_GET['code'];
// 	    $state = $_GET['state'];
// 		$url='https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id='.$this->appid.'&client_secret='.$this->appkey.'&code='.$code.'&state='.$state.'&redirect_uri='.urlencode($redirect_uri);
		
// 		$rtn = array();
// 		$response = $this->get_url_contents($url);
		
// 		list($token,$expires_in) = explode('&', $response);
// 		$access_token = explode('=', $token);
// 		$expires_in = explode('=', $expires_in);
// 		$rtn['access_token'] = $access_token[1];
// 		$rtn['expires_in'] = $expires_in[1];
// 		$openidurl = 'https://graph.qq.com/oauth2.0/me?access_token='.$access_token[1];
		
// 		$response = $this->get_url_contents($openidurl);
		
// 		$match = array();
// 		$response = preg_match('/callback\( ([\S\s]+) \);/i', $response,$match);
		

// 		if($match){
// 			$val = json_decode($match[1]);
			
// 			$rtn['client_id'] = $val->client_id;
// 			$rtn['openid'] = $val->openid;
// 		}
		
// 		$url = 'https://graph.qq.com/user/get_user_info?access_token='.$rtn['access_token'].'&oauth_consumer_key='.$this->appid.'&openid='.$rtn['openid'];
		
// 		$val = $this->get_url_contents($url);
// 		$val = json_decode($val);
// 		$rtn['username'] = $val->nickname;
// 		$rtn['avatar'] = $val->figureurl_1;
// 		return $rtn;

// 	}


}
?>