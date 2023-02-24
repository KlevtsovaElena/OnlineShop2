<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

$_POST['date'] = date('Y-m-d H:i:s');

Order::userUpdate();

Order::createOrder();

$idOrder = Order::createOrderItems();


$text = 'Новый заказ ' . $idOrder ."%0D%0A" . $_POST['name'] . "%0D%0A" . $_POST['user_phone'] . "%0D%0A" . $_POST['user_address'];

$url = 'https://api.telegram.org/bot5762215975:AAFTUVjFrf4pwSEQakOTE-RpYusGBWNZe5U/sendMessage?chat_id=1752911328&text=' . $text;
file_get_contents($url);


