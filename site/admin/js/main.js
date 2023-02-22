//функция отрисовки логин окна

    
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



function userAuthorization() {
    alert("вхожу");
}