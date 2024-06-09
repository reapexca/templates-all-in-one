<?php
/***************************************************************************
 *
 * Copyright (c) 2011 Baidu.com, Inc. All Rights Reserved
 *
 **************************************************************************/

/**
 * Baidu.php
 * 
 * 
 * @package	Baidu
 * @author	zhujt(zhujianting@baidu.com)
 * @version	$Revision: 1.0 Mon Jun 27 10:52:18 CST 2011
 **/
 
abstract class BaiduStore
{
	protected $apiKey;
	
	public function __construct($apiKey)
	{
		$this->apiKey = $apiKey;
	}
	
	/**
	 * Get the variable value specified by the variable key name for
	 * current session user from the storage system.
	 * 
	 * @param string $key Variable key name
	 * @param mix $default Default value if the key couldn't be found
	 * @return mix Returns the value for the specified key if it exists, 
	 * otherwise return $default value
	 */
	abstract public function get($key, $default = false);
	
	/**
	 * Save the variable item specified by the variable key name into
	 * the storage system for current session user.
	 * 
	 * @param string $key	Variable key name
	 * @param mix $value	Variable value
	 * @return bool Returns true if the saving operation is success,
	 * otherwise returns false
	 */
	abstract public function set($key, $value);
	
	/**
	 * Remove the stored variable item specified by the variable key name
	 * from the storage system for current session user.
	 * 
	 * @param string $key	Variable key name
	 * @return bool Returns true if remove success, otherwise returns false
	 */
	abstract public function remove($key);
	
	/**
	 * Remove all the stored variable items for current session user from
	 * the storage system.
	 * 
	 * @return bool Returns true if remove success, otherwise returns false
	 */
	abstract public function removeAll();
	
	/**
	 * Prints to the error log if you aren't in command line mode.
	 *
	 * @param String log message
	 */
	public static function errorLog($msg)
	{
		// disable error log if we are running in a CLI environment
		if (php_sapi_name() != 'cli') {
			error_log($msg);
		}
		// uncomment this if you want to see the errors on the page
		// print 'error_log: '.$msg."\n";
	}
}

class BaiduCookieStore extends BaiduStore
{
	/**
	 * Supported variable key name.
	 * @var array
	 */
	protected static $kSupportedKeys = array(
		'state', 'code', 'session',
	);
	
	public function __construct($apiKey)
	{
		header('P3P: CP="NOI ADM DEV PSAi COM NAV OUR OTR STP IND DEM"');
		parent::__construct($apiKey);
	}
	
	public function get($key, $default = false)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to getPersistentData.');
			return $default;
		}
		
		$name = $this->constructSessionVariableName($key);
		$value = $_COOKIE[$name];
		if ($value && $key == 'session') {
			parse_str($value, $value);
		}
		if (empty($value)) {
			$value = $default;
		}
		
		return $value;
	}
	
	public function set($key, $value)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to clearPersistentData.');
			return false;
		}
		
		$name = $this->constructSessionVariableName($key);
		if ($key == 'session') {
			$expires = isset($value['expires_in']) ? $value['expires_in'] * 2 : 3600*24;
			$value = http_build_query($value, '', '&');
		} else {
			$expires = 3600*24;
		}
		
		setcookie($name, $value, time() + $expires, '/');
		$_COOKIE[$name] = $value;
		
		return true;
	}
	
	public function remove($key)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to clearPersistentData.');
			return false;
		}
		
		$name = $this->constructSessionVariableName($key);
		setcookie($name, 'delete', time() - 3600*24, '/');
		unset($_COOKIE[$name]);
		
		return true;
	}
	
	public function removeAll()
	{
		foreach (self::$kSupportedKeys as $key) {
			$this->remove($key);
		}
		return true;
	}
	
	protected function constructSessionVariableName($key)
	{
		return implode('_', array('bds', $this->apiKey, $key));
	}
}

class BaiduSessionStore extends BaiduStore
{
	/**
	 * Supported variable key name.
	 * @var array
	 */
	protected static $kSupportedKeys = array(
		'state', 'code', 'session',
	);
	
	public function __construct($apiKey)
	{
		if (!session_id()) {
			session_start();
		}
		parent::__construct($apiKey);
	}
	
	public function get($key, $default = false)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to getPersistentData.');
			return $default;
		}
		
		$name = $this->constructSessionVariableName($key);
		return isset($_SESSION[$name]) ? $_SESSION[$name] : $default;
	}
	
	public function set($key, $value)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to setPersistentData.');
			return false;
		}
		
		$name = $this->constructSessionVariableName($key);
		$_SESSION[$name] = $value;
		return true;
	}
	
	public function remove($key)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to clearPersistentData.');
			return false;
		}
		
		$name = $this->constructSessionVariableName($key);
		unset($_SESSION[$name]);
		
		return true;
	}
	
	public function removeAll()
	{
		foreach (self::$kSupportedKeys as $key) {
			$this->remove($key);
		}
		return true;
	}
	
	protected function constructSessionVariableName($key)
	{
		return implode('_', array('bds', $this->apiKey, $key));
	}
}

class BaiduMemcachedStore extends BaiduStore
{
	/**
	 * Supported variable key name.
	 * @var array
	 */
	protected static $kSupportedKeys = array(
		'state', 'code', 'session',
	);
	
	/**
	 * Memcache instance
	 * @var Memcache
	 */
	protected $memcache;
	
	/**
	 * Session ID for current user to distinguish with other users.
	 * @var string
	 */
	protected $sessionId;
	
	/** 
	 * @param string $apiKey
	 * @param Memcache $memcache
	 */
	public function __construct($apiKey, $memcache, $sessionId)
	{
		$this->memcache = $memcache;
		$this->sessionId = $sessionId;
		
		parent::__construct($apiKey);
	}
	
	public function get($key, $default = false)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to getPersistentData.');
			return $default;
		}
		
		$name = $this->constructSessionVariableName($key);
		$value = $this->memcache->get($name);
		return ($value === false) ? $default : $value;
	}
	
	public function set($key, $value)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to setPersistentData.');
			return false;
		}
		
		$name = $this->constructSessionVariableName($key);
		return $this->memcache->set($name, $value, 0, 0);
	}
	
	public function remove($key)
	{
		if (!in_array($key, self::$kSupportedKeys)) {
			self::errorLog('Unsupported key passed to clearPersistentData.');
			return false;
		}
		
		$name = $this->constructSessionVariableName($key);
		return $this->memcache->delete($name);
	}
	
	public function removeAll()
	{
		foreach (self::$kSupportedKeys as $key) {
			$this->remove($key);
		}
		return true;
	}
	
	protected function constructSessionVariableName($key)
	{
		return implode('_', array('bds', $this->apiKey, $this->sessionId, $key));
	}
}