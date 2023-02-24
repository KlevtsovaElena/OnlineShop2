//основной контейнер, куда будут отрисовываться все страницы.
const containerPage = document.getElementById('containerPage');
const templateCabinet = document.getElementById('tmpl-cabinet').innerHTML;
const templateLogin = document.getElementById('tmpl-login').innerHTML;

//функция отрисовки логин окна
function renderLogin() {
    containerPage.innerHTML = templateLogin;
    const signInBtn = document.querySelector('.signin-btn');
    const signUpBtn = document.querySelector('.signup-btn');
    const formBox = document.querySelector('.form-box');
    const mainBlock = document.querySelector('.mainBlock');

    signUpBtn.addEventListener('click', function(){
        formBox.classList.add('active');
        mainBlock.classList.add('active');
    });
    
    signInBtn.addEventListener('click', function(){
        formBox.classList.remove('active');
        mainBlock.classList.remove('active');
    });
    document.querySelector('.form_signin')
            .querySelector('button')
            .onclick = function() {
                userAuthorization()
            };

}

renderLogin(); 


function userAuthorization() {
    //предотвратить дефолтные действия, отмена отправки формы
    event.preventDefault(); 

    //контейнер для инфы пользователю
    let info_auth = event.target.closest('form').querySelector(".info-form");

    //найти все инпуты и получить данные из каждого
    let inputs = event.target.closest('form').querySelectorAll('input');
    console.log(inputs);

    let login = inputs[0];
    let password = inputs[1];

console.log(login.value);
console.log(password.value);
    
    login.oninput = function(){
        login.classList.remove("input-debug");
        info_auth.innerHTML = "";
    }
    password.oninput = function(){
        password.classList.remove("input-debug");
        info_auth.innerHTML = "";
    }

    //проверяем поля на пустоту
    if(login.value == "") {
        info_auth.innerHTML = "Логин не может быть пустым!";
        login.classList.add("input-debug");
        return;
    }
    if(password.value == "") {
        info_auth.innerHTML = "Пароль не может быть пустым!";
        password.classList.add("input-debug");
        return;
    }


    //подставить в запрос и отправить
    let params = "login=" + login.value + "&password=" + password.value;
    url = "http://localhost/authadmin/login/";
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    requestObj.send(params);

    
    //получаем ответ
    let json = requestObj.response;
    let data = JSON.parse(json);

    //проверяем ответ
    //если пользователь не найден или логин/пароль не совпадают, то вернётся  {'success': false, 'error': 'Неверный логин или пароль!'}
    //выведем пользователю
    if(!data['success']) {
        info_auth.innerHTML = data['error'];
        return;
    }

    //если пользователь найден и логин/пароль верны
    //получим токен, запишем в куки с временем жизни 1 час
    if(data['success']) {
        document.cookie = "admin=" + data['token'] + "; max-age=3600";
    }


    data = check();
    console.log(data);
    //рисуем личный кабинет
    renderCabinet(data);
}



function check() {
    console.log("check()");
    //берём токен из куки
    const cookie = document.cookie.match(/admin=(.+?)(;|$)/);

    //если токена нет выходим из функции и возвращаем false
    if (cookie == null || cookie == undefined || cookie == ""){
        return {'success' : false};
    }

    //если токен есть , то передаём его на сервер
    let params = "token=" + cookie[1];

    //подставить в запрос и отправить

    url = "http://localhost/authadmin/check/";
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    requestObj.send(params);
    
    //получаем ответ 'success': false/true, user
    let json = requestObj.response;
    let data = JSON.parse(json);

    return data;




}


function logOut() {
    //берём токен из куки
    const cookie = document.cookie.match(/admin=(.+?)(;|$)/);

    //если токена нет, то рисуем форму Авторизации и выходим из функции
    if (cookie == null || cookie == undefined || cookie == ""){
        renderLogin();
        return;
    }

    //если токен есть , то передаём его на сервер
    let params = "token=" + cookie[1];

    //отправляем запрос на сервер
    url = "http://localhost/authadmin/logout/";
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    requestObj.send(params);

    //удаляем токен из куки
    document.cookie = "user=''; max-age=-1";

    //рисуем форму авторизации
    renderLogin();
}


function renderCabinet(data) {

    containerPage.innerHTML = "";

    containerPage.innerHTML += templateCabinet.replace('${first_name}', data['admin']['first_name'])
                                    .replace('${last_name}', data['admin']['last_name'])
                                    .replace('${role}', data['admin']['role']);   



//     clearPage();

//     let orders = "";



// //отправляем запрос на сервер
//  //если токен есть , то передаём его на сервер

//  //получаем данные одного товара по id
//  let json = sendRequestGET('http://localhost/api/get/order/?user_id=' + data['user']['id']);
//  //раскодируем данные
//  let dataOrder = JSON.parse(json);
//  console.log(dataOrder);



// for (let i = 0; i < dataOrder.length; i++){
//     console.log(dataOrder[i]['order_id']);
//     orders += "Заказ № " + dataOrder[i]['order_id'] + " Статус: " + dataOrder[i]['status'];
//     for(let j = 0; j < dataOrder[i]['order_items'].length; j++){
//         orders += dataOrder[i]['order_items'][j]['product_name'] + "  -  " + 
//                 dataOrder[i]['order_items'][j]['count'] + " - " + 
//                 (dataOrder[i]['order_items'][j]['count']*dataOrder[i]['order_items'][j]['price']);
         
//     }
// }

//     containerPage.innerHTML += templateCabinet.replace('${user_name}', data['user']['user_name'])
//                                                 .replace('${user_mail}', data['user']['user_mail'])
//                                                 .replace('${id}', data['user']['id'])
//                                                 .replace('${orders}', orders);

}