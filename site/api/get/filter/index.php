<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

//собираем массив из трёх таблиц
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


//отдаём собранные данные
echo json_encode($result, JSON_UNESCAPED_UNICODE);


