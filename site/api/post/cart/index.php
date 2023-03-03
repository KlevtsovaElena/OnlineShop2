<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

//добавим дату в передаваемые данные
$_POST['date'] = date('Y-m-d H:i:s');

//обновляем корзинц пользователя
Cart::deleteCart();
Cart::recordCart();