<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

$result = [
                [
                    'filter' => 'Бренд',
                    'table' => 'brand',
                    'filter-item' => Brand::getLines()
                ],
                [
                    'filter' => 'Цвет',
                    'table' => 'color',
                    'filter-item' => Color::getLines()
                ],
                [
                    'filter' => 'Пол',
                    'table' => 'gender',
                    'filter-item' => Gender::getLines()
                ]
            ];    

echo json_encode($result, JSON_UNESCAPED_UNICODE);


