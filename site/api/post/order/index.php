<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

$_POST['date'] = date('Y-m-d H:i:s');

// Order::userUpdate();

// Order::createOrder();

Order::createOrderItems();
