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
            <input onchange='checkNote' type="checkbox" class="check" checked=${note.checked}/>
            <input disabled class="itemTitle" value="${note.title}"></input>
            <input disabled class="itemDescription" value="${note.description}"></input>
            <button class='btn-edit' onclick='editNote(this)'><i class="ph-pencil"></i></button>
            <button class='btn-save' onclick='updateNote(this)' style='display:none'><i class="ph-check"></i></button>
            <button onclick='deleteNote(this)'><i class="ph-trash"></i></button>
            </div>`;
    console.log(note.checked);
  });
}

formNewItem.addEventListener("submit", (e) => {
  e.preventDefault();

  note = {
    title: ItemTitle.value,
    description: ItemDescription.value,
    checked: true,
  };

  if (
    !ItemTitle.value ||
    ItemTitle.value === " " ||
    !ItemDescription.value ||
    ItemDescription.value === " "
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

function deleteNote(deletedElement) {
  notes.splice(+deletedElement.parentElement.id, 1);
  renderNotes();
  //   console.log(+deletedElement.parentElement.id);
  console.log(notes);
}

function editNote(editBtn) {
  let newTitle = editBtn.parentElement.querySelector(".itemTitle");
  let newDescription = editBtn.parentElement.querySelector(".itemDescription");

  editBtn.style.display = "none";
  editBtn.parentElement.querySelector(".btn-save").style.display = "block";

  newTitle.disabled = false;
  newDescription.disabled = false;
}

function updateNote(updateBtn) {
  let newTitle = updateBtn.parentElement.querySelector(".itemTitle");
  let newDescription =
    updateBtn.parentElement.querySelector(".itemDescription");
  let getId = +updateBtn.parentElement.id;

  updateBtn.style.display = "none";
  updateBtn.parentElement.querySelector(".btn-edit").style.display = "block";

  newTitle.disabled = true;
  newDescription.disabled = true;

  note = notes[getId];
  note.title = newTitle.value;
  note.description = newDescription.value;

  console.log(notes);
}

function checkNote(checkBtn) {}
