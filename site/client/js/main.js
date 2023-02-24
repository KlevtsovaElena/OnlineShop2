//переменные для записи элементов HTML
//основной контейнер, куда будут отрисовываться все страницы.
const containerPage = document.getElementById('containerPage');
//контейнер для счётчика товаров в корзине (красный круг)
const containerCountProduct = document.getElementById('countProduct');
//контейнер для панели сортировки и фильтрации
const sortFilterContainer = document.getElementById('sort-filter-container');

const searchInput = document.getElementById('search').querySelector('input'); 

//шаблоны для отрисовки
const templateCatalog = document.getElementById('tmpl-catalog').innerHTML;
const templateCard = document.getElementById('tmpl-card').innerHTML;
const templateMainContent = document.getElementById('mainContent').innerHTML;
const templateCart = document.getElementById('tmpl-cart').innerHTML;
const templateContainerWatchCard = document.getElementById('tmpl-containerWatchCard').innerHTML;
const templateCartEmpty = document.getElementById('tmpl-cart-empty').innerHTML;
const templateWatchMain = document.getElementById('tmpl-watchMain').innerHTML;
const templateSort = document.getElementById('tmpl-sort').innerHTML;
const templateLogin = document.getElementById('tmpl-login').innerHTML;
const templatePriceInterval = document.getElementById('tmpl-priceInterval').innerHTML;
const templateItem = document.getElementById('tmpl-item').innerHTML;
const templateFilter = document.getElementById('tmpl-filters').innerHTML;
const templateCabinet = document.getElementById('tmpl-cabinet').innerHTML;
const templateCategory = document.getElementById('tmpl-category').innerHTML;
const templateOrder = document.getElementById('tmpl-order').innerHTML;




//переменная для подсчёта товаров в корзине
let countProduct = 0;

//функция для отправки запросов GET
function sendRequestGET(url){
    let requestObj = new XMLHttpRequest();
    requestObj.open('GET', url, false);
    requestObj.send();
    return requestObj.responseText;
}

//создаём переменные  для записи товаров в корзину И избранное, переменную для подсчёта товаров в корзине. Точнее id товаров
//и записываем в них значения localStorage
let arrayCart = new Array();
let arrayFavorite = new Array();
getCart();
function getCart(){
    console.log("getCart");
    //проверяем авторизован ли пользователь
    let auth = check();

    //если не авторизован, то данные берём из localStorage
    if (!auth['success']){
        console.log("не автоизован");
        arrayCart = window.localStorage.getItem('onlineShop_cart');
        arrayFavorite = window.localStorage.getItem('onlineShop_favorite');
    //иначе , берём из таблицы Корзина
    } else {

        arrayCart = sendRequestGET("http://localhost/api/get/cart/?id_user=" + auth['user']['id']);
        //arrayCart = JSON.parse(json);

        console.log(" из базы " + arrayCart);
    }
    //если нет сохранённого в ls, то создаём новые переменные. 
    if (arrayCart == null || arrayCart == 'null' || arrayCart == ''){
        arrayCart = new Array();
    }else {arrayCart = JSON.parse(arrayCart);}
    
    countProductInCart();

}


//функция подсчёта товаров в корзине
function countProductInCart(){
    console.log("countProductInCart");
    countProduct = 0;
    for (let i = 0;  i < arrayCart.length; i++){
        countProduct += arrayCart[i]['count']; 
    }

    //впишем в красный круг корзины количество товаров из переменной countProduct
    containerCountProduct.innerHTML = countProduct;
    return countProduct;
}






//переменная-метка для того, чтобы очищать или не очищать панель сортировки
let sort = -1;



//отрисуем при загрузке Главную страницу путём вызова функции
renderMainPage();



//функция очистки страницы
function clearPage(){
    containerPage.innerHTML="";
    if (sort == -1) {
        sortFilterContainer.innerHTML="";
    }
}


//функция сохранения данных в localStorage
function save(keyData, saveData){
    //кодируем data в json и сохраняем в localStorage
    let dataJson = JSON.stringify(saveData);
    //сохраняем в localStorage
    localStorage.setItem(keyData, dataJson);
}





