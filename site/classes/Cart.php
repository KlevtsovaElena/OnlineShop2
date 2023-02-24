<?php

class Cart extends \AbstractClasses\Unit
{
    const TABLE = 'cart';
 

       //функция добавления данных корзины этого заказа
       public static function updateCart()
       {
            
           $pdo = \Connection::getConnection();   
   
   
           //декодируем данные корзины, чтобы получить массив
           $result = json_decode($_POST['cart'], true);

           //теперь удалим данные корзины пользователя из таблицы cart
           $sqlText = "DELETE FROM `cart` WHERE id_user = '" . $_POST['id'] . "';";
   
           $pdo->query($sqlText);

   
           //теперь запишем через цикл полученные данные корзины пользователя в таблицу 
   
   
           for ($i = 0; $i < count($result); $i++){
            echo $i;
               $sqlText = "INSERT INTO `cart` (`id_user`, `id_product`, `count`, `date_cart`) 
                           VALUES('" . $_POST['id'] ."', '". $result[$i]['id_product'] . "', '" . $result[$i]['count'] . "', '" . $_POST['date'] . "');";
               $pdo->query($sqlText);
           }
        }
           
}