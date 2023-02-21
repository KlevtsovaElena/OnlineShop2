<?php

class Order extends \AbstractClasses\Unit
{
    const TABLE = 'orders';
   
    //функция добавления данных в users при оформлении заказа
    public static function userUpdate()
    {
       //заходим в базу 
       $pdo = \Connection::getConnection();
       $pdo->query("UPDATE users SET name = '" . $_POST['name'] . "', user_phone = '" . $_POST['user_phone'] . "', user_address = '" . $_POST['user_address'] . "', date_update = '" . $_POST['date'] . "' WHERE id = '" . $_POST['id'] . "'");
    }


    //функция добавления данных order
    public static function createOrder()
    {
        //заходим в базу 
        $pdo = \Connection::getConnection();
       $pdo->query("INSERT INTO orders (`user_id`, `status`, `date_order`) VALUES ('" . $_POST['id'] . "', 'Оформлен', '" . $_POST['date'] . "');") ;
    }

    //функция добавления данных корзины этого заказа
    public static function createOrderItems()
    {
      //заходим в базу 
      $pdo = \Connection::getConnection();
      //определяем id нашего заказа по id user и дате оформления заказа

       $result = $pdo->query("SELECT id FROM orders WHERE user_id = '" . $_POST['id'] . "' AND date_order = '" . $_POST['date'] . "';") ;

        $row = $result->fetch();
        $idOrder = $row['id'];

    }
    
}