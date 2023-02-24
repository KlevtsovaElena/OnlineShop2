<?php

    //чтобы получить доступ из нашей странички
    header('Access-Control-Allow-Origin: *');

    require_once('../../classes/autoload.php');

    //создание объекта для подключения к БД
    $pdo = Connection::getConnection();

    $admin = Admin::check();

    if (!$admin) {
        $response = [
            'success' => false
            //'error' => 'юзер не авторизован'
        ];
    } else {
        $response = [
            'success' => true,
            'admin' => $admin
        ];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);