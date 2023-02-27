<?php

    //чтобы получить доступ из нашей странички
    header('Access-Control-Allow-Origin: *');

    require_once('../../classes/autoload.php');

    //создание объекта для подключения к БД
    $pdo = Connection::getConnection();

    echo $_POST['first_name'] . " - " . $_POST['last_name'] . " - " . $_POST['login'] . " - " . $_POST['role'] . " - " . $_POST['temp_password'];

    $temp_password = $_POST['temp_password'];


     //шифруем пароль для записи в бд в зашифрованном виде
     if (isset($_POST['temp_password'])) {
        $_POST['temp_password'] = crypt($_POST['temp_password'], 'inordic');
    }

    if (Admin::exists()){
        $response = [
            'success' => false,
            'error' => 'Такой Логин уже используется!'
        ];
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        //останавливаем код
        exit(0);
    }

    $_POST['date_registr'] = date('Y-m-d H:i:s');
    
    //создаём запись в БД
    Admin::createLine();


    $response = [
        'success' => true,
        'pass' => $_POST['temp_password']
    ];

    //соберём текст, который отправим в телеграм-бота, как уведомление о новом заказе
$text = 'login: ' . $_POST['login'] ."%0D%0A" . 'временный пароль: ' . $temp_password;


$url = 'https://api.telegram.org/bot5762215975:AAFTUVjFrf4pwSEQakOTE-RpYusGBWNZe5U/sendMessage?chat_id=1752911328&text=' . $text;
file_get_contents($url);

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

   