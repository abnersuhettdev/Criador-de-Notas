const changeFormBtn = document.querySelector("#changeForm");
const p = document.querySelector("#changeForm p");
const divLogin = document.querySelector("#divLogin");
const divSignup = document.querySelector("#signup");

const signUpForm = document.querySelector("#signupForm");
const loginForm = document.querySelector("#loginForm");

let newUsername = signUpForm.newUsername;
let newUserLabel = signUpForm.querySelector("#newUserlabel");
let validUser = false;

let newEmail = signUpForm.email;
let newEmailLabel = signUpForm.querySelector("#emailLabel");
let validEmail = false;

let newPassword = signUpForm.password
let newPasswordLabel = signUpForm.querySelector("#passwordLabel");
let validPassword = false;

let password2 = signUpForm.password2;
let assword2Label = signUpForm.querySelector("#password2Label");
let validPassword2 = false;

////////////////////////////////////////////////////////////
function changeForm(){
        //Ao clicar no botão alterna a adição e remoçao da class hidden nas divs
        divLogin.classList.toggle("hidden");
        divSignup.classList.toggle("hidden");
      
        if (divLogin.classList.contains("hidden")) {
          p.innerHTML = "Acesse Sua conta!";
        } else {
          p.innerHTML = "Cadastre-se";
        }
    
}
////////////////////////////////////////////////////////////

//verificação campo novo usuário
newUsername.addEventListener("keyup", () => {
    if (newUsername.value.length <= 2 || newUsername.value.trim() === '') {
      newUsername.setAttribute("style", "border-color: red");
      newUserLabel.innerText = "Insira no minimo 3 caracteres";
      validUser = false;

    } else {
      newUsername.setAttribute("style", "border-color: none");
      newUserLabel.innerText = "Usuário";
      validUser = true;
    }
});

//verificação campo novo email
newEmail.addEventListener("keyup", () => {
    if (newEmail.value.length <= 6 || !newEmail.value.includes('@')) {
      newEmail.setAttribute("style", "border-color: red");
      newEmailLabel.innerText = "Insira um email válido";
      validEmail = false;
    } else {
      newEmail.setAttribute("style", "border-color: none");
      newEmailLabel.innerText = "E-mail";
      validEmail = true;
    }
});

//verificação campo nova senha
newPassword.addEventListener("keyup", () => {
    if (newPassword.value.length <= 4 || newPassword.value.trim() === ' ') {
      newPassword.setAttribute("style", "border-color: red");
      newPasswordLabel.innerText = "Minimo 5 caracteres";
      validPassword = false;
    } else {
      newPassword.setAttribute("style", "border-color: none");
      newPasswordLabel.innerText = "Senha";
      validPassword = true;
    }
});

//verificação campo verificacao de senha
password2.addEventListener("keyup", () => {
    if (password2.value != newPassword.value || password2.value == "") {
      password2.setAttribute("style", "border-color: red");
      password2Label.innerText = "As senhas não conferem";
      validPassword2 = false;
    } else {
      password2.setAttribute("style", "border-color: none");
      password2Label.innerText = "Senha Confirmada!";
      validPassword2 = true;
    }
  });

////////////////////////////////////////////////////////////

let users = JSON.parse(localStorage.getItem("users") || "[]");

// Função para cadastrar Usuário
signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validUser && validEmail && validPassword && validPassword2) {
      verifyUserAlreadyExists()
    }
      users.push({
        username: newUsername.value,
        email: newEmail.value,
        password: newPassword.value
      })

      localStorage.setItem("users", JSON.stringify(users));

      signUpForm.reset()
      
})

function verifyUserAlreadyExists(){
  let userExists = users.find((user)=> newUsername.value === user.username || newEmail.value === user.email)

  if(!userExists){
    alert("Usuário cadastrado com sucesso")
    document.querySelector("#signup h2").innerText = "Cadastre-se"
    newUsername.setAttribute("style", "border-color: none")
    newEmail.setAttribute("style", "border-color: none") 
    changeForm();
    return;
  }

  if(userExists){
    document.querySelector("#signup h2").innerText = "Usuário ou email já cadastrado!"
    newUsername.setAttribute("style", "border-color: red")
    newEmail.setAttribute("style", "border-color: red")
  }
   
  
}

////////////////////////////////////////////////////////////////////
//Função para fazer Login

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  verifyUser(users) 
})

function verifyUser(users) {
  let validUser = false
  let loggedUser;

  for(let user of users){
    if (loginForm.username.value === user.username && loginForm.password.value === user.password) {
      validUser = true
     loggedUser = user
      
    } else {
      validUser = false
    }
  }

  if (validUser) {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
    window.location.href = "dashboard.html"
  }

  if (!validUser) {
    document.querySelector(".form h2").innerText = "Usuário ou senha Incorretos"
    loginForm.username.setAttribute("style", "border: 2px solid red")
    loginForm.password.setAttribute("style", "border: 2px solid red")
  }
  
}
