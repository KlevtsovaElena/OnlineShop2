-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `login` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role` varchar(50) NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `temp_password` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date_registr` datetime NOT NULL,
  `date_update` datetime DEFAULT NULL,
  `token` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `login`, `role`, `password`, `temp_password`, `date_registr`, `date_update`, `token`) VALUES
(1,	'Елена',	'Клевцова',	'klevtsova-ev',	'admin',	'ingP3pI3LX91.',	'',	'2023-02-21 17:55:33',	NULL,	'inae9e21M2C8g'),
(2,	'Марк',	'Таратынов',	'taratynov',	'admin',	'ingP3pI3LX91.',	'',	'2023-02-21 17:55:59',	NULL,	''),
(3,	'Вася',	'Пупкин',	'manager1',	'manager',	'ingP3pI3LX91.',	'',	'2023-02-21 18:08:02',	NULL,	''),
(4,	'awsedfg',	'awsedf',	'ivanov-ii',	'qwe',	'inZtY5NaGmYb.',	'',	'2023-02-27 09:46:18',	'2023-02-27 12:11:28',	'injlFq8ohTAaE'),
(5,	'роман',	'романов',	'romanov-rr',	'manager',	'injY8GPhDQhbc',	'',	'2023-02-27 12:17:07',	'2023-02-27 12:17:57',	'inolYPzg05wTA'),
(6,	'roma',	'roma',	'rrr',	'admin',	'injY8GPhDQhbc',	'',	'2023-02-27 12:28:25',	'2023-02-27 12:29:40',	'in/cLAu/gYQIE');

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

INSERT INTO `brand` (`id`, `name`) VALUES
(1,	'Rolex'),
(2,	'Omega'),
(3,	'LIV'),
(4,	'Tissot');

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_product` int unsigned NOT NULL,
  `count` int unsigned NOT NULL,
  `date_cart` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_product` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

INSERT INTO `cart` (`id`, `id_user`, `id_product`, `count`, `date_cart`) VALUES
(2,	10,	2,	1,	'2023-02-25 14:37:40'),
(3,	10,	1,	1,	'2023-02-25 14:37:40'),
(5,	13,	1,	1,	'2023-02-25 14:51:07'),
(6,	13,	2,	1,	'2023-02-25 14:51:07');

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

INSERT INTO `category` (`id`, `category`, `image`) VALUES
(1,	'Мужские часы',	'img/shop-collection-card-1.webp'),
(2,	'Женские часы',	'img/shop-collection-card-2.jpeg'),
(3,	'Часы для спорта',	'img/shop-collection-card-3.webp'),
(4,	'Аксессуары',	'img/shop-collection-card-4.webp');

DROP TABLE IF EXISTS `color`;
CREATE TABLE `color` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `color` (`id`, `name`) VALUES
(1,	'золотой'),
(2,	'розовый'),
(3,	'серебрянный'),
(4,	'синий'),
(5,	'черный'),
(6,	'белый'),
(7,	'желтый'),
(8,	'зеленый'),
(9,	'коричневый'),
(10,	'разные цвета');

DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

