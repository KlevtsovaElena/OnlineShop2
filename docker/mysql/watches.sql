-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name_table` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

INSERT INTO `brand` (`id`, `name`, `name_table`) VALUES
(1,	'Rolex',	'Brand'),
(2,	'Omega',	'Brand'),
(3,	'LIV',	'Brand'),
(4,	'Tissot',	'Brand');

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_product` int unsigned NOT NULL,
  `quantity` int unsigned NOT NULL,
  `date_cart` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `color`;
CREATE TABLE `color` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name_table` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `color` (`id`, `name`, `name_table`) VALUES
(1,	'золотой',	'Color'),
(2,	'розовый',	'Color'),
(3,	'серебрянный',	'Color'),
(4,	'синий',	'Color'),
(5,	'черный',	'Color'),
(6,	'белый',	'Color'),
(7,	'желтый',	'Color'),
(8,	'зеленый',	'Color'),
(9,	'коричневый',	'Color'),
(10,	'разные цвета',	'Color');

DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name_table` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

INSERT INTO `gender` (`id`, `name`, `name_table`) VALUES
(1,	'мужской',	'Gender'),
(2,	'женский',	'Gender'),
(3,	'унисекс',	'Gender');

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
  `filter_style` tinyint unsigned NOT NULL,
  `filter_numbers` tinyint unsigned NOT NULL,
  `color` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `price_DESC` (`price`),
  KEY `price_ASC` (`price`),
  KEY `date_goods` (`date_goods`),
  KEY `category` (`category`),
  KEY `filter_brand` (`brand`),
  KEY `filter_gender` (`gender`),
  KEY `filter_style` (`filter_style`),
  KEY `filter_numbers` (`filter_numbers`),
  KEY `filter_color_body` (`color`),
  CONSTRAINT `goods_ibfk_1` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

