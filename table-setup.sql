
/*
main databse
*/
create database if not exists main;

use main;

drop table if exists restaurant;

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `phone_number` varchar(64) DEFAULT NULL,
  `picture_name` varchar(64) DEFAULT NULL,
  `rating` DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `restaurant` (`id`,`name`,`address`,`email`, `phone_number`, `picture_name`, `rating`) VALUES (1,'restaurant1','testing street 3143','john.doe@foo.com', '443-000-0000', 'calcjava.png', 5);
INSERT INTO `restaurant` (`id`,`name`,`address`,`email`, `phone_number`, `picture_name`, `rating`) VALUES (2,'restaurant2','testing ave 123 Md','mary.public@foo.com', '443-111-1111', 'pythontictac.png', 4);
INSERT INTO `restaurant` (`id`,`name`,`address`,`email`, `phone_number`, `picture_name`, `rating`) VALUES (3,'restaurant3','testing road 1234 Md state','exaple@exple.com', '443-222-2222', 'calcjava.png', 5);