function renderCategory() {
    //очищаем страницу
    clearPage();

    //запрос на получение 4 последних добаленных товаров
    let json = sendRequestGET("http://localhost/api/get/category/?");
    //раскодируем данные
    let data= JSON.parse(json);

    for (let i = 0; i < data.length; i++) {
        containerPage.innerHTML += templateCategory.replace('${image}', data[i]['image'])
                                                    .replace('${name}', data[i]['category'])
                                                    .replace('${id}', data[i]['id']);
    }

} 


function renderCategoryGoods(id) {
    //вызываем отрисовку каталога согласно условиям поиска

    renderCatalog("category=" + id);

}

function renderAccesories() {
    //вызываем отрисовку каталога согласно условиям поиска

    renderCatalog("category=4");

}


//функция вывода главной страницы
function renderMainPage(){
    console.log(" renderMainPage()");
    sort=-1;
    //очищаем страницу
    clearPage();

    //запрос на получение 4 последних добаленных товаров
    let jsonNewRelease = sendRequestGET("http://localhost/api/get/goods/?field=date_goods&orderBy=DESC&limit=4");
    //раскодируем данные
    let dataNewRelease = JSON.parse(jsonNewRelease);
    
    //соберём все карточки этих товаров
    let watchNew = '';

    for (let i = 0; i < dataNewRelease.length; i++){
        watchNew+= templateWatchMain.replace('${id}', dataNewRelease[i]['id'])
                                    .replace('${title}', dataNewRelease[i]['product_name'])
                                    .replace('${photo}', dataNewRelease[i]['image'])
                                    .replace('${price}', dataNewRelease[i]['price'])
    }

    //запрос на получение 4 товаров, которых купили больше всего раз
    let jsonFanFavorites = sendRequestGET("http://localhost/api/get/goods/?field=sold&orderBy=DESC&limit=4");
    //раскодируем данные
    let dataFanFavorites = JSON.parse(jsonFanFavorites);

    //соберём все карточки этих товаров
    let watchFan = '';

    for (let i = 0; i < dataFanFavorites.length; i++){
        watchFan+= templateWatchMain.replace('${id}', dataFanFavorites[i]['id'])
                                    .replace('${title}', dataFanFavorites[i]['product_name'])
                                    .replace('${photo}', dataFanFavorites[i]['image'])
                                    .replace('${price}', dataFanFavorites[i]['price'])
    }

    //выводим в шаблон главной страницы собранные карточки
    containerPage.innerHTML = templateMainContent.replace('${watchesNew}', watchNew)
                                                 .replace('${watchesFanFavorites}', watchFan);
}



function renderSortFilterPannel(){

    let json = sendRequestGET('http://localhost/api/get/filter/?');

    //раскодируем данные
    let data = JSON.parse(json);

    sortFilterContainer.innerHTML += templateSort;
    let items = '';

    for (let i = 0; i < data.length; i++) { 

        for (let j = 0; j < data[i]['filter-item'].length; j++){

            items += templateItem.replace('${id}', data[i]['filter-item'][j]['id'])
                                    .replace('${name}', data[i]['filter-item'][j]['name'])
                                    .replace('${name}', data[i]['filter-item'][j]['name']);
        }
        sortFilterContainer.innerHTML += templateFilter.replace('${filter}', data[i]['table'])
                                                        .replace('${filter}',data[i]['filter'])
                                                     .replace('${filter_item}',  items);
        items = '';    

    }  
    
    sortFilterContainer.innerHTML += templatePriceInterval;
    
    // //СОРТИРОВКА
    // //получаем  Select со всеми элементами
    // let select = document.querySelector('select');
    // //по его изменению запускаем функцию
    // select.onchange = function(){
    //     //получим индекс выбранного элемента 
    //     let indexSelected = select.selectedIndex;
    //     //получим сам элемент
    //     let option = select.querySelectorAll('option')[indexSelected];
    //     for(let i = 0; i < select.length; i++){
    //         select.querySelectorAll('option')[i].removeAttribute('selected');
    //     }
    //     //
    //     option.setAttribute('selected', 'selected');
    //     option.selected = true;
    //     //соберём необходимые данные для запроса и сортировки
    //     let getParams = 'field=' + option.getAttribute('value') + '&orderBy=' + option.getAttribute('order');
    //     //меняем нашу метку, чтобы не перерисовывать панель сортировки
    //     sort = indexSelected;
    //     //перерисовываем 
    //     renderCatalog(getParams);
    //}

}

