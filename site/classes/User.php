<?php



final class User extends AbstractClasses\Unit
{

    use Traits\IdTrait;

    const TABLE = 'users';

    public function username() : string
    {
        return $this->getField('username');
    }


    //авторизация пользователя
    final public static function logIn() 
    {
         //получаем логин и смотрим есть ли юзер с таким логин или мейл
        $login = $_POST['user_name'];
        $password = $_POST['password'];

        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT * FROM users WHERE user_name = '$login' OR user_mail = '$login'");
        $row = $result->fetch();

        //если нет, то возвращаем null
        if (!isset($row['id'])) {
            return null;
        }

        //если есть, то начинаем проверять пароль
        //если пароль неверный, то возвращаем null
        if (!hash_equals($row['password'], crypt($password, 'inordic'))) {
            return null;
        }

        //если пароль верный, то 
        //генерируем токен
        $token = crypt($row['id'] . $row['password'] . time(), 'inordic');

        //записываем токен в базу
        $pdo->query("UPDATE users SET user_hash = '$token' WHERE id = " . $row['id']);
        
        //возвращаем token
        return $token;
    }


    //функция проверки существования пользователя в базе по логину или мейлу
    public static function exists() : bool{

        //получаем данные
        $username = $_POST['user_name'];
        $email = $_POST['user_mail'];  

        //заходим в базу и считаем сколько у нас юзеров с таким логином и паролем
        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT COUNT(id) as num FROM users WHERE user_name ='$username' OR user_mail = '$email'");
        $row = $result->fetch();


        //возвращаем ответ в зависимости от цифры (0 или 1).
        if($row['num'] > 0) {
            return true;
        } 
        

        return false;
            //return(bool) $row['num']
    }


    //функция проверки токенов
    public static function check() 
    {

        //заходим в базу 
        $pdo = \Connection::getConnection();
        $result = $pdo->query("SELECT id, user_name, user_mail FROM users WHERE user_hash = '" . $_POST['token'] . "'");
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
        //заходим в базу 
        $pdo = \Connection::getConnection();
        $pdo->query("UPDATE users SET user_hash = '' WHERE user_hash = '" . $_POST['token'] . "'");

    }
}