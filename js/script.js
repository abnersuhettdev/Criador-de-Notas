/*
-- Entradas:
    - botao de cadastre-se 
   - div login 
   - div cadastro


    - form de login:
    - username
    - password
    - botao login

    -form de cadastro:
    - username
    - email
    - password
    - password2
    - checkbox
    - botao sign up

- Mudar o form de Login para Cadastre-se ao clicar no botao de cadastre-se

botao.click(){


changeFormBtn.addEventListener("click", function (e) {
  divLogin.classList.toggle("hidden");
  divSignup.classList.toggle("hidden");

  if (divLogin.classList.contains("hidden")) {
    p.innerHTML = "Acesse Sua conta!";
  } else {
    p.innerHTML = "Cadastre-se"
  }
});
}

- Mudar o conteudo do botão para Entre na sua Conta :

    
    2 Estados : 0 cadastre-se, 1 login


- Cadastrar o usuário no local storage
    - 
*/

let changeFormBtn = document.querySelector("#changeForm");
let p = document.querySelector("#changeForm p");
const divLogin = document.querySelector("#divLogin");
const divSignup = document.querySelector("#signup");

changeFormBtn.addEventListener("click", function (e) {
  //Ao clicar no botão alterna a adição e remoçao da class hidden nas divs
  divLogin.classList.toggle("hidden");
  divSignup.classList.toggle("hidden");

  if (divLogin.classList.contains("hidden")) {
    p.innerHTML = "Acesse Sua conta!";
  } else {
    p.innerHTML = "Cadastre-se";
  }
});
