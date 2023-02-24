<?php

class Order extends \AbstractClasses\Unit
{
    const TABLE = 'orders';
   
    //функция добавления данных в users и goods при оформлении заказа
    public static function userUpdate()
    {
       //заходим в базу 
       $pdo = \Connection::getConnection();

       $pdo->query("UPDATE users SET name = '" . $_POST['name'] . "', user_phone = '" . $_POST['user_phone'] 
                    . "', user_address = '" . $_POST['user_address'] . "', date_update = '" . $_POST['date'] . "' WHERE id = '" . $_POST['id'] . "'");
    
    
    }


    //функция добавления данных order
    public static function createOrder() 
    {
        //заходим в базу 
        $pdo = \Connection::getConnection();

       $pdo->query("INSERT INTO orders (`user_id`, `status`, `date_order`) VALUES ('" . $_POST['id'] . "', 'Оформлен', '" . $_POST['date'] . "');") ;
    }

    //функция добавления данных корзины этого заказа
    public static function createOrderItems() : mixed
    {
         
        $pdo = \Connection::getConnection();

        //определяем id нашего заказа по id user и дате оформления заказа

        $result = $pdo->query("SELECT id FROM orders WHERE user_id = '" . $_POST['id'] . "' AND date_order = '" . $_POST['date'] . "';") ;

        $row = $result->fetch();
        $idOrder = $row['id'];



        //декодируем данные корзины, чтобы получить массив
        $result = json_decode($_POST['cart'], true);

        //теперь зепишем через цикл полученные данные корзины пользователя в таблицу  Cart и отредактируем поле resrve в таблице goods


        for ($i = 0; $i < count($result); $i++){
            $sqlText = "INSERT INTO `order_item` (`order_id`, `user_id`, `product_id`, `count`) 
                        VALUES($idOrder, '". $_POST['id'] . "', '".$result[$i]['id_product'] . "', '" . $result[$i]['count'] . "');";

            $pdo->query($sqlText);
            $sqlText = "UPDATE goods SET reserve = (reserve +" . $result[$i]['count'] . ") WHERE id = '" . $result[$i]['id_product'] . "';";
            $pdo->query($sqlText);
        }
        //теперь удалим данные корзины пользователя из таблицы cart

            $sqlText = "DELETE FROM `cart` WHERE id_user = '" . $_POST['id'] . "';";

            $pdo->query($sqlText);
            return $idOrder;
        } 


    }

    
    
