//основной контейнер, куда будут отрисовываться все страницы.
const containerPage = document.getElementById('containerPage');
const templateCabinet = document.getElementById('tmpl-cabinet').innerHTML;
const templateLogin = document.getElementById('tmpl-login').innerHTML;



//функция для отправки запросов GET
function sendRequestGET(url){

    let requestObj = new XMLHttpRequest();
    requestObj.open('GET', url, false);
    requestObj.send();
    return requestObj.responseText;
}



//функция для отправки запросов POST
function sendRequestPOST(url, params){

    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    requestObj.send(params);
    return requestObj.responseText;

}


check();


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
                managerAuthorization()
            };

}




function managerAuthorization() {
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
    
    //получаем ответ
    let json = sendRequestPOST("http://localhost/authadmin/login/", params);
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
        renderLogin();
        return {'success' : false};
    }

    //если токен есть , то передаём его на сервер
    let params = "token=" + cookie[1];

    //подставить в запрос и отправить
    let json = sendRequestPOST("http://localhost/authadmin/check/", params);
    
    //получаем ответ 'success': false/true, admin
    let data = JSON.parse(json);

    renderCabinet(data);
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
    sendRequestPOST("http://localhost/authadmin/logout/", params);

    //удаляем токен из куки
    document.cookie = "admin=''; max-age=-1";

    //рисуем форму авторизации
    renderLogin();
}


function renderCabinet(data) {

    containerPage.innerHTML = "";

    containerPage.innerHTML += templateCabinet.replace('${first_name}', data['admin']['first_name'])
                                    .replace('${last_name}', data['admin']['last_name'])
                                    .replace('${role}', data['admin']['role']);   

}

function addAccount() {
    //предотвратить дефолтные действия, отмена отправки формы
    event.preventDefault(); 

     //найти все инпуты и получить данные из каждого
     let inputs = event.target.closest('form').querySelectorAll('input');

 
     let first_name = inputs[0];
     let last_name = inputs[1];
     let login = inputs[2];
     let role = inputs[3];
     let password = Math.random().toString(36).slice(-8);
    
 
 console.log(first_name.value);
 console.log(last_name.value);
 console.log(login.value);
 console.log(role.value);
 console.log(password);

 let params =  "first_name=" + first_name.value + "&last_name=" + last_name.value + "&login=" + login.value + "&role=" + role.value + "&temp_password=" + password;

    //отправляем запрос на сервер
    sendRequestPOST("http://localhost/authadmin/account/", params);
//tj5pfq6e ivanov-ii
}


function changePass() {
    //предотвратить дефолтные действия, отмена отправки формы
    event.preventDefault(); 

    //найти все инпуты и получить данные из каждого
    let inputs = event.target.closest('form').querySelectorAll('input');
    //контейнер для инфы пользователю
    let info_reg = event.target.closest('form').querySelector(".info-form");
 
    let login = inputs[0];
    let temp_password = inputs[1];
    let pass1 = inputs[2];
    let pass2 = inputs[3];

    console.log(login.value);
    console.log(temp_password.value);
    console.log(pass1.value);
    console.log(pass2.value);
    


    login.oninput = function(){
        login.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    temp_password.oninput = function(){
        temp_password.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    pass1.oninput = function(){
        pass1.classList.remove("input-debug");
        pass2.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    pass2.oninput = function(){
        pass1.classList.remove("input-debug");
        pass2.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    
    //проверяем поля на пустоту
    if(login.value == "") {
        info_reg.innerHTML = "Логин не может быть пустым!";
        login.classList.add("input-debug");
        return;
    }
    if(temp_password.value == "") {
        info_reg.innerHTML = "Введите временный пароль!";
        temp_password.classList.add("input-debug");
        return;
    }

    //проверяем введённые пароли
    //если не совпадают - надпись и подсветка
    if(pass1.value == ""){
        info_reg.innerHTML = "Введите пароль!";
        pass1.classList.add("input-debug");
        return;
    }
    if(pass2.value == ""){
        info_reg.innerHTML = "Введите пароль!";
        pass2.classList.add("input-debug");
        return;
    }
    if(pass1.value !== pass2.value){
        info_reg.innerHTML = " Пароли не совпадают!";
        pass1.classList.add("input-debug");
        pass2.classList.add("input-debug");
        return;
    }


   //подставить в запрос и отправить
    let params = "login=" + login.value + "&password=" + pass1.value + "&temp_password=" + temp_password.value;
    
    //получаем ответ
    let json = sendRequestPOST("http://localhost/authadmin/changepass/", params);
    let data = JSON.parse(json);

    //проверяем ответ
    //если пользователь уже зарегистрирвоан, то вернётся  {'success': false, 'error': 'Такие Логин уже используются!'}
    //выведем пользователю
    if(!data['success']) {
        info_reg.innerHTML = data['error'];
        return;
    }

    //если пароль успешно заменен на постоянный получаем токен менеджера
    //и записываем в базу. устанавливаем срок жизни - 1 час
    if(data['success']) {
        document.cookie = "admin=" + data['token'] + "; max-age=3600";
    }

    //теперь у нас в базе и куки есть токен
    //получим данные этого юзера
    data = check();
    console.log(data);
    //отрисуем его личный кабинет
    renderCabinet(data);




//tj5pfq6e ivanov-ii
}