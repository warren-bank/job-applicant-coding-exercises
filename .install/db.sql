DROP database IF EXISTS job_applicant_coding_exercise__warren_bank;
CREATE database job_applicant_coding_exercise__warren_bank;
GRANT ALL PRIVILEGES ON job_applicant_coding_exercise__warren_bank.* To 'warren_bank'@'localhost' IDENTIFIED BY 'SumoMe_hire';

USE job_applicant_coding_exercise__warren_bank;

CREATE TABLE `sessions` (
  `sid` varchar(32) NOT NULL DEFAULT '',
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `admin_users_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `admin_users` (`username`, `password`, `createdAt`, `updatedAt`) VALUES
  ('warren', 'bank', NOW(), NOW()),
  ('SumoMe', 'hire', NOW(), NOW());
