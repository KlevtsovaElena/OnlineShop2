<?php
    //чтобы получить доступ из нашей странички
    header('Access-Control-Allow-Origin: *');

    require_once('../../classes/autoload.php');

    //создание объекта для подключения к БД
    $pdo = Connection::getConnection();

    //запишем корзину в новую переменную
    $cart['cart'] = $_POST['cart'];
   //а из массива post удалим
    unset($_POST['cart']);

    //шифруем пароль для записи в бд в зашифрованном виде
    if (isset($_POST['password'])) {
        $_POST['password'] = crypt($_POST['password'], 'inordic');
    }

    if (User::exists()){
        $response = [
            'success' => false,
            'error' => 'Такие Логин или Email уже используются!'
        ];
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        //останавливаем код
        exit(0);
    }

    //генерируем токен
    $token = crypt($_POST['user_name'] . $_POST['password'] . time(), 'inordic');

    $_POST['user_hash'] = $token;

    $_POST['date_registr'] = date('Y-m-d H:i:s');
        
    //создаём запись в БД
    User::createLine();
 
    //определяем id нового юзера
    $result = $pdo->query("SELECT id FROM `users` WHERE user_name = '" . $_POST['user_name'] ."';") ;
    $row = $result->fetch();
    $_POST['id'] = $row['id'];   
    
    //вернём данные корзины этого пользователя в массив post
    $_POST['cart'] = $cart['cart'];
    $_POST['date'] = date('Y-m-d H:i:s');

    //запишем корзину в таблицу cart
    Cart::recordCart();


    $response = [
        'success' => true,
        'token' => $token,
        'id' =>  $_POST['id']
    ];

    echo json_encode($response, JSON_UNESCAPED_UNICODE);










