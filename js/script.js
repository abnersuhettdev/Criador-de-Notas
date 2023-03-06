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

//Muda o formulário alternando a class através do botão
function changeForm(){
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

//verificação campo confirmação de senha
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

////////////////////////////////////////////////////////////////////////////////////

//Busca o item Users do localStorage, caso não tenha nenhum, retorna uma lista vazia
let users = JSON.parse(localStorage.getItem("users") || "[]");

// Função para cadastrar Usuário
signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    //verifica se todos os campos são válidos
    if (validUser && validEmail && validPassword && validPassword2) {
     let exists = verifyUserAlreadyExists() 

      //se o usuário exitir, retorna como undefined e é necessario mudar o username e o email
     if(exists === true){
      return undefined;
     } 
    }

    //se não existir, o usuário é adicionado ao localStorage
    users.push({
      username: newUsername.value,
      email: newEmail.value,
      password: newPassword.value
    })

    localStorage.setItem("users", JSON.stringify(users));

      signUpForm.reset()
      
})

////////////////////////////////////////////////////////////////////////////////////
//Verifica se o usuário já existe
function verifyUserAlreadyExists(exists){
  let userExists = users.find((user)=> newUsername.value === user.username || newEmail.value === user.email)

  //Se não existir o usuário ele cadastra
  if(!userExists){
    exists = false
    document.querySelector("#signup h2").innerText = "Cadastre-se"
    newUsername.setAttribute("style", "border-color: none")
    newEmail.setAttribute("style", "border-color: none") 
    alert("Usuário cadastrado com sucesso")
    changeForm();
    return exists;
  }

  //se existir, aparece um erro no formulário
  if(userExists){
    exists = true
    document.querySelector("#signup h2").innerText = "Usuário ou email já cadastrado!"
    newUsername.setAttribute("style", "border-color: red")
    newEmail.setAttribute("style", "border-color: red")
    return exists;
  }
   
  
}

////////////////////////////////////////////////////////////////////////////////////

//Função para fazer Login

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  verifyUser(users) 
})


//Verifica os usuários
function verifyUser(users) {
 
  let loggedUser;

  //percorre o localStorage
   let user = users.find((user)=> loginForm.username.value === user.username && loginForm.password.value === user.password)
  
    //Se o usuário for válido, adiciona ao localStorage o Objeto LoggedUser para monitorar a sessão ativa
    if (user) {
     loggedUser = user
     loggedUser.notes = user.notes ?? []
     console.log(loggedUser)
     localStorage.setItem("loggedUser", JSON.stringify(loggedUser))
     window.location.href = "dashboard.html"

    //Se não for válido aparece um erro no formulário  
    } else { 
    document.querySelector(".form h2").innerText = "Usuário ou senha Incorretos"
    loginForm.username.setAttribute("style", "border: 2px solid red")
    loginForm.password.setAttribute("style", "border: 2px solid red")
    }
  
}
