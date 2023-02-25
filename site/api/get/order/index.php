<?php
//чтобы получить доступ из нашей странички
header('Access-Control-Allow-Origin: *');

require_once('../../../classes/autoload.php');

//создание объекта для подключения к БД
$pdo = Connection::getConnection();

//найдём все заказы пользователя по id
$order = Order::getLines();

$orderItem = [];
$response = [];
$goods = [];

//для каждого найденного заказа соберём данные
for ($i = 0; $i<count($order); $i++) {

    //отправим запрос на получение заказанных товаров по id юзера и id заказа
    $_GET['order_id'] = $order[$i]['id'];
    //получаем ВСЕ товары конкретного заказа
    $orderItem = Orderitems::getLines(); 


    //теперь нам нужно из таблицы товаров выцепить цену и название конкретного товара по его id
    for($j = 0; $j < count($orderItem); $j++) {

        $sqlText = "SELECT product_name, price FROM `goods` WHERE id = " . $orderItem[$j]['product_id'] . ";";
        $good = $pdo->query($sqlText);
        $good = $good->fetch();
        //собираем данные по конкретному товару
        $goods[] = [
                    'order_id' => $orderItem[$j]['order_id'],
                    'product_id' => $orderItem[$j]['product_id'],
                    'count' => $orderItem[$j]['count'],
                    'product_name' => $good['product_name'],
                    'price' => $good['price']
        ];
    }


    //теперь собираем данные по конкретному заказу
    $response[] = [

                'user_id' => $_GET['user_id'],
                'status' => $order[$i]['status'],
                'order_id' => $order[$i]['id'],
                'order_items' => $goods 
         
    ];
    $orderItem = [];
    $goods = [];
}   

//отдаём данные по всем заказам в собранном виде 
echo json_encode($response, JSON_UNESCAPED_UNICODE);