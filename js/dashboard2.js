const ItemTitle = document.querySelector("#newItemTitle");
const ItemDescription = document.querySelector("#newItemDescription");
const formNewItem = document.querySelector("#formNewItem");
const errorMessage = document.querySelector("#errorMessage");
const addBtn = document.querySelector("#add");
const divNotes = document.querySelector("#notes");
const userh1 = document.querySelector("#title h1");

const signOutBtn = document.querySelector('#signOut')

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
const users = JSON.parse(localStorage.getItem("users"))


////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", changeName)
document.addEventListener("DOMContentLoaded", addNotes)

////////////////////////////////////////////////////////////////////////////////////
function changeName(){
  userh1.innerText = `Olá, ${loggedUser.username}!`;
}

function verifyNoteChecked(note){
  let isChecked;
  if(!note.checked){
     isChecked = 'unchecked'
     return isChecked
  }
   isChecked = 'checked'
   return isChecked
  
}

/////////////////////////////////////////////////////////////////////////////////////
function createElements(note){

  const divInputGroup = document.createElement('div')
  divInputGroup.setAttribute('class', 'inputGroup')
  divInputGroup.classList.add(verifyNoteChecked(note))
  console.log(divInputGroup)
  divInputGroup.id = note.id

  const checkbox = document.createElement('input')
  checkbox.setAttribute('class', 'check')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute(verifyNoteChecked(note), true)
  divInputGroup.appendChild(checkbox)

  const inputItemTitle = document.createElement('input')
  inputItemTitle.setAttribute('class', 'itemTitle')
  inputItemTitle.setAttribute('value', note.title)
  inputItemTitle.setAttribute('disabled', true)
  divInputGroup.appendChild(inputItemTitle)

  const inputItemDescription = document.createElement('input')
  inputItemDescription.setAttribute('class', 'itemDescription')
  inputItemDescription.setAttribute('value', note.description)
  inputItemDescription.setAttribute('disabled', true)
  divInputGroup.appendChild(inputItemDescription)

  const btnSave = document.createElement('button')
  btnSave.setAttribute('class', 'btn-save')
  btnSave.innerHTML = "<i class='ph-check'></i>"
  btnSave.style = 'display:none'
  divInputGroup.appendChild(btnSave)

  const btnEdit = document.createElement('button')
  btnEdit.setAttribute('class', 'btn-edit')
  btnEdit.innerHTML ="<i class='ph-pencil'></i>"
  divInputGroup.appendChild(btnEdit)
 
  const btnDelete = document.createElement('button')
  btnDelete.innerHTML = "<i class='ph-trash'></i>"
  divInputGroup.appendChild(btnDelete)

  editNote(btnEdit,divInputGroup,btnSave)
  updateNote(btnEdit,divInputGroup,btnSave)
  checkNote(checkbox, divInputGroup)
  deleteNote(btnDelete, divInputGroup)

  return divInputGroup;
}

////////////////////////////////////////////////////////////////////////////////////

//função para adicionar notas
function addNotes() {

  divNotes.innerHTML = ''

  for(let note of loggedUser.notes) {  
    const element = createElements(note)
    divNotes.appendChild(element)
  }


  console.log(loggedUser.notes);
 }


//////////////////////////////////////////////////////////////////////////////////// 

//Adicionar nova nota
formNewItem.addEventListener("submit", (e) => {
  e.preventDefault();
 
  let note = {
   id: createID().toString(),
   title: ItemTitle.value,
   description: ItemDescription.value,
   checked: false,
  };

  if (
   ItemTitle.value.trim().length === 0 ||
   ItemDescription.value.trim().length === 0
  ) {
   errorMessage.innerText = `Por favor digite a tarefa antes de adicionar.`;
   return
  }
   errorMessage.innerText = "";
 
  formNewItem.reset()

  loggedUser.notes.push(note)
  
  updateLocalStorage()
  addNotes()
  localStorage.setItem("lastID",note.id);
 });


function createID(){
  let id = Number(localStorage.getItem("lastID") ?? "0");
  return ++id;
}

function updateLocalStorage(){ 
  let user = users.find((user)=> user.username === loggedUser.username)
  let userIndex = users.findIndex((user)=> user.username === loggedUser.username)

  user.notes = loggedUser.notes
  users.splice(userIndex, 1, user)

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
}

//deletar nota
function deleteNote(deleteBtn, parentElement) {
  deleteBtn.addEventListener('click', ()=>{
    let index = loggedUser.notes.findIndex((note)=> note.id === parentElement.id)
    loggedUser.notes.splice(index, 1);
  
    parentElement.remove()
    updateLocalStorage()
  }) 
}

//Editar nota
function editNote(btnEdit, parentElement, btnSave) {
  btnEdit.addEventListener('click', ()=>{
    console.log(btnEdit)
    console.log(parentElement)
    //pegando os inputs a partir do botão editar
    let newTitle = parentElement.querySelector(".itemTitle");
    let newDescription = parentElement.querySelector(".itemDescription");
  
    btnEdit.style.display = 'none';
    btnSave.style.display = 'block'
    
    console.log(parentElement.querySelector(".inputGroup > .btn-save"))
    //.style.display = "block";
    newTitle.disabled = false;
    newDescription.disabled = false;
  })
 
 }

 //Atualizar Nota
 function updateNote(btnEdit,parentElement,btnSave) {
  //pegando os inputs dentro da div pai e o ID da div pelo botão editar
  btnSave.addEventListener('click', ()=>{
    let newTitle = parentElement.querySelector(".itemTitle");
    let newDescription = parentElement.querySelector(".itemDescription");
    let getId = parentElement.id;
  
    btnSave.style.display = "none";
    btnEdit.style.display = "block";
  
    newTitle.disabled = true;
    newDescription.disabled = true;
  
    //atualizando novos valores no objeto
    const note = loggedUser.notes.find((note)=> note.id === getId)
    note.title = newTitle.value;
    note.description = newDescription.value;
    updateLocalStorage()
  })
 }
 
 //Check Nota
 function checkNote(checkbox, parentElement) {
  checkbox.addEventListener('change',() => {
    let checkedNoteIndex = loggedUser.notes.findIndex((note)=> note.id === parentElement.id)

    if (checkbox.checked === true) {
      loggedUser.notes[checkedNoteIndex].checked = true;
      parentElement.classList.add('checked');     
     } else {
      loggedUser.notes[checkedNoteIndex].checked = false;
     parentElement.style.background = "#5c5c5c17";
     }

     updateLocalStorage()
    })
 } 

//////////////////////////////////////////////////////////////////

signOutBtn.addEventListener('click', ()=>{
  localStorage.removeItem("loggedUser")
  window.location.href = "index.html"
})