-- ============================================== create database and user to access it

DROP database IF EXISTS job_applicant_coding_exercise__warren_bank;
CREATE database job_applicant_coding_exercise__warren_bank;
GRANT ALL PRIVILEGES ON job_applicant_coding_exercise__warren_bank.* To 'warren_bank'@'localhost' IDENTIFIED BY 'SumoMe_hire';

USE job_applicant_coding_exercise__warren_bank;

-- ============================================== create tables

CREATE TABLE `sessions` (
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

-- ============================================== add sample data to tables for testing

INSERT INTO `admin_users` (`createdAt`, `updatedAt`, `username`, `password`) VALUES
  (NOW(), NOW(), 'warren', 'bank'),
  (NOW(), NOW(), 'SumoMe', 'hire');

INSERT INTO `surveys` (`createdAt`, `updatedAt`, `title`, `question`) VALUES
  (NOW(), NOW(), 'Survey 01', 'Favorite color?'),
  (NOW(), NOW(), 'Survey 02', 'Favorite fruit?'),
  (NOW(), NOW(), 'Survey 03', 'Favorite place?'),
  (NOW(), NOW(), 'Survey 04', 'Favorite person?'),
  (NOW(), NOW(), 'Survey 05', 'Favorite food?'),
  (NOW(), NOW(), 'Survey 06', 'Favorite cartoon?');

INSERT INTO `answers` (`createdAt`, `updatedAt`, `survey_id`, `count`, `answer`) VALUES
  (NOW(), NOW(), 1, 190, 'red'),
  (NOW(), NOW(), 1, 003, 'white'),
  (NOW(), NOW(), 1, 010, 'blue'),
  (NOW(), NOW(), 1, 040, 'gold'),

  (NOW(), NOW(), 2, 160, 'apple'),
  (NOW(), NOW(), 2, 040, 'orange'),
  (NOW(), NOW(), 2, 180, 'banana'),
  (NOW(), NOW(), 2, 080, 'pineapple'),

  (NOW(), NOW(), 3, 040, 'beach'),
  (NOW(), NOW(), 3, 030, 'mountains'),
  (NOW(), NOW(), 3, 010, 'forest'),
  (NOW(), NOW(), 3, 090, 'desert'),

  (NOW(), NOW(), 4, 120, 'mother'),
  (NOW(), NOW(), 4, 045, 'father'),
  (NOW(), NOW(), 4, 085, 'spouse'),
  (NOW(), NOW(), 4, 025, 'sibling'),

  (NOW(), NOW(), 5, 030, 'chinese'),
  (NOW(), NOW(), 5, 035, 'italian'),
  (NOW(), NOW(), 5, 025, 'thai'),
  (NOW(), NOW(), 5, 015, 'mexican'),

  (NOW(), NOW(), 6, 070, 'futurama'),
  (NOW(), NOW(), 6, 049, 'family guy'),
  (NOW(), NOW(), 6, 079, 'south park'),
  (NOW(), NOW(), 6, 119, 'voltron');