function buildParams(){

    let paramFilter='';
    let  ul = document.querySelectorAll('.filter_item');
    for (let i = 0; i<ul.length; i++){
        let li='';
        let table = ul[i].getAttribute('id');
        for(let j = 0; j < ul[i].childElementCount; j++) {
            
            let li2 = ul[i].querySelectorAll('li')[j].querySelector('input');
            if(li2.checked == true){
                li +=  li2.getAttribute('id') + ',';

            }
        }
        if(li!==''){
            li = li.substring(0, li.length-1);
            if(paramFilter==''){
               
                paramFilter = table + '=' + li;
            }
             else{
                paramFilter += '&' + table + '=' + li;
             }   
            
        }  
        

    }

    
    let price1 = document.getElementById('priceTo').value;
    let price2 = document.getElementById('priceDo').value; 

    if(price2 !== '' && (price1 < price2)) {

            paramFilter += '&price1=' + price1 + '&price2=' + price2;
   }   

    let select = document.querySelector('select');
    let indexSelected = select.selectedIndex;
    if(indexSelected !== 0){
        let option = select.querySelectorAll('option')[indexSelected];
        paramFilter += '&field=' + option.getAttribute('value') + '&orderBy=' + option.getAttribute('order');
    }

sort=1;
    renderCatalog(paramFilter);
}


let tempCCCCCCCCCCC="";
//функция отрисовки каталога
function renderCatalog(getParams){

console.log('http://localhost/api/get/goods/?' + getParams)
    //очищаем страницу
    clearPage();

    //если наша метка не изменилась, те сортировка не была запущена, то отрисовываем панель сортировки
    //если же не равна -1, то оставляем с теми параметрами, какие сейчас есть
    if (sort == -1){
        renderSortFilterPannel();
    }

    //получаем данные каталога
    json = sendRequestGET('http://localhost/api/get/goods/?' + getParams);
    //раскодируем данные
    let data = JSON.parse(json);

    console.log(data);

    //собираем карточки и выводим их на страницу
    for (let i = 0; i < data.length; i++){  
         
    
                                                
        if ((data[i]['quantity'] - data[i]['reserve']) == 0) { 
            containerPage.innerHTML += templateCatalog  .replace('${id}', data[i]['id'])
                                                        .replace('${id}', data[i]['id'])
                                                        .replace('${title}', data[i]['product_name'])
                                                        .replace('${photo}', data[i]['image'])
                                                        .replace('${price}', data[i]['price'])
                                                        .replace('${шт}', data[i]['quantity'] - data[i]['reserve'])
                                                        .replace('В корзину', 'Нет в наличии')
                                                        .replace('onclick="addProductInCart()"', "");

        } else {
            containerPage.innerHTML += templateCatalog  .replace('${id}', data[i]['id'])
                                                        .replace('${id}', data[i]['id'])
                                                        .replace('${title}', data[i]['product_name'])
                                                        .replace('${photo}', data[i]['image'])
                                                        .replace('${price}', data[i]['price'])
                                                        .replace('${шт}', data[i]['quantity'] - data[i]['reserve']);

        }

    }

    // //СОРТИРОВКА
    // //получаем  Select со всеми элементами
    // let select = document.querySelector('select');
    // //по его изменению запускаем функцию
    // select.onchange = function(){
    //     //получим индекс выбранного элемента 
    //     let indexSelected = select.selectedIndex;
    //     //получим сам элемент
    //     let option = select.querySelectorAll('option')[indexSelected];
    //     for(let i = 0; i < select.length; i++){
    //         select.querySelectorAll('option')[i].removeAttribute('selected');
    //     }
    //     //
    //     option.setAttribute('selected', 'selected');
    //     option.selected = true;
    //     //соберём необходимые данные для запроса и сортировки
    //     let getParams = 'field=' + option.getAttribute('value') + '&orderBy=' + option.getAttribute('order');
    //     //меняем нашу метку, чтобы не перерисовывать панель сортировки
    //     sort = indexSelected;
    //     //перерисовываем 
    //     renderCatalog(getParams);
    // }
}


