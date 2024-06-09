-- phpMyAdmin SQL Dump
-- http://www.phpmyadmin.net
--
-- 生成日期: 2012 年 09 月 26 日 09:38

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `zGxKqHjtYjVInKoQvdWI`
--

-- --------------------------------------------------------

--
-- 表的结构 `filestore`
--

CREATE TABLE IF NOT EXISTS `filestore` (
  `id` bigint(10) unsigned NOT NULL auto_increment,
  `filename` varchar(40) collate utf8_unicode_ci NOT NULL,
  `created` int(10) unsigned NOT NULL,
  `contenttype` varchar(15) collate utf8_unicode_ci NOT NULL,
  `clientip` varchar(20) collate utf8_unicode_ci NOT NULL,
  `filesize` int(10) unsigned NOT NULL,
  `originalname` varchar(50) collate utf8_unicode_ci NOT NULL,
  `userid` varchar(50) collate utf8_unicode_ci default NULL,
  `platform` varchar(10) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=894 ;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `platform` varchar(10) collate utf8_unicode_ci NOT NULL,
  `userid` varchar(50) collate utf8_unicode_ci NOT NULL,
  `accesstoken` varchar(100) collate utf8_unicode_ci NOT NULL,
  `refershtoken` varchar(100) collate utf8_unicode_ci NOT NULL,
  `session_secret` varchar(100) collate utf8_unicode_ci NOT NULL,
  `sessionkey` varchar(100) collate utf8_unicode_ci NOT NULL,
  `refershtime` int(10) unsigned NOT NULL,
  `expires_in` int(10) unsigned NOT NULL,
  `username` varchar(100) collate utf8_unicode_ci NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  `client_id` varchar(20) collate utf8_unicode_ci NOT NULL,
  `openid` varchar(60) collate utf8_unicode_ci NOT NULL,
  `filecount` int(10) unsigned NOT NULL,
  `avatar` varchar(200) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=87 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
