<?php
require_once "BaeLog.class.php";
abstract  class OAuthBase
{
    
    protected $redirect_uri = NULL;
    protected $Logger = NULL;
    
    public function __construct(){
        $this->Logger = BaeLog::getInstance();
    }
    
    public function setCallback($callback){
        $this->redirect_uri = $callback;
    }


    
    abstract function LoginUrl();



    abstract  function postWeibo($params = array());


    abstract  function Logout();


    abstract  function getAccessToken();
    
    
    function do_post($url, $data)
    {
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $ret = curl_exec($ch);
        
        curl_close($ch);
        return $ret;
    }
    
    function get_url_contents($url)
    {
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $result =  curl_exec($ch);
        curl_close($ch);
        
        return $result;
    }
    
    
}