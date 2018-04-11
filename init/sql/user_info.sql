/*
Navicat MySQL Data Transfer

Source Server         : NodeTest
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : mybolg

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-04-11 14:12:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(35) NOT NULL,
  `name` varchar(35) NOT NULL,
  `detail_info` varchar(35) NOT NULL,
  `create_time` varchar(35) DEFAULT NULL,
  `modified_time` varchar(35) DEFAULT NULL,
  `password` varchar(35) NOT NULL,
  `level` int(2) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', 'jama163.com', 'jama', 'aaa', '111111', '111111', '123456', null);
INSERT INTO `user_info` VALUES ('2', 'aaa@163.com', 'hunelei', 'test', '1523258318978', null, '123456', '1');
INSERT INTO `user_info` VALUES ('3', 'owen@163.com', 'owenowen', 'test', '1523269090718', null, '123456', '1');
