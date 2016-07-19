DROP TABLE IF EXISTS `Sessions`;
DROP TABLE IF EXISTS `admin_users`;
DROP TABLE IF EXISTS `surveys`;
DROP TABLE IF EXISTS `answers`;

CREATE TABLE `Sessions` (
  `sid` varchar(32) NOT NULL DEFAULT '',
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `admin_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `admin_users_id_unique` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `surveys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `surveys_id_unique` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `answers` (
  `survey_id` int(10) unsigned NOT NULL,
  `answer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) NOT NULL,
  `count` int(10) unsigned NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`survey_id`,`answer_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