INSERT INTO `goods` (`id`, `product_name`, `product_description`, `price`, `quantity`, `reserve`, `sold`, `rating`, `image`, `date_goods`, `category`, `brand`, `gender`, `filter_style`, `filter_numbers`, `color`) VALUES
(1,	'Oyster Perpetual',	'Часы линии Rolex Oyster Perpetual - это высочайшая хронометрическая точность, водонепроницаемость корпуса и автоматический подзавод механизма. Эти часы олицетворяют собой наручный хронометр в первозданном виде.',	110,	5,	0,	3,	0,	'img/watch_buy2.webp',	'2023-01-20 23:00:00',	2,	1,	2,	0,	0,	1),
(2,	'Oyster Nondate',	'Часы линии Rolex Oyster Nondate - это высочайшая хронометрическая точность, водонепроницаемость корпуса и автоматический подзавод механизма. Они стильные и модные.',	100,	10,	0,	4,	0,	'img/watch_buy3.webp',	'2023-01-20 23:00:01',	2,	1,	2,	0,	0,	2),
(3,	'Datejust Ref',	'Rolex Datejust Ref часы из нержавеющей стали с оригинальным циферблатом, классика среди часов',	300,	2,	0,	1,	0,	'img/watch_buy1.webp',	'2023-01-20 23:00:05',	1,	1,	1,	0,	0,	3),
(4,	'AXIAL MASTER',	'OMEGA AXIAL MASTER. Эта модель диаметром 43 мм изготовлена ​​из нержавеющей стали с серебристым циферблатом. Наряду с синим безелем из анодированного алюминия с тахиметрической шкалой, стрелки в форме листа и арабские цифры также вороненые, а под цифрами проходит уникальный «спиральный» рисунок дорожек.',	150,	1,	0,	5,	0,	'img/watch_buy4.png',	'2023-02-11 12:12:02',	1,	2,	1,	0,	0,	4),
(5,	'LumiNova',	'OMEGA LumiNova. Именно приключения и достижения астронавтов «Аполлона-8» вдохновили полностью черную керамическую модель часов. Модель представлена ​​на черном кожаном ремешке с прострочкой цвета экрю и раскладывающейся керамической застежкой.',	400,	3,	0,	3,	0,	'img/watch_buy5.png',	'2023-02-11 12:12:05',	3,	2,	1,	0,	0,	5),
(6,	'De Ville Ladymatic',	'OMEGA De Ville Ladymatic - стали определяющими часами в женской моде. Спустя шесть десятилетий он по-прежнему сохраняет каждую унцию чарующего стиля и изящества.',	110,	3,	0,	3,	0,	'img/watch_buy6.png',	'2023-02-11 15:11:27',	2,	2,	2,	0,	0,	6),
(7,	'Lady Tresor',	'OMEGA Lady Tresor - изысканная версия самой современной женской коллекции OMEGA. Благодаря своим компактным размерам и динамичному стилю он действительно привлекает внимание на запястье.',	130,	2,	0,	5,	0,	'img/watch_buy7.png',	'2023-02-11 15:11:27',	2,	2,	2,	0,	0,	4),
(8,	'REBEL DDC',	'Часы LIV REBEL DDC Classic Black оснащены многослойным черным циферблатом, швейцарским механизмом калибра Z60, хронографом с индикацией даты и дня недели, черным прямоугольным изогнутым корпусом из хирургической нержавеющей стали.',	400,	6,	0,	14,	2,	'img/watch_buy8.webp',	'2023-02-14 11:22:54',	1,	3,	1,	0,	0,	5),
(9,	'DIVER BLACKOUT',	'Часы LIV GX Diver Blackout диаметром 44 мм оснащены уникальным черным циферблатом, классом Elaboré, швейцарским автоматическим механизмом с 26 камнями, циклопическим увеличением даты, 42-часовым запасом хода, черным корпусом из хирургической нержавеющей стали.',	350,	2,	0,	15,	0,	'img/watch_buy9.webp',	'2023-02-14 11:09:04',	3,	3,	1,	0,	0,	5),
(10,	'PYTHON GREEN',	'Новая модель LIV PYTHON GREEN оснащена многослойным зеленым циферблатом, швейцарским механизмом калибра 5040.D, швейцарским хронографом с точностью до 1/10 секунды, рифленым безелем с винтами, серым IP-корпусом из нержавеющей стали.',	380,	1,	0,	0,	0,	'img/watch_buy10.webp',	'2023-02-14 11:01:39',	3,	3,	1,	0,	0,	8),
(11,	'PRX Chrono',	'Часы Tissot PRX Chrono, созданные для тех, кто ценит дизайн, и оснащенные функциями двадцать первого века в корпусе Tissot 1978 года выпуска, обязательно должны быть в списке желаний каждого любителя часов.',	390,	1,	0,	2,	0,	'img/watch_buy11.webp',	'2023-02-16 15:10:27',	1,	4,	1,	0,	0,	3),
(12,	'Supersport Chrono',	'Tissot Supersport Chrono имеет прямые линии и острые края с ярким дизайном, который придает корпусу 45,5 мм особую индивидуальность. Циферблат с массивными индексами, заполненными SuperLuminova® и асимметричными аппликациями, добавляет мощный 3D-эффект и обеспечивает читаемость в темных условиях.',	410,	0,	0,	15,	2,	'img/watch_buy12.webp',	'2023-02-16 15:11:27',	3,	4,	1,	0,	0,	9),
(13,	'Le Locle',	'Le Locle - это не только имя городка в швейцарских горах Юра, родины компании Tissot, но и название невероятно популярного семейства автоматических часов, которые отличаются изысканной элегантностью и такими непременными деталями, как римские цифры.',	360,	5,	0,	0,	8,	'img/watch_buy13.webp',	'2023-02-11 15:11:27',	1,	4,	1,	0,	0,	1),
(14,	'LOVELY',	'Tissot LOVELY - очаровательные часы, несмотря на небольшой размер корпуса круглой формы, являются настоящим олицетворением класса, роскоши и женственности. Это действительно прелестные часы, обладающие неотразимым шармом и полностью соответствующие своему названию.',	240,	7,	0,	0,	12,	'img/watch_buy14.webp',	'2023-02-17 17:11:27',	2,	4,	2,	0,	0,	1),
(15,	'LOVELY SUMMER',	'Созданные в честь миниатюрных женских часов Tissot 60-х годов, эти идеально сложенные часы высокого качества имеют стильный квадратный циферблат, толстое ограненное стекло, напоминающее бриллиант, и гладкий полированный и сатинированный корпус.',	190,	6,	0,	0,	18,	'img/watch_buy15.webp',	'2023-02-17 17:16:27',	2,	4,	2,	0,	0,	8),
(16,	'REBEL MONZA',	'Часы LIV REBEL-AR MONZA оснащены многослойным зеленым циферблатом с двойной гоночной полосой, классом Elaboré, швейцарским автоматическим механизмом на 26 камнях, дневным окном, 42-часовым запасом хода, прямоугольным изогнутым корпусом из нержавеющей стали 316L серого цвета IP хирургического класса. , устойчивое к царапинам и антибликовому сапфировому стеклу.',	320,	1,	0,	16,	2,	'img/watch_buy16.webp',	'2023-02-17 17:16:27',	1,	3,	1,	0,	0,	8),
(17,	'Blue Nosed',	'Часы LIV Модель LIV P-51 352nd Blue Nosed отличается плоским открытым синим циферблатом, швейцарским автоматическим механизмом ETA 7750 с 25 камнями, окошком дня и даты, запасом хода на 42 часа',	330,	1,	0,	0,	0,	'img/watch_buy17.webp',	'2023-02-17 17:16:27',	3,	3,	3,	0,	0,	4),
(18,	'T-Lady',	'T-Lady - ремешок для часов Tissot LOVELY SUMMER. Текстура ремешка - телячья кожа',	40,	7,	0,	0,	24,	'img/18.webp',	'2023-02-17 17:11:27',	4,	4,	2,	0,	0,	10),
(19,	'T-blue',	'Оригинальный силиконовый синий ремешок TISSOT 22 ММ',	20,	11,	0,	0,	32,	'img/19.webp',	'2023-02-17 17:11:27',	4,	4,	1,	0,	0,	4),
(20,	'WATCH STRAPS',	'Коричневый кожаный ремешок',	50,	11,	0,	0,	29,	'img/20.png',	'2023-02-17 17:11:27',	4,	2,	1,	0,	0,	9),
(21,	'OMEGA AQUA',	'Брелок Omega - нержавеющая сталь и белая резина',	95,	11,	0,	0,	15,	'img/21.png',	'2023-02-17 17:11:27',	4,	2,	3,	0,	0,	6),
(22,	'PRO SPRING BAR',	'Инструмент для смены ремешка, которым пользуются профессионалы LIV',	110,	11,	0,	0,	4,	'img/22.webp',	'2023-02-17 17:11:27',	4,	3,	3,	0,	0,	5);

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `store_id` tinyint NOT NULL,
  `date_order` date NOT NULL,
  `comment_user` varchar(400) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `Store_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Store_adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

INSERT INTO `stores` (`id`, `Store_name`, `Store_adress`) VALUES
(1,	'Магазин1',	'Адрес магаза1'),
(2,	'Магазин2',	'Адрес магаза2'),
(3,	'Магазин3',	'Адрес магаза3');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_mail` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `date_registr` datetime DEFAULT NULL,
  `user_adress` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_phone` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `user_hash` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

INSERT INTO `users` (`id`, `user_name`, `user_mail`, `password`, `date_registr`, `user_adress`, `user_phone`, `user_hash`) VALUES
(3,	'12345',	'125@mail.ru',	'injY8GPhDQhbc',	NULL,	NULL,	NULL,	NULL),
(4,	'ghfjhgjdf',	'test@mail.ru',	'in.wszNcJxmb2',	NULL,	NULL,	NULL,	NULL),
(5,	'chemezoida',	'evcheme@mail.ru',	'injY8GPhDQhbc',	NULL,	NULL,	NULL,	NULL),
(6,	'test',	NULL,	'injY8GPhDQhbc',	NULL,	NULL,	NULL,	''),
(7,	'chemezoida2',	'evc@mail.ru',	'injY8GPhDQhbc',	NULL,	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `сategory`;
CREATE TABLE `сategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `сategory` (`id`, `name_category`) VALUES
(1,	'Мужские часы'),
(2,	'Женские часы'),
(3,	'Часы для спорта'),
(4,	'Аксессуары');

-- 2023-02-19 14:52:09
