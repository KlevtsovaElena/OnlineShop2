<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

$result = [Brand::getLines(), Color::getLines(), Gender::getLines()];

echo json_encode($result, JSON_UNESCAPED_UNICODE);


