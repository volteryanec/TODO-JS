var tasksList = [
  { id: "1", text: "synthesize", completed: true },
  { id: "2", text: "override", completed: false },
  { id: "3", text: "index", completed: true },
  { id: "4", text: "compress", completed: false },
  { id: "5", text: "compress", completed: false },
  { id: "6", text: "override", completed: true },
  { id: "7", text: "generate", completed: true }
];

var ulToDo = document.getElementsByClassName("todo-list")[0];
var newTodo = document.getElementsByClassName("new-todo")[0];

window.onload = function() {
  tasksList.forEach(function(task) {
    ulToDo.appendChild(createLiulToDo(task));
  });
  newTodo.onchange = addNewTodo;
};

function createLiulToDo(task) {
  var li = document.createElement("li");

  var classNameli = task.completed ? "completed" : "";
  var statusTask = task.completed ? "checked" : "";
  li.className = classNameli;
  li.id = task.id;

  var div = document.createElement("div");
  div.className = "view";

  var toggle = document.createElement("input");
  toggle.className = "toggle";
  toggle.type = "checkbox";
  toggle.onchange = changeOfTaskStatus;
  toggle.checked = statusTask;

  var label = document.createElement("label");
  label.innerHTML = task.text;
  label.ondblclick = changeClassLi;

  var buttonDeleteLi = document.createElement("button");
  buttonDeleteLi.className = "destroy";
  buttonDeleteLi.id = task.id;
  buttonDeleteLi.onclick = deleteCurentTask;

  var input = document.createElement("input");
  input.className = "edit";
  input.innerHTML = task.text;
  input.onkeypress = changeInput;
  input.onblur = inputEditBlur;

  li.appendChild(div);
  li.appendChild(input);
  div.appendChild(toggle);
  div.appendChild(label);
  div.appendChild(buttonDeleteLi);
  return li;
}
function addNewTodo(event) {
  var newTask = {};
  newTask.id = getId(tasksList);
  newTask.text = event.target.value;
  newTask.completed = false;
  tasksList.push(newTask);
  ulToDo.appendChild(createLiulToDo(newTask));
  event.target.value = "";
}
function getId(tasksList) {
  if (!tasksList.length) return "1";
  var id;
  tasksList.forEach(function(task) {
    if (task.id >= tasksList.length) id = +task.id + 1;
  });

  return String(id);
}
function deleteCurentTask(event) {
  li = event.target.parentElement.parentElement;
  deleteCurentLI();
}
function changeOfTaskStatus(event) {
  var li = event.target.parentElement.parentElement;
  var checked = event.target.checked;
  li.className = checked ? "completed" : "";
}
function changeClassLi() {
  li = event.target.parentElement.parentElement;
  li.className = li.className ? li.className + " editing" : "editing";
  li.lastElementChild.value = this.textContent;
  inputEdit = li.getElementsByClassName("edit")[0];
  inputEdit.focus();
}
function changeInput() {
  if (event.key === "Enter") {
    if (event.target.value == "") {
      deleteCurentLI();
    }
    inputEdit = li.getElementsByClassName("edit")[0];
    inputEdit.onblur = false;
    li = event.target.parentElement;
    label = li.querySelector("label");
    label.textContent = this.value;
    li.className = li.className == "completed editing" ? "completed" : "";
  }
}
function inputEditBlur() {
  li = event.target.parentElement;
  if (event.target.value == "") {
    deleteCurentLI();
  }
  if (event.target.value != "") {
    label = li.querySelector("label");
    label.textContent = this.value;
    li = event.target.parentElement;
    li.className = li.className == "completed editing" ? "completed" : "";
  }
}
function deleteCurentLI() {
  tasksList.forEach(function(elem, index) {
    if (li.id == elem.id) {
      elem.id = index;
      tasksList.splice(index, 1);
      ulToDo.removeChild(li);
    }
  });
}