//функция отрисовки карточки
function renderCard(id){

    sort = -1;
    //очищаем страницу
    clearPage();
    //сбрасываем скролл в ноль
    window.scrollTo(0,0);
    //получаем данные одного товара по id
    let json = sendRequestGET('http://localhost/api/get/goods/?id=' + id);
    //раскодируем данные
    let data = JSON.parse(json);

    console.log(data);
    console.log(data[0]['id']);


    //меняем данные в шаблоне данными из апишки
    if ((data[0]['quantity'] - data[0]['reserve']) == 0) { 
        containerPage.innerHTML += templateCard.replace('${id}', data[0]['id'])
                                                .replace('${title}', data[0]['product_name'])
                                                .replace('${photo}', data[0]['image'])
                                                .replace('${price}', data[0]['price'])
                                                .replace('{rate}', 'рейтинг')
                                                .replace('{count}', 'число')
                                                .replace('${description}', data[0]['product_description'])
                                                .replace('${шт}', data[0]['quantity'] - data[0]['reserve'])
                                                .replace('${шт}', data[0]['quantity'] - data[0]['reserve'])
                                                .replace('В корзину', 'Нет в наличии')
                                                .replace('onclick="addProductInCart()"', "");

    } else {
        containerPage.innerHTML += templateCard.replace('${id}', data[0]['id'])
                                                .replace('${title}', data[0]['product_name'])
                                                .replace('${photo}', data[0]['image'])
                                                .replace('${price}', data[0]['price'])
                                                .replace('{rate}', 'рейтинг')
                                                .replace('{count}', 'число')
                                                .replace('${description}', data[0]['product_description'])
                                                .replace('${шт}', data[0]['quantity'] - data[0]['reserve'])
                                                .replace('${шт}', data[0]['quantity'] - data[0]['reserve']); 

    }

                                 
}

  
//функция получения значений только нужного поля ассоц массива
function getValueField(arr, key){
    console.log("getValueField");
    let valueFieldArray = [];
    for(let i = 0; i < arr.length; i++){
        valueFieldArray.push(arr[i][key]);
    }
    console.log(valueFieldArray);
    return valueFieldArray;

}


//функция добавления товара в корзину (записываем в ls только id и count)
function addProductInCart(){
    console.log("addProductInCart");
    //определяем на кнопку какого товара нажали (его id)
    let productId = Number(event.target.getAttribute('product-id'));
    let inStock = event.target.getAttribute('quantity');

    //получим только id продуктов  корзины
    let idArrayCart = getValueField(arrayCart, 'id_product');
    //узнаем есть ли такой товар в корзине
    let indexElement = idArrayCart.indexOf(productId);

    //проверка есть ли такой товар в корзине
    //если нет
    if (indexElement == -1){
        //просто добавляем в корзину с количеством 1
        arrayCart.push({'id_product': productId, 'count': 1}); 
        console.log("такого проукта не ьыло");
    } else {
        //если же уже есть в корзине , то прибавляем только количество до того момента, пока товар есть в наличии
        if (inStock >= (arrayCart[indexElement]['count']+1)){
            arrayCart[indexElement]['count'] = arrayCart[indexElement]['count'] + 1;
            console.log("добавили +1");
        }else{ 
            console.log("такой есть и его много");
            return;}
    }

    //авторизован ли пользователь?
    let auth = check();

    //если не авторизован, то работаем с  localStorage
    if (!auth['success']){
            //пересохраняем массив товаров Корзины в localStorage
        save('onlineShop_cart', arrayCart);

        //если же авторизован, 
} else {
    console.log("авторизован");
    //нам нужен id юзера для записи в таблицу Корзина его товаров
    let user_id = auth['user']['id']; 
    console.log(user_id);
    //теперь отправляем данные в базу
    //отправляем запрос на сервер
    let cartJson = JSON.stringify(arrayCart);
    let params = "id=" + user_id + "&cart=" + cartJson;

    console.log(params);
    url = "http://localhost/api/post/cart/";
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    requestObj.send(params);


    console.log("arrayCart" + cartJson);
}
    



    //плюсуем в счётчик товаров в корзине
    countProductInCart();
}


