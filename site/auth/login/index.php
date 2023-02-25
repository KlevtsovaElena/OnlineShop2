<?php

    //чтобы получить доступ из нашей странички
    header('Access-Control-Allow-Origin: *');

    require_once('../../classes/autoload.php');

    //создание объекта для подключения к БД
    $pdo = Connection::getConnection();

    $token = User::logIn();

    if ($token !== null) {
        $response = [
            'success' => true,
            'token' => $token
        ];
    } else {
        $response = [
            'success' => false,
            'error' => 'Неверный логин или пароль'
        ];
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE);