const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
const elButtons = document.querySelector(".js-buttons");

const elAll = document.querySelector(".js-all");
const elCompleted = document.querySelector(".js-completed");
const elUnCompleted = document.querySelector(".js-unCompleted");

const elAllbtn = document.querySelector(".js-all-btn");
const elCompletedbtn = document.querySelector(".js-completed-btn");
const elUnCompletedbtn = document.querySelector(".js-unCompleted-btn");

let todos = [];

let mainCheckeds = 0;

let completedTodo;
let unCompletedTodo = todos;

const renderTodo = (array, node) => {
  node.innerHTML = "";
  array.forEach((el) => {
    let newTodo = document.createElement("li");
    newTodo.setAttribute(
      "class",
      "list-group-item d-flex align-items-center justfiy-content-between flex-grow-1"
    );
    let spanText = document.createElement("span");

    let newInput = document.createElement("input");
    newInput.setAttribute("type", "checkbox");
    newInput.setAttribute("class", "form-check-input me-3 js-check");

    let editButton = document.createElement("button");
    editButton.setAttribute("class", "btn btn-warning ms-auto js-edit-btn");
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-danger ms-1 js-delete-btn");
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.todoId = el.id;
    editButton.dataset.todoId = el.id;
    newInput.dataset.todoId = el.id;

    node.appendChild(newTodo);

    spanText.textContent = el.text;

    newTodo.appendChild(newInput);
    newTodo.appendChild(spanText);
    newTodo.appendChild(editButton);
    newTodo.appendChild(deleteButton);

    if (el.isCompleted) {
      newInput.checked = true;
      spanText.style.textDecoration = "line-through";
    }

    elAll.textContent = todos.length;
    elUnCompleted.textContent = todos.length;
    elInput.value = "";
  });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let InputValue = elInput.value;

  const todo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    text: InputValue,
    isCompleted: false,
  };
  todos.push(todo);
  renderTodo(todos, elList);

  elInput.value = "";
});

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-delete-btn")) {
    const todoId = evt.target.dataset.todoId;
    const findedIndex = todos.findIndex((item) => item.id == todoId);

    todos.splice(findedIndex, 1);
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-edit-btn")) {
    const todoId = evt.target.dataset.todoId;
    const findedItem = todos.find((item) => item.id == todoId);
    const newText = prompt("Yangi todo kiriting", findedItem.text);
    findedItem.text = newText;
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-check")) {
    const todoId = +evt.target.dataset.todoId;
    const findedItem = todos.find((item) => item.id === todoId);
    findedItem.isCompleted = !findedItem.isCompleted;

    renderTodo(todos, elList);

    if (findedItem.isCompleted == true) {
      mainCheckeds += 1;
    }
    if (findedItem.isCompleted == false) {
      mainCheckeds -= 1;
    }
    elCompleted.textContent = mainCheckeds;
    elUnCompleted.textContent = todos.length - mainCheckeds;
  }
});

elButtons.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-all-btn")) {
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-completed-btn")) {
    if (elCompleted.textContent != 0) {
      const Filtered = todos.filter((el) => el.isCompleted == true);
      console.log(todos);
      elCompleted.textContent = Filtered.length;
      renderTodo(Filtered, elList);
    }
  }
  if (evt.target.matches(".js-unCompleted-btn")) {
    if (elUnCompleted.textContent != 0) {
      const Filtered = todos.filter((el) => el.isCompleted == false);
      elUnCompleted.textContent = Filtered.length;
      renderTodo(Filtered, elList);
    }
  }
});
