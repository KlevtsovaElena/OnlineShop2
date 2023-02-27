<?php



final class Admin extends AbstractClasses\Unit
{

    use Traits\IdTrait;

    const TABLE = 'admin';


    //авторизация 
    final public static function logIn() 
    {
         //получаем логин и смотрим есть ли юзер с таким логин
        $login = $_POST['login'];
        $password = $_POST['password'];

        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT * FROM `admin` WHERE login = '$login';");
        $row = $result->fetch();

        //если нет, то возвращаем null
        if (!isset($row['id'])) {
            return null;
        }

        //если есть, то начинаем проверять пароль
        //если пароль неверный, то возвращаем null
        if ($row['password'] == NULL) {
            return null;
        }
        if (!hash_equals($row['password'], crypt($password, 'inordic'))) {
            return null;
        }

        //если пароль верный, то 
        //генерируем токен
        $token = crypt($row['id'] . $row['password'] . time(), 'inordic');

        //записываем токен в базу
        $pdo->query("UPDATE `admin` SET token = '$token' WHERE id = " . $row['id']);
        
        //возвращаем token
        return $token;
    }


    //функция проверки существования пользователя в базе по логину
    public static function exists() : bool{

        //получаем данные
        $login = $_POST['login'];


        //заходим в базу и считаем сколько у нас юзеров с таким логином и паролем
        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT COUNT(id) as num FROM admin WHERE login ='$login';");
        $row = $result->fetch();


        //возвращаем ответ в зависимости от цифры (0 или 1).
        if($row['num'] > 0) {
            return true;
        } 
        

        return false;

    }


    //функция проверки токенов
    public static function check() {

        //заходим в базу 
        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT id, first_name, last_name, login, role FROM admin WHERE token = '" . $_POST['token'] . "'");
        $row = $result->fetch();

        //возвращаем ответ в зависимости от цифры (0 или 1).
        if(count($row) == 0) {
            return false;
        } 

        return $row;
    }

    
    //функция разлогинивания
    public static function logOut()
    {
        //находим в базе admin переданный js токен и очищаем его
        $pdo = \Connection::getConnection();
        $pdo->query("UPDATE admin SET token = '' WHERE token = '" . $_POST['token'] . "'");

    }


    //функция смены временного пароля на новый
    public static function changeTempPass() {

        $login = $_POST['login'];
        $temp_password = $_POST['temp_password'];

        //заходим в базу 
        $pdo = \Connection::getConnection();

        //проверка существования логина
        $result = $pdo->query("SELECT * FROM `admin` WHERE login = '$login';");
        $row = $result->fetch();

        //если нет, то возвращаем null
        if (!isset($row['id'])) {
            return null;
        }

        //проверка существования temp_password в базе
        if ($row['temp_password'] == '' || $row['temp_password'] == NULL) {
            return null;
        }
        
        //соотвествие логина + временного пароля
        if (!hash_equals($row['temp_password'], crypt($temp_password, 'inordic'))) {
            return null;
        }

        //шифруем пароль
        if (isset($_POST['password'])) {
            $_POST['password'] = crypt($_POST['password'], 'inordic');
        }

        //формируем token
         $token = crypt($_POST['login'] . $_POST['password'] . time(), 'inordic');

        //записываем token и password в базу
        $_POST['token'] = $token;
        $_POST['date_update'] = date('Y-m-d H:i:s');

        $sqlText = "UPDATE `admin` SET token = '$token', password = '" . $_POST['password'] . "' , temp_password = '', 
                    date_update = '" . $_POST['date_update'] . "' WHERE login = '$login';";

        $pdo->query($sqlText);

        return $token;
    }
}