INSERT INTO `gender` (`id`, `name`) VALUES
(1,	'мужской'),
(2,	'женский'),
(3,	'унисекс');

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(400) NOT NULL,
  `price` double unsigned NOT NULL,
  `quantity` smallint unsigned NOT NULL,
  `reserve` smallint unsigned NOT NULL,
  `sold` smallint unsigned NOT NULL,
  `rating` smallint unsigned NOT NULL,
  `image` varchar(255) NOT NULL,
  `date_goods` datetime NOT NULL,
  `category` tinyint unsigned NOT NULL,
  `brand` int NOT NULL,
  `gender` tinyint unsigned NOT NULL,
  `color` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `price_DESC` (`price`),
  KEY `price_ASC` (`price`),
  KEY `date_goods` (`date_goods`),
  KEY `category` (`category`),
  KEY `filter_brand` (`brand`),
  KEY `filter_gender` (`gender`),
  KEY `filter_color_body` (`color`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

INSERT INTO `goods` (`id`, `product_name`, `product_description`, `price`, `quantity`, `reserve`, `sold`, `rating`, `image`, `date_goods`, `category`, `brand`, `gender`, `color`) VALUES
(1,	'Oyster Perpetual',	'Часы линии Rolex Oyster Perpetual - это высочайшая хронометрическая точность, водонепроницаемость корпуса и автоматический подзавод механизма. Эти часы олицетворяют собой наручный хронометр в первозданном виде.',	110,	5,	0,	3,	0,	'img/watch_buy2.webp',	'2023-01-20 23:00:00',	2,	1,	2,	1),
(2,	'Oyster Nondate',	'Часы линии Rolex Oyster Nondate - это высочайшая хронометрическая точность, водонепроницаемость корпуса и автоматический подзавод механизма. Они стильные и модные.',	100,	10,	0,	4,	0,	'img/watch_buy3.webp',	'2023-01-20 23:00:01',	2,	1,	2,	2),
(3,	'Datejust Ref',	'Rolex Datejust Ref часы из нержавеющей стали с оригинальным циферблатом, классика среди часов',	300,	2,	0,	1,	0,	'img/watch_buy1.webp',	'2023-01-20 23:00:05',	1,	1,	1,	3),
(4,	'AXIAL MASTER',	'OMEGA AXIAL MASTER. Эта модель диаметром 43 мм изготовлена ​​из нержавеющей стали с серебристым циферблатом. Наряду с синим безелем из анодированного алюминия с тахиметрической шкалой, стрелки в форме листа и арабские цифры также вороненые, а под цифрами проходит уникальный «спиральный» рисунок дорожек.',	150,	1,	0,	5,	0,	'img/watch_buy4.png',	'2023-02-11 12:12:02',	1,	2,	1,	4),
(5,	'LumiNova',	'OMEGA LumiNova. Именно приключения и достижения астронавтов «Аполлона-8» вдохновили полностью черную керамическую модель часов. Модель представлена ​​на черном кожаном ремешке с прострочкой цвета экрю и раскладывающейся керамической застежкой.',	400,	3,	0,	3,	0,	'img/watch_buy5.png',	'2023-02-11 12:12:05',	3,	2,	1,	5),
(6,	'De Ville Ladymatic',	'OMEGA De Ville Ladymatic - стали определяющими часами в женской моде. Спустя шесть десятилетий он по-прежнему сохраняет каждую унцию чарующего стиля и изящества.',	110,	3,	0,	3,	0,	'img/watch_buy6.png',	'2023-02-11 15:11:27',	2,	2,	2,	6),
(8,	'REBEL DDC',	'Часы LIV REBEL DDC Classic Black оснащены многослойным черным циферблатом, швейцарским механизмом калибра Z60, хронографом с индикацией даты и дня недели, черным прямоугольным изогнутым корпусом из хирургической нержавеющей стали.',	400,	6,	0,	14,	2,	'img/watch_buy8.webp',	'2023-02-14 11:22:54',	1,	3,	1,	5),
(9,	'DIVER BLACKOUT',	'Часы LIV GX Diver Blackout диаметром 44 мм оснащены уникальным черным циферблатом, классом Elaboré, швейцарским автоматическим механизмом с 26 камнями, циклопическим увеличением даты, 42-часовым запасом хода, черным корпусом из хирургической нержавеющей стали.',	350,	2,	0,	15,	0,	'img/watch_buy9.webp',	'2023-02-14 11:09:04',	3,	3,	1,	5),
(10,	'PYTHON GREEN',	'Новая модель LIV PYTHON GREEN оснащена многослойным зеленым циферблатом, швейцарским механизмом калибра 5040.D, швейцарским хронографом с точностью до 1/10 секунды, рифленым безелем с винтами, серым IP-корпусом из нержавеющей стали.',	380,	1,	0,	0,	0,	'img/watch_buy10.webp',	'2023-02-14 11:01:39',	3,	3,	1,	8),
(11,	'PRX Chrono',	'Часы Tissot PRX Chrono, созданные для тех, кто ценит дизайн, и оснащенные функциями двадцать первого века в корпусе Tissot 1978 года выпуска, обязательно должны быть в списке желаний каждого любителя часов.',	390,	1,	0,	2,	0,	'img/watch_buy11.webp',	'2023-02-16 15:10:27',	1,	4,	1,	3),
(12,	'Supersport Chrono',	'Tissot Supersport Chrono имеет прямые линии и острые края с ярким дизайном, который придает корпусу 45,5 мм особую индивидуальность. Циферблат с массивными индексами, заполненными SuperLuminova® и асимметричными аппликациями, добавляет мощный 3D-эффект и обеспечивает читаемость в темных условиях.',	410,	0,	0,	15,	2,	'img/watch_buy12.webp',	'2023-02-16 15:11:27',	3,	4,	1,	9),
(13,	'Le Locle',	'Le Locle - это не только имя городка в швейцарских горах Юра, родины компании Tissot, но и название невероятно популярного семейства автоматических часов, которые отличаются изысканной элегантностью и такими непременными деталями, как римские цифры.',	360,	5,	0,	0,	8,	'img/watch_buy13.webp',	'2023-02-11 15:11:27',	1,	4,	1,	1),
(14,	'LOVELY',	'Tissot LOVELY - очаровательные часы, несмотря на небольшой размер корпуса круглой формы, являются настоящим олицетворением класса, роскоши и женственности. Это действительно прелестные часы, обладающие неотразимым шармом и полностью соответствующие своему названию.',	240,	7,	0,	0,	12,	'img/watch_buy14.webp',	'2023-02-17 17:11:27',	2,	4,	2,	1),
(15,	'LOVELY SUMMER',	'Созданные в честь миниатюрных женских часов Tissot 60-х годов, эти идеально сложенные часы высокого качества имеют стильный квадратный циферблат, толстое ограненное стекло, напоминающее бриллиант, и гладкий полированный и сатинированный корпус.',	190,	6,	0,	0,	18,	'img/watch_buy15.webp',	'2023-02-17 17:16:27',	2,	4,	2,	8),
(16,	'REBEL MONZA',	'Часы LIV REBEL-AR MONZA оснащены многослойным зеленым циферблатом с двойной гоночной полосой, классом Elaboré, швейцарским автоматическим механизмом на 26 камнях, дневным окном, 42-часовым запасом хода, прямоугольным изогнутым корпусом из нержавеющей стали 316L серого цвета IP хирургического класса. , устойчивое к царапинам и антибликовому сапфировому стеклу.',	320,	1,	0,	16,	2,	'img/watch_buy16.webp',	'2023-02-17 17:16:27',	1,	3,	1,	8),
(17,	'Blue Nosed',	'Часы LIV Модель LIV P-51 352nd Blue Nosed отличается плоским открытым синим циферблатом, швейцарским автоматическим механизмом ETA 7750 с 25 камнями, окошком дня и даты, запасом хода на 42 часа',	330,	1,	0,	0,	0,	'img/watch_buy17.webp',	'2023-02-17 17:16:27',	3,	3,	3,	4),
(18,	'T-Lady',	'T-Lady - ремешок для часов Tissot LOVELY SUMMER. Текстура ремешка - телячья кожа',	40,	7,	0,	0,	24,	'img/18.webp',	'2023-02-17 17:11:27',	4,	4,	2,	10),
(19,	'T-blue',	'Оригинальный силиконовый синий ремешок TISSOT 22 ММ',	20,	11,	0,	0,	32,	'img/19.webp',	'2023-02-17 17:11:27',	4,	4,	1,	4),
(20,	'WATCH STRAPS',	'Коричневый кожаный ремешок',	50,	11,	0,	0,	29,	'img/20.png',	'2023-02-17 17:11:27',	4,	2,	1,	9),
(21,	'OMEGA AQUA',	'Брелок Omega - нержавеющая сталь и белая резина',	95,	11,	0,	0,	15,	'img/21.png',	'2023-02-17 17:11:27',	4,	2,	3,	6),
(22,	'PRO SPRING BAR',	'Инструмент для смены ремешка, которым пользуются профессионалы LIV',	110,	11,	0,	0,	4,	'img/22.webp',	'2023-02-17 17:11:27',	4,	3,	3,	5);

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `store_id` tinyint DEFAULT NULL,
  `date_order` datetime NOT NULL,
  `comment` varchar(400) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date_update` datetime DEFAULT NULL,
  `manager` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `store_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `store_address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

INSERT INTO `stores` (`id`, `store_name`, `store_address`, `category`) VALUES
(1,	'Магазин1',	'Адрес магаза1',	'магазин'),
(2,	'Магазин2',	'Адрес пункта2',	'пункт'),
(3,	'Магазин3',	'Адрес магаза3',	'магазин'),
(4,	'Пункт4',	'Адрес пункта4',	'пункт'),
(5,	'Пункт5',	'Адрес пункта5',	'пункт');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_mail` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `date_registr` datetime DEFAULT NULL,
  `user_address` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_phone` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_hash` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

INSERT INTO `users` (`id`, `user_name`, `user_mail`, `password`, `date_registr`, `user_address`, `user_phone`, `user_hash`, `name`, `date_update`) VALUES
(8,	'chemezoida',	'evchemez@mail.ru',	'ingP3pI3LX91.',	NULL,	'asdfgh',	'ASDFG',	'inSKRBO1cW./s',	'asdrftgyhj',	'2023-02-22 08:09:42'),
(9,	'ghjgjhgj',	'asdfghj@',	'injY8GPhDQhbc',	'2023-02-21 08:32:41',	NULL,	NULL,	'',	NULL,	NULL),
(10,	'login',	'mail@',	'injY8GPhDQhbc',	'2023-02-21 08:33:51',	'qwert',	'qwert',	'',	'asdf',	'2023-02-21 09:39:52'),
(11,	'login2',	'ghgjhg@',	'injY8GPhDQhbc',	'2023-02-21 13:22:36',	NULL,	NULL,	'inqE.UWaknN7U',	NULL,	NULL),
(12,	'hfkjdhfkjhdf',	'dsgsadjfh@',	'injY8GPhDQhbc',	'2023-02-21 18:22:31',	NULL,	NULL,	'',	NULL,	NULL),
(13,	'vhvjbjn',	'ghgjhg2@',	'injY8GPhDQhbc',	'2023-02-25 14:50:53',	NULL,	NULL,	'in6Q71fNB8FOQ',	NULL,	NULL);

-- 2023-02-27 12:31:16