//отрисовка Корзины
function renderCart(){
    console.log("renderCart");
    getCart();
    sort = -1;
    //очищаем страницу
    clearPage();

    //если корзина пустая, то выводим соответствующий шаблон и выходим из функции (return)
    if (arrayCart.length==0){
        containerPage.innerHTML = templateCartEmpty;
        return;
    }

    //получим только id корзины
    let idArrayCart = getValueField(arrayCart, 'id_product');
    let id = idArrayCart.join(',');

    //делаем запрос и получаем данные
    let json = sendRequestGET('http://localhost/api/get/goods/?id=' + id);
    //раскодируем данные
    let data=JSON.parse(json);

    //вводим переменную для подсчёта общей стоимости
    let price = 0;

    //собираем все товары корзины по шаблону в переменную
    let watchCards = '';
    //берём товар из корзины
    for (let i = 0;  i < arrayCart.length; i++){
        //бежим по всем товарам из каталога
        for (let j = 0; j < data.length; j++){
            //если их id совпадают, то добавляем товар в отрисовку и обновляем стоимость и выходим из внутреннего цикла (break)
            if (data[j]['id'] == arrayCart[i]['id_product']){
                price += data[j]['price'] * arrayCart[i]['count'];
                
                watchCards += templateContainerWatchCard.replace('${photo}', data[j]['image'])
                                                        .replace('${title}', data[j]['product_name'])
                                                        .replace('${count}', arrayCart[i]['count'])
                                                        .replace('${price}', data[j]['price'] * arrayCart[i]['count'])
                                                        .replace('${id}', arrayCart[i]['id_product'])
                                                        .replace('${id}', arrayCart[i]['id_product'])
                                                        .replace('${id}', arrayCart[i]['id_product'])
                                                        .replace('${id}', arrayCart[i]['id_product'])
                                                        .replace('${шт}', data[j]['quantity'] - data[j]['reserve'])
                                                        .replace('${шт}', data[j]['quantity'] - data[j]['reserve']);
                break;
        }
    } 
}
 
    //отрисовываем всё на страницу
    containerPage.innerHTML += templateCart.replace('${count}', countProduct)
                                            .replace('${countSum}', price)
                                            .replace('${watchCards}', watchCards);
}


//функция удаления товара из корзины по id
function deleteProductCart(id){
    
    //запрашиваем подтверждение
    let ok = confirm("Удалить из корзины этот товар?");  //true / false
    if(ok==false){
        return;
    }      
    
    //если ок, то бежим по id в корзине и сравниваем с id товара. Если совпадают, то удалем из корзины запись
    for (let i = 0;  i < arrayCart.length; i++){
        if (arrayCart[i]['id_product'] == id) {
            arrayCart.splice(i, 1);
            break;
        }
    }


   //авторизован ли пользователь?
   let auth = check();

   //если не авторизован, то работаем с  localStorage
   if (!auth['success']){
           //пересохраняем массив товаров Корзины в localStorage
       save('onlineShop_cart', arrayCart);

       //если же авторизован, 
} else {
   console.log("авторизован");
   //нам нужен id юзера для записи в таблицу Корзина его товаров
   let user_id = auth['user']['id']; 
   console.log(user_id);
   //теперь отправляем данные в базу
   //отправляем запрос на сервер
   let cartJson = JSON.stringify(arrayCart);
   let params = "id=" + user_id + "&cart=" + cartJson;

   console.log(params);
   url = "http://localhost/api/post/cart/";
   let requestObj = new XMLHttpRequest();
   requestObj.open('POST', url, false);
   requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   requestObj.send(params);


   console.log("arrayCart" + cartJson);
}
   


    //пересчитываем общее количество товаров в корзине и перерисвываем в кружочке
    countProductInCart();

    //перерисовываем корзину
    renderCart();
}


