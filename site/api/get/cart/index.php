<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

//отдаём корзину пользователя
echo json_encode(Cart::getLines(), JSON_UNESCAPED_UNICODE);