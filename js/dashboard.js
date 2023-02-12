const ItemTitle = document.querySelector("#newItemTitle");
const ItemDescription = document.querySelector("#newItemDescription");
const formNewItem = document.querySelector("#formNewItem");
const errorMessage = document.querySelector("#errorMessage");
const addBtn = document.querySelector("#add");
const divNotes = document.querySelector("#notes");

const notes = [];
let note;

function renderNotes() {
  divNotes.innerHTML = "";
  //para cada nota vai adicionar à divNotes um novo inputGroup
  notes.forEach((note, index) => {
    //note = cada objeto, index = indice de cada objeto
    divNotes.innerHTML += `<div id=${index} class="inputGroup">
            <input onchange='checkNote' type="checkbox" class="check" checked=${
              note.checked ? "checked" : ""
            }/>
            <input disabled class="itemTitle" value="${note.title}"></input>
            <input disabled class="itemDescription" value="${
              note.description
            }"></input>
            <button class='btn-edit' onclick='editNote(this)'><i class="ph-pencil"></i></button>
            <button class='btn-save' onclick='updateNote(this)' style='display:none'><i class="ph-check"></i></button>
            <button onclick='deleteNote(this)'><i class="ph-trash"></i></button>
            </div>`;
    console.log(note.checked);
  });
}

//Adicionar nova nota
formNewItem.addEventListener("submit", (e) => {
  e.preventDefault();

  note = {
    title: ItemTitle.value,
    description: ItemDescription.value,
    checked: "",
  };

  if (
    ItemTitle.value.trim().length === 0 ||
    ItemDescription.value.trim().length === 0
  ) {
    errorMessage.innerText = `Por favor digite a tarefa antes de adicionar.`;
  } else {
    errorMessage.innerText = "";

    notes.push(note);

    renderNotes();
  }
  ItemTitle.value = "";
  ItemDescription.value = "";

  console.log(notes);
});

//deletar nota
function deleteNote(deleteBtn) {
  //transformando o #id da div pai do botão em número e excluindo 1 item
  notes.splice(+deleteBtn.parentElement.id, 1);

  //Renderiza novamente as notas
  renderNotes();

  console.log(notes);
}

//Editar nota
function editNote(editBtn) {
  //pegando os inputs a partir do botão editar
  let newTitle = editBtn.parentElement.querySelector(".itemTitle");
  let newDescription = editBtn.parentElement.querySelector(".itemDescription");

  editBtn.style.display = "none";
  editBtn.parentElement.querySelector(".btn-save").style.display = "block";

  newTitle.disabled = false;
  newDescription.disabled = false;
}

//Atualizar Nota
function updateNote(updateBtn) {
  //pegando os inputs dentro da div pai e o ID da div pelo botão editar
  let newTitle = updateBtn.parentElement.querySelector(".itemTitle");
  let newDescription =
    updateBtn.parentElement.querySelector(".itemDescription");
  let getId = +updateBtn.parentElement.id;

  updateBtn.style.display = "none";
  updateBtn.parentElement.querySelector(".btn-edit").style.display = "block";

  newTitle.disabled = true;
  newDescription.disabled = true;

  //atualizando novos valores no objeto
  note = notes[getId];
  note.title = newTitle.value;
  note.description = newDescription.value;

  console.log(notes);
}

//Check Nota
function checkNote(checkBtn) {
  let isChecked = checkBtn.parentElement.querySelector(".check");
  note.checked = isChecked.value;
}