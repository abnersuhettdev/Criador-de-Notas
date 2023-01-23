//Botão div Bem vindo
let changeFormBtn = document.querySelector("#changeForm");
let p = document.querySelector("#changeForm p");
const divLogin = document.querySelector("#divLogin");
const divSignup = document.querySelector("#signup");

let username = document.querySelector("#newUsername");
let usernameLabel = document.querySelector("#newUserlabel");
let validUser = false;

let email = document.querySelector("#email");
let emailLabel = document.querySelector("#emailLabel");
let validEmail = false;

let password = document.querySelector("#newPassword");
let passwordLabel = document.querySelector("#passwordLabel");
let validPassword = false;

let password2 = document.querySelector("#password2");
let password2Label = document.querySelector("#password2Label");
let validPassword2 = false;

changeFormBtn.addEventListener("click", function () {
  //Ao clicar no botão alterna a adição e remoçao da class hidden nas divs
  divLogin.classList.toggle("hidden");
  divSignup.classList.toggle("hidden");

  if (divLogin.classList.contains("hidden")) {
    p.innerHTML = "Acesse Sua conta!";
  } else {
    p.innerHTML = "Cadastre-se";
  }
});

//Verificações de formulário Cadastro

//Verificando e mudando o estilo do usuario caso o numero de caracteres seja inválido
username.addEventListener("keyup", () => {
  if (username.value.length <= 2) {
    username.setAttribute("style", "border-color: red");
    usernameLabel.innerText = "Insira no minimo 3 caracteres";
    validUser = false;
  } else {
    username.setAttribute("style", "border-color: green");
    usernameLabel.innerText = "Usuário";
    validUser = true;
  }
});

//Verificando e mudando o estilo caso o numero de caracteres seja inválido
email.addEventListener("keyup", () => {
  if (email.value.length <= 6) {
    email.setAttribute("style", "border-color: red");
    emailLabel.innerText = "Por favor insira um email válido";
    validEmail = false;
  } else {
    email.setAttribute("style", "border-color: green");
    emailLabel.innerText = "E-mail";
    validEmail = true;
  }
});

//Verificando e mudando o estilo caso o numero de caracteres seja inválido
password.addEventListener("keyup", () => {
  if (password.value.length <= 4) {
    password.setAttribute("style", "border-color: red");
    passwordLabel.innerText = "Minimo 5 caracteres";
    validPassword = false;
  } else {
    password.setAttribute("style", "border-color: green");
    passwordLabel.innerText = "Senha";
    validPassword = true;
  }
});

//Verificando e mudando o estilo caso as senhas não conferirem
password2.addEventListener("keyup", () => {
  if (password2.value != password.value || password2.value == "") {
    password2.setAttribute("style", "border-color: red");
    password2Label.innerText = "As senhas não conferem";
    validPassword2 = false;
  } else {
    password2.setAttribute("style", "border-color: green");
    password2Label.innerText = "Senha Confirmada!";
    validPassword2 = true;
  }
});

//Formulário de Cadastro
function signUp(e) {
  //Verifica se todos os inputs são válidos
  if (validUser && validEmail && validPassword && validPassword2) {
    alert("TUDO OK!");
  } else {
    alert("Tá tudo vazio!");
  }

  // Recebe os usuários do localStorage, caso não haja, inicia uma lista vazia

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  //Adiciona outros usuários à lista de usuarios cadastrados
  users.push({
    username: username.value,
    email: email.value,
    password: password.value,
    password2: password2.value,
  });

  //Envia para o localStorage os usuários cadastrados
  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario Cadastrado!");
}

//Formulário de Login
