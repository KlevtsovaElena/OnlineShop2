<?php

    //чтобы получить доступ из нашей странички
    header('Access-Control-Allow-Origin: *');

    require_once('../../classes/autoload.php');

    //создание объекта для подключения к БД
    $pdo = Connection::getConnection();

    $result = Admin::changeTempPass();

    if ($result == null) {
        $response = [
            'success' => false,
            'error' => 'Неверный логин или пароль!'
        ];
    } else {
        $response = [
            'success' => true,
            'token' => $result
        ];
    }


    echo json_encode($response, JSON_UNESCAPED_UNICODE);