/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : zolmall

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2019-03-24 19:48:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(6) NOT NULL,
  `goodsName` varchar(255) NOT NULL,
  `intro` varchar(255) NOT NULL,
  `current` int(11) NOT NULL,
  `original` varchar(255) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `viceType` varchar(255) DEFAULT NULL,
  `sales` int(20) DEFAULT NULL,
  `pic1` varchar(255) DEFAULT NULL,
  `color` varchar(255) NOT NULL,
  `shop` varchar(255) NOT NULL,
  `quota` int(6) NOT NULL,
  `productid` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('40', '佳能 EF 24-70mm f/2.8L II USM', '限时抢购：标变镜皇-用上就爱上-“大三元”镜头 红圈镜头', '9500', '10900', 'today40.jpg', '数码', '1.55663E+12', null, null, null, '红色', '环宇荣合专营店', '100', '1040', '1', '13927976268');

-- ----------------------------
-- Table structure for quality_goods
-- ----------------------------
DROP TABLE IF EXISTS `quality_goods`;
CREATE TABLE `quality_goods` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `Tradename` varchar(255) NOT NULL COMMENT '商品名',
  `current` varchar(255) NOT NULL COMMENT '现价',
  `original` varchar(255) NOT NULL COMMENT '原价',
  `shop` varchar(255) NOT NULL COMMENT '店铺名',
  `time` varchar(255) NOT NULL COMMENT '时间毫秒',
  `picture` varchar(255) NOT NULL COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quality_goods
-- ----------------------------
INSERT INTO `quality_goods` VALUES ('1', '【顺丰包邮 送壳膜】小米6X 全网通 6G运行 移动联通电信4G 双卡双待 赤焰红 行货64GB', '1338', '1599 ', '汇通数码风暴专营店', '1556947871000', 'qb-pic1.jpg');
INSERT INTO `quality_goods` VALUES ('2', '华硕 ASUS ROG-STRIX-GeForce RTX2080 TI-O11G-GAMING 1350-1665MHz 黑色', '12599', '14999', '锦鑫科技电脑专营店', '1556947871000', 'qb-pic2.jpg');
INSERT INTO `quality_goods` VALUES ('3', '【顺丰包邮】一加手机6T 8GB+128GB  光感屏幕指纹 全面屏 全网通4G 墨岩黑 行货256GB', '4159', '4699', '汇通数码风暴专营店', '1556947871000', 'qb-pic3.jpg');
INSERT INTO `quality_goods` VALUES ('4', '【现货包邮】荣耀8X 全网通 4G+64G/128G全面屏手机 双卡双待 幻夜黑 行货128GB', '1588', '1589', '环宇荣合专营店', '1556947871000', 'qb-pic4.jpg');
INSERT INTO `quality_goods` VALUES ('5', '【顺丰包邮】Apple iPhone XR (A2108) 64GB/128GB  全网通4G手机 红色 行货256GB', '6666', '7299', '汇通数码风暴专营店', '1556947871000', 'qb-pic5.jpg');
INSERT INTO `quality_goods` VALUES ('6', '【顺丰包邮】苹果 iPhone 8 Plus（全网通）移动联通电信4G手机64/256 银色 行货256GB', '6099', '6799', '汇通数码风暴专营店', '1556947871000', 'qb-pic6.jpg');