//уменьшение количества одного товара (максимум до 1)
function minusProduct(id){
    //бежим по корзине и сравниваем Id в корзине и id уменьшаемого товара
    for(let i = 0; i < arrayCart.length; i++){
        if (arrayCart[i]['id_product'] == id) {
            //если товара всего 1 в корзине, то выходим из функции
            if(arrayCart[i]['count']==1){
                return;
            }
            //иначе уменьшаем на 1 и выходим из цикла
            arrayCart[i]['count'] = arrayCart[i]['count']-1;
            break;
        }
    }


       //авторизован ли пользователь?
   let auth = check();

   //если не авторизован, то работаем с  localStorage
   if (!auth['success']){
           //пересохраняем массив товаров Корзины в localStorage
       save('onlineShop_cart', arrayCart);

       //если же авторизован, 
} else {
   console.log("авторизован");
   //нам нужен id юзера для записи в таблицу Корзина его товаров
   let user_id = auth['user']['id']; 
   console.log(user_id);
   //теперь отправляем данные в базу
   //отправляем запрос на сервер
   let cartJson = JSON.stringify(arrayCart);
   let params = "id=" + user_id + "&cart=" + cartJson;

   console.log(params);
   url = "http://localhost/api/post/cart/";
   let requestObj = new XMLHttpRequest();
   requestObj.open('POST', url, false);
   requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   requestObj.send(params);

   console.log("arrayCart" + cartJson);
}
    //пересчитываем общее количество товаров в корзине и перерисвываем в кружочке
countProductInCart();

    //перерисовываем корзину
    renderCart();
 
}


//увеличение количества одного товара (максимум до наличия)
function plusProduct(id){

    //получаем количество в наличии данного товара
    let inStock = event.target.getAttribute('quantity');
    //бежим по корзине и сравниваем Id в корзине и id увеличиваемго товара
    for(let i = 0; i < arrayCart.length; i++){
        if (arrayCart[i]['id_product'] == id) {
            //добавляем только в случае, если товар ещё есть в наличии
            if (inStock >= (arrayCart[i]['count']+1)){
                arrayCart[i]['count'] = arrayCart[i]['count'] + 1;
            }
            break;
        }
    }


       //авторизован ли пользователь?
       let auth = check();

       //если не авторизован, то работаем с  localStorage
       if (!auth['success']){
               //пересохраняем массив товаров Корзины в localStorage
           save('onlineShop_cart', arrayCart);
    
           //если же авторизован, 
    } else {
       console.log("авторизован");
       //нам нужен id юзера для записи в таблицу Корзина его товаров
       let user_id = auth['user']['id']; 
       console.log(user_id);
       //теперь отправляем данные в базу
       //отправляем запрос на сервер
       let cartJson = JSON.stringify(arrayCart);
       let params = "id=" + user_id + "&cart=" + cartJson;
    
       console.log(params);
       url = "http://localhost/api/post/cart/";
       let requestObj = new XMLHttpRequest();
       requestObj.open('POST', url, false);
       requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       requestObj.send(params);
    
       console.log("arrayCart" + cartJson);
    }
        //пересчитываем общее количество товаров в корзине и перерисвываем в кружочке
    countProductInCart();
    
        //перерисовываем корзину
        renderCart();
}


//-------------------------- LOGIN -----------------------------//

function renderProfile() {
    let data = check();
    if (!data['success']) {
        renderLogin();
    } else {
        renderCabinet(data);
    }
    
}

