<?php

    //чтобы получить доступ из нашей странички
    header('Access-Control-Allow-Origin: *');

    require_once('../../classes/autoload.php');

    //создание объекта для подключения к БД
    $pdo = Connection::getConnection();

    $user = User::check();

    if (!$user) {
        $response = [
            'success' => false
        ];
    } else {
        $response = [
            'success' => true,
            'user' => $user
        ];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);