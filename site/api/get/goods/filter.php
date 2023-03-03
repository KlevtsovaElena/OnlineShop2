<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();


//если получен запрос на поиск search, то отдаём результат функции search()
//иначе, отдаём товары по указанным параментрам
Good::filterGoods();


 
 