//функция отрисовки логин окна
function renderLogin() {

    //очищаем страницу
    sort = -1;
    clearPage();

    //отрисовываем шаблон login
    containerPage.innerHTML += templateLogin;
    
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


//функция регистрации
function userRegistration(){
    let userName = event.target.closest(".form_signup").querySelector('.user-name');
    let userMail = event.target.closest(".form_signup").querySelector('.user-mail');
    let user_pass1 = event.target.closest(".form_signup").querySelector('.user-pass1');
    let user_pass2 = event.target.closest(".form_signup").querySelector('.user-pass2');
    let info_reg = event.target.closest(".form_signup").querySelector(".info-form");

    userName.oninput = function(){
        userName.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    userMail.oninput = function(){
        userMail.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    user_pass1.oninput = function(){
        user_pass1.classList.remove("input-debug");
        user_pass2.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    user_pass2.oninput = function(){
        user_pass1.classList.remove("input-debug");
        user_pass2.classList.remove("input-debug");
        info_reg.innerHTML = "";
    }
    
    //проверяем поля на пустоту
    if(userName.value == "") {
        info_reg.innerHTML = "Логин не может быть пустым!";
        userName.classList.add("input-debug");
        return;
    }
    if(userMail.value == "" || userMail.value.indexOf('@') < 0) {
        info_reg.innerHTML = "Email не может быть пустым и должен содержать @";
        userMail.classList.add("input-debug");
        return;
    }

    //проверяем введённые пароли
    //если не совпадают - надпись и подсветка
    if(user_pass1.value == ""){
        info_reg.innerHTML = "Введите пароль!";
        user_pass1.classList.add("input-debug");
        return;
    }
    if(user_pass2.value == ""){
        info_reg.innerHTML = "Введите пароль!";
        user_pass2.classList.add("input-debug");
        return;
    }
    if(user_pass1.value !== user_pass2.value){
        info_reg.innerHTML = " Пароли не совпадают!";
        user_pass1.classList.add("input-debug");
        user_pass2.classList.add("input-debug");
        return;
    }

console.log("запрос в базу");
    //отправляем запрос
    let params = "user_name=" + userName.value + "&user_mail=" + userMail.value + "&password=" + user_pass1.value;
    url = "http://localhost/auth/signup/"
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    requestObj.send(params);
console.log("получили ответ");
    //получаем ответ
    let json = requestObj.response;
    let data = JSON.parse(json);

    //проверяем ответ
    //если пользователь уже зарегистрирвоан, то вернётся  {'success': false, 'error': 'Такие Логин или Email уже используются!'}
    //выведем пользователю
    if(!data['success']) {
        info_reg.innerHTML = data['error'];
        return;
    }

    //если пользователь новый (записан только что в базу), то получаем его токен
    //и записываем в базу. устанавливаем срок жизни - 1 час
    if(data['success']) {
        document.cookie = "user=" + data['token'] + "; max-age=3600";
    }

    //теперь у нас в базе и куки есть токен
    //получим данные этого юзера
    data = check();

    getCart();

    //отрисуем его личный кабинет
    renderCabinet(data);
}

function userAuthorization(){
    //предотвратить дефолтные действия, отмена отправки формы
    event.preventDefault(); 

    //контейнер для инфы пользователю
    let info_auth = event.target.closest('form').querySelector(".info-form");

    //найти все инпуты и получить данные из каждого
    let inputs = event.target.closest('form').querySelectorAll('input');
    console.log(inputs);

    let login = inputs[0].value;
    let password = inputs[1].value;

    //подставить в запрос и отправить
    let params = "user_name=" + login + "&password=" + password;
    url = "http://localhost/auth/login/";
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
        document.cookie = "user=" + data['token'] + "; max-age=3600";
    }

    //теперь у нас в базе и куки есть одинаковый токен
    //получим данные юзера
    data = check();
    getCart();

    //рисуем личный кабинет
    renderCabinet(data);
}


function check() {
    console.log("check()");
    //берём токен из куки
    const cookie = document.cookie.match(/user=(.+?)(;|$)/);

    //если токена нет выходим из функции и возвращаем false
    if (cookie == null || cookie == undefined || cookie == ""){
        return {'success' : false};
    }

    //если токен есть , то передаём его на сервер
    let params = "token=" + cookie[1];

    //подставить в запрос и отправить

    url = "http://localhost/auth/check/";
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
    const cookie = document.cookie.match(/user=(.+?)(;|$)/);

    //если токена нет, то рисуем форму Авторизации и выходим из функции
    if (cookie == null || cookie == undefined || cookie == ""){
        renderLogin();
        return;
    }

    //если токен есть , то передаём его на сервер
    let params = "token=" + cookie[1];

    //отправляем запрос на сервер
    url = "http://localhost/auth/logout/";
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    requestObj.send(params);

    //удаляем токен из куки
    document.cookie = "user=''; max-age=-1";

    getCart();
    //рисуем форму авторизации
    renderLogin();
}


function renderCabinet(data) {
    clearPage();

    let orders = "";



//отправляем запрос на сервер
 //если токен есть , то передаём его на сервер

 //получаем данные одного товара по id
 let json = sendRequestGET('http://localhost/api/get/order/?user_id=' + data['user']['id']);
 //раскодируем данные
 let dataOrder = JSON.parse(json);
 console.log(dataOrder);



for (let i = 0; i < dataOrder.length; i++){
    console.log(dataOrder[i]['order_id']);
    orders += "<h3>Заказ № " + dataOrder[i]['order_id'] + " Статус: " + dataOrder[i]['status'] + "</h3>";
    for(let j = 0; j < dataOrder[i]['order_items'].length; j++){
        orders += dataOrder[i]['order_items'][j]['product_name'] + "  -  " + 
                dataOrder[i]['order_items'][j]['count'] + " - " + 
                (dataOrder[i]['order_items'][j]['count']*dataOrder[i]['order_items'][j]['price']);
        orders += "<br>";
         
    }
}

    containerPage.innerHTML += templateCabinet.replace('${user_name}', data['user']['user_name'])
                                                .replace('${user_mail}', data['user']['user_mail'])
                                                .replace('${id}', data['user']['id'])
                                                .replace('${orders}', orders);

}


//ПОИСК товаров 

//по нажатию enter
searchInput.addEventListener('keydown', function(e){
    if (e.keyCode === 13) {
        search();
    }
})

//либо по клику на лупу
function search() {

    //берём значение Input 
    let search = searchInput.value;

    //вызываем отрисовку каталога согласно условиям поиска

    renderCatalog("search=" + search);
    containerPage.innerHTML += "Результаты поиска " + search;
    //очищаем input
    searchInput.value = "";
}


function sendOrder() {
    //предотвратить дефолтные действия, отмена отправки формы
    event.preventDefault(); 

    //соберём данные с формы
    let inputs = event.target.closest('form').querySelectorAll('input');
    let name = inputs[0];
    let phone = inputs[1];
    let address = inputs[2];
    let info =  event.target.closest('form').querySelector(".info-form")

    name.oninput = function(){
        name.classList.remove("input-debug");
        info.innerHTML = "";
    }
    phone.oninput = function(){
        phone.classList.remove("input-debug");
        info.innerHTML = "";
    }
    address.oninput = function(){
        address.classList.remove("input-debug");
        info.innerHTML = "";
    }

    //проверим все ли данные введены в форму
    if(name.value == '' || phone.value == '' || address.value == '') {
        info.innerHTML = "Заполните все поля";
        if (name.value == ''){
            name.classList.add("input-debug");
        }
        if (phone.value == ''){
            phone.classList.add("input-debug");
        }
        if (address.value == ''){
            address.classList.add("input-debug");
        }
        return;
    }

    //проверим авторизован ли пользователь
    let data = check();

    if (!data['success']) {
        alert('пользователь не авторизован');
        return;
    } 
    
    //если авторизован, то получим его id
    let id = data['user']['id'];
    
   //отправляем запрос
       //кодируем data в json и сохраняем в localStorage
       let cartJson = JSON.stringify(arrayCart);
   let params = "id=" + id + "&name=" + name.value + "&user_phone=" + phone.value + "&user_address=" + address.value + "&cart=" + cartJson;
   url = "http://localhost/api/post/order/";
   let requestObj = new XMLHttpRequest();
   requestObj.open('POST', url, false);
   requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   requestObj.send(params);

   //получаем ответ
   let json = requestObj.response;
 //  let data2 = JSON.parse(json);
    console.log(json);


    renderCart();
    

}