-- ----------------------------
-- Table structure for rush
-- ----------------------------
DROP TABLE IF EXISTS `rush`;
CREATE TABLE `rush` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `goodsName` varchar(255) NOT NULL COMMENT '商品名称',
  `intro` varchar(255) NOT NULL COMMENT '商品介绍',
  `current` int(255) NOT NULL COMMENT '现价',
  `original` varchar(255) NOT NULL COMMENT '原价',
  `pic` varchar(255) NOT NULL COMMENT '图片',
  `type` varchar(255) NOT NULL COMMENT '类型',
  `time` varchar(255) NOT NULL COMMENT '时间',
  `viceType` varchar(255) DEFAULT NULL COMMENT '类型副类',
  `sales` int(20) NOT NULL COMMENT '销量',
  `pic1` varchar(255) DEFAULT NULL COMMENT '图片2',
  `color` varchar(255) DEFAULT NULL,
  `shop` varchar(255) DEFAULT NULL,
  `quota` int(6) DEFAULT NULL,
  `productid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rush
-- ----------------------------
INSERT INTO `rush` VALUES ('1', '拯救者Y7000 正装野兽 强劲性能 尽兴吃鸡唱完Apex', '144Hz电竞屏 2T+128G固态双硬盘 1050TI独立显卡正版office', '6039', '6399', 'today1.jpg', '电脑', '1.55663E+12', '笔记本', '1', 'today7.jpg', '黑色', '汇通数码风暴专营店\r\n汇通数码风暴专营店\r\n汇通数码风暴专营店', '100', '1001');
INSERT INTO `rush` VALUES ('2', '小米（MI） 小米平板4 四代 8英寸屏幕 骁龙660 WIFI', '顺丰包邮，全新原封，全国联保，支持官方验证！WIFI版 3GB+32GB', '6999', '7200', 'today2.jpg', '手机', '1.55663E+12', null, '32', 'today10.jpg', '红色', '汇通数码风暴专营店', '100', '1002');
INSERT INTO `rush` VALUES ('3', '【新品 低价开团】三星 A8s（6GB+128） 黑瞳全视屏手机', '顺丰包邮，全新国行原装正品 骁龙710芯片 后置三摄 全网通4G 双卡双待', '5000', '5200', 'today3.jpg', '手机', '1.55663E+12', null, '65', 'today4.jpg', '绿色', '汇通数码风暴专营店', '100', '1003');
INSERT INTO `rush` VALUES ('4', 'Apple耳机 采用 Lightning 接头的 EarPods', 'Apple原装Lightning手机耳机 只适用于苹果', '88', '90', 'today4.jpg', '外设', '1.55663E+12', '数码周边产品', '6', 'today3.jpg', '白色', '汇通数码风暴专营店', '100', '1004');
INSERT INTO `rush` VALUES ('5', '【原封国行】苹果iPad mini 4 平板电脑 128G灰色', '全新正品，原封未激活，支持官方验证，参数仅供参考请以官方数据为准！', '9000', '9300', 'today5.jpg', '电脑', '1.55663E+12', '平板电脑', '10', 'today8.jpg', '紫色', '汇通数码风暴专营店', '100', '1005');
INSERT INTO `rush` VALUES ('6', '【团购】Apple iPad平板2018年新款9.7英寸32G', '全新原封，国行未激活支持官方验证！参数仅供参考请以官方数据为准！', '9000', '9300', 'today6.jpg', '电脑', '1.55663E+12', '平板电脑', '30', 'today8.jpg', '蓝色', '锦鑫科技电脑专营店', '100', '1006');
INSERT INTO `rush` VALUES ('7', '【顺丰包邮 送耳机】美图T9 4GB+64GB 自拍美颜 全网通', '美图T9智能摄影师，专属定制摄影方案', '4999', '5555', 'today7.jpg', '手机', '1.55663E+12', null, '5', 'today11.jpg', '黑色', '锦鑫科技电脑专营店', '100', '1007');
INSERT INTO `rush` VALUES ('8', '【低价开团 送耳机】美图T9  6GB+128GB  自拍美颜', '顺丰包邮 原装正品   美图T9智能摄影师，专属定制摄影方案', '2859', '3399', 'today8.jpg', '手机', '1.55663E+12', null, '12', 'today11.jpg', '黑色', '锦鑫科技电脑专营店', '100', '1008');
INSERT INTO `rush` VALUES ('9', '【低价开团 送耳机】美图T9  6GB+128GB  自拍美颜', '顺丰包邮 原装正品   美图T9智能摄影师，专属定制摄影方案', '2759', '3399', 'today9.jpg', '手机', '1.55663E+12', null, '2', 'today11.jpg', '红色', '锦鑫科技电脑专营店', '100', '1009');
INSERT INTO `rush` VALUES ('10', '【顺丰包邮】联想 扬天V330-14 14英寸 商务办公笔记本', '全新质感外观设计 八代i5CPU强大性能 防窥摄像头 FHD全高清屏 双视频接口', '3799', '3999', 'today10.jpg', '电脑', '1.55663E+12', '笔记本', '23', 'today11.jpg', '蓝色', '环宇荣合专营店', '100', '1010');
INSERT INTO `rush` VALUES ('11', '【低价开团  送耳机】美图V6自拍美颜 6G+128GB 全网通', '顺丰包邮，全新正品，自拍美颜 6G+128GB 全网通 移动联通电信', '1799', '2699', 'today11.jpg', '手机', '1.55663E+12', null, '25', 'today16.jpg', '红色', '锦鑫科技电脑专营店', '100', '1011');
INSERT INTO `rush` VALUES ('12', '【低价开团  送耳机】美图V6自拍美颜 6G+128GB 全网通', '顺丰包邮，全新正品，自拍美颜 6G+128GB 全网通 移动联通电信', '1799', '2699', 'today12.jpg', '手机', '1.55663E+12', null, '0', 'today16.jpg', '蓝色', '环宇荣合专营店', '100', '1012');
INSERT INTO `rush` VALUES ('13', 'i5 9400F/RTX2060电竞主机 加装2TB固态硬盘', 'i5 9400F九代六核RTX2060光追显卡 标配加装2TB固态硬盘', '5638', '6138', 'today13.jpg', 'DIY', '1.55663E+12', null, '2', 'today16.jpg', '红色', '锦鑫科技电脑专营店', '100', '1013');
INSERT INTO `rush` VALUES ('14', 'i5 9400F/RTX2060 电竞主机升级480G大容量固态', 'i5 9400F九代六核 RTX2060光追显卡 标配升级为480G固态硬盘', '5558', '6888', 'today14.jpg', 'DIY', '1.55663E+12', null, '52', 'today16.jpg', '蓝色', '环宇荣合专营店', '100', '1014');
INSERT INTO `rush` VALUES ('15', 'i5 9400F RTX2060 升级16G双通道内存', 'i5 9400F九代六核RTX2060 6G光追显卡 标配升级为16G双通道内存', '5988', '6098', 'today15.jpg', 'DIY', '1.55663E+12', null, '3', 'today9.jpg', '蓝色', '环宇荣合专营店', '100', '1015');
INSERT INTO `rush` VALUES ('16', 'intel  i7-9700K 酷睿八核 盒装CPU处理器', '锋芒睿气,历9弥芯】LGA1151芯片接口,八核八线程,睿频可至4.9GHz!推', '2899', '3199', 'today16.jpg', 'DIY', '1.55663E+12', null, '23', 'today9.jpg', '蓝色', '锦鑫科技电脑专营店', '100', '1016');
INSERT INTO `rush` VALUES ('17', '英特尔（Intel）i5 9400F 酷睿六核 盒装CPU处理器', '9就是这么强 为游戏而生的F体现超能的性价比 套提华硕主板优惠50元', '1199', '1299', 'today17.jpg', 'DIY', '1.55663E+12', null, '22', 'today9.jpg', '蓝色', '环宇荣合专营店', '100', '1017');
INSERT INTO `rush` VALUES ('18', '美商海盗船USCORSAIR复仇者LPX DDR4 3000', '13年实体专卖店 精选颗粒定制PCB板，纯铝散热器，XMP2.0认证轻松超频', '369', '699', 'today18.jpg', 'DIY', '1.55663E+12', null, '10', 'today9.jpg', '蓝色', '环宇荣合专营店', '100', '1018');
INSERT INTO `rush` VALUES ('19', '甲骨龙 I5 8400升i5 9400F GTX1060 5G', '默认配置', '3699', '3799', 'today19.jpg', 'DIY', '1.55663E+12', null, '3', 'today9.jpg', '紫色', '锦鑫科技电脑专营店', '100', '1019');
INSERT INTO `rush` VALUES ('20', '玩家国度 ROG Maximus XI Formula', 'AI智能超频,电感导热贴,板载5G网卡,双M.2导热片,二代内存优化设计', '3699', '3999', 'today20.jpg', 'DIY', '1.55663E+12', null, '0', 'today9.jpg', '红色', '环宇荣合专营店', '100', '1020');
INSERT INTO `rush` VALUES ('21', 'AOC AGON 爱攻II AG272QCX 2K高清 144h', '实体专卖全新 顺丰速运【吃鸡大跳！爱攻少不了】 2K高清 144hz ΔE', '2449', '2499', 'today21.jpg', '外设', '1.55663E+12', '电脑外设', '0', 'today9.jpg', '红色', '环宇荣合专营店', '100', '1021');
INSERT INTO `rush` VALUES ('22', 'AOC AGON 爱攻I AG271QX 2K高清 144hz', '【吃鸡不可少！2K+144Hz+1ms升降旋转 吃鸡 游戏电竞显示器 绝地求生', '2799', '2899', 'today22.jpg', '外设', '1.55663E+12', '电脑外设', '0', 'today9.jpg', '黑色', '锦鑫科技电脑专营店', '100', '1022');
INSERT INTO `rush` VALUES ('23', '英特尔（Intel）i9-9900k 酷睿八核 盒装CPU处理器', '【锋芒睿气,历9弥芯】LGA1151芯片接口,八核十六线程,睿频可至5.0GHz', '4499', '4599', 'today23.jpg', 'DIY', '1.55663E+12', null, '3', 'today9.jpg', '黑色', '环宇荣合专营店', '100', '1023');
INSERT INTO `rush` VALUES ('24', '玩家国度ROG MAXIMUS XI EXTREME  M11E', '授权实体专卖【ROG旗舰级主板】正品授权专卖 XAI智能超频，加厚全覆盖散热', '5499', '5900', 'today24.jpg', 'DIY', '1.55663E+12', null, '0', 'today9.jpg', '黑色', '环宇荣合专营店', '100', '1024');
INSERT INTO `rush` VALUES ('25', '金士顿Predator系列 掠食者3000 8G', '金士顿(Kingston)骇客神条 Predator系列 高频玩家首选', '429', '499', 'today25.jpg', 'DIY', '1.55663E+12', null, '2', 'today9.jpg', '红色', '环宇荣合专营店', '100', '1025');
INSERT INTO `rush` VALUES ('26', '金士顿(Kingston)骇客神条  8G DDR4 2400', '要开心！金士顿DIY让你装酷，让你嗨 专注于游戏兼容 稳定 之选金士顿', '339', '599', 'today26.jpg', 'DIY', '1.55663E+12', null, '4', 'today9.jpg', '紫色', '锦鑫科技电脑专营店', '100', '1026');
INSERT INTO `rush` VALUES ('27', '华硕 ROG GeForce RTX2080 TI-O11G', '智能超频软件！2.7插槽＆镜面直触散热技术，第二代FANCONNECT技术，开启', '12599', '14999', 'today27.jpg', 'DIY', '1.55663E+12', null, '7', 'today9.jpg', '红色', '汇通数码风暴专营店', '100', '1027');
INSERT INTO `rush` VALUES ('28', '七彩虹iGame RTX 2080 Ti Advanced OC', 'iGame RTX20显卡大有不同，光影技术、图灵架构游戏新动', '8799', '9699', 'today28.jpg', 'DIY', '1.55663E+12', null, '2', 'today9.jpg', '紫色', '汇通数码风暴专营店', '100', '1028');
INSERT INTO `rush` VALUES ('29', '威刚 ADATA 万紫千红系列 DDR4 2400频率 8GB', '威刚8G/2666高速内存 叁年换新 顺丰极速物流 全国联保', '309', '399', 'today29.jpg', 'DIY', '1.55663E+12', null, '7', 'today20.jpg', '黑色', '汇通数码风暴专营店', '100', '1029');
INSERT INTO `rush` VALUES ('30', '华硕（ASUS）VG278Q 27英寸144Hz刷新 1秒响应', 'MOBA模式 吃鸡 国民电竞显示器（HDMI/DP/DVI接口+内置音箱）', '1899', '2390', 'today30.jpg', '外设', '1.55663E+12', '电脑外设', '0', 'today20.jpg', '红色', '汇通数码风暴专营店', '100', '1030');
INSERT INTO `rush` VALUES ('31', 'AMD 锐龙 5 2400G正 品  自带独显卡的性能处理器', '搭载Radeon RX Vega11 Graphic 4核 8线程AM4接口', '999', '1049', 'today31.jpg', 'DIY', '1.55663E+12', null, '0', 'today20.jpg', '紫色', '汇通数码风暴专营店', '100', '1031');
INSERT INTO `rush` VALUES ('32', '华硕 ROG玩家国度 PG348Q 34英寸IPS带鱼屏电竞', 'APEX英寸IPS带鱼屏显示屏3800R曲率100Hz G-SYNC电竞液晶显示', '6999', '7599', 'today32.jpg', '外设', '1.55663E+12', '电脑外设', '7', 'today20.jpg', '红色', '环宇荣合专营店', '100', '1032');
INSERT INTO `rush` VALUES ('33', 'ROG STRIX B360-F GAMING 猛禽同步RGB', '一体化I/O背板+I/O盔甲,M.2散热片,小白全中文BIOS,声波雷达,QLE', '899', '1099', 'today33.jpg', 'DIY', '1.55663E+12', null, '0', 'today20.jpg', '红色', '环宇荣合专营店', '100', '1033');
INSERT INTO `rush` VALUES ('34', '华硕（ASUS）CERBERUS  GTX1050TI-A4G', '【腾讯游戏推荐+三年质保】全自动制成！散热背板加持，防尘风扇酷冷耐用！', '999', '1299', 'today34.jpg', 'DIY', '1.55663E+12', null, '7', 'today20.jpg', '绿色', '汇通数码风暴专营店', '100', '1034');
INSERT INTO `rush` VALUES ('35', '影驰RTX 2080 Ti 名人堂HOF 纯白信仰皇冠级', '【3年质保,游戏显卡】白色信仰,12层PCB,LED皇冠,特制支撑杆!', '10899', '12999', 'today35.jpg', 'DIY', '1.55663E+12', null, '0', 'today20.jpg', '绿色', '汇通数码风暴专营店', '100', '1035');
INSERT INTO `rush` VALUES ('36', '讯飞淘云阿尔法蛋机智侠智能机器人讯飞淘云儿童早教机器人 粉色', '字词听写/在线词典/汉字一点通/英语即学', '699', '949', 'today36.jpg', '智能', '1.55663E+12', null, '4', 'today20.jpg', '绿色', '汇通数码风暴专营店', '100', '1036');
INSERT INTO `rush` VALUES ('37', '讯飞淘云阿尔法蛋机智侠智能机器人讯飞淘云儿童早教机器人 白色', '字词听写/在线词典/汉字一点通/英语即学', '699', '949', 'today37.jpg', '智能', '1.55663E+12', null, '0', 'today20.jpg', '绿色', '汇通数码风暴专营店', '100', '1037');
INSERT INTO `rush` VALUES ('38', '佳能 EF 70-200mm f/2.8L IS III三代镜头', '佳能 EF 70-200mm f/2.8L IS III三代镜头', '11700', '14900', 'today38.jpg', '数码', '1.55663E+12', null, '44', 'today20.jpg', '绿色', '汇通数码风暴专营店', '100', '1038');
INSERT INTO `rush` VALUES ('39', 'GoPro HERO7 Black黑色 运动相机摄像机', '10米防水防抖，8倍慢动作，语音控制，视频直播', '2800', '3290', 'today39.jpg', '数码', '1.55663E+12', null, '0', 'today20.jpg', '绿色', '环宇荣合专营店', '100', '1039');
INSERT INTO `rush` VALUES ('40', '佳能 EF 24-70mm f/2.8L II USM', '限时抢购：标变镜皇-用上就爱上-“大三元”镜头 红圈镜头', '9500', '10900', 'today40.jpg', '数码', '1.55663E+12', null, '4', 'today20.jpg', '红色', '环宇荣合专营店', '100', '1040');
INSERT INTO `rush` VALUES ('41', '新款现货发售；佳能 5D Mark IV(单机) 不含镜头', '3040万像素-触摸屏-支持WIFI功能-4K视频', '15600', '16800', 'today41.jpg', '数码', '1.55663E+12', null, '0', 'today20.jpg', '红色', '环宇荣合专营店', '100', '1041');
INSERT INTO `rush` VALUES ('42', '佳能 EF 70-200mm f/2.8L IS II USM', '佳能 EF 70-200mm f/2.8L IS II USM', '10300', '11950', 'today42.jpg', '数码', '1.55663E+12', null, '2', 'today20.jpg', '绿色', '环宇荣合专营店', '100', '1042');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '13927976266', 'c123456');
INSERT INTO `user` VALUES ('2', '13926266666', 'c123456');
INSERT INTO `user` VALUES ('3', '13927895677', 'c123456');
INSERT INTO `user` VALUES ('4', '13927976267', 'c123456');
INSERT INTO `user` VALUES ('5', '13927976267', 'c123456');
INSERT INTO `user` VALUES ('6', '13965659898', 'c123456');
INSERT INTO `user` VALUES ('7', '13226769807', 'c123456');
INSERT INTO `user` VALUES ('8', '13226769806', 'c123456');
INSERT INTO `user` VALUES ('9', '13266699807', 'c123456');
INSERT INTO `user` VALUES ('10', '13927976666', 'c123456');
INSERT INTO `user` VALUES ('11', '13927976268', 'c123456');
SET FOREIGN_KEY_CHECKS=1;
