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
console.log(ulToDo);

window.onload = function() {
  tasksList.forEach(function(task) {
    ulToDo.appendChild(createLiulToDo(task));
  });
};

function createLiulToDo(task) {
  newTodo.onchange = addNewTodo;
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

  toggle.checked = statusTask;
  toggle.onchange = changeOfTaskStatus;

  var label = document.createElement("label");
  label.innerHTML = task.text;

  var buttonDeleteLi = document.createElement("button");
  buttonDeleteLi.className = "destroy";
  buttonDeleteLi.id = task.id;
  buttonDeleteLi.onclick = deleteCurentTask;

  var input = document.createElement("input");
  input.className = "edit";
  input.innerHTML = task.text;

  li.appendChild(div);
  li.appendChild(input);
  div.appendChild(toggle);
  div.appendChild(label);
  div.appendChild(buttonDeleteLi);
  return li;
}

var newTodo = document.getElementsByClassName("new-todo")[0];

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
  li = event.target.offsetParent;
  tasksList.forEach(function(elem, index) {
    if (event.target.id == elem.id) {
      elem.id = index;
      tasksList.splice(index, 1);
      ulToDo.removeChild(li);
    }
  });
}

function changeOfTaskStatus(event) {
  var li = event.target.offsetParent;
  var checked = event.target.checked;
  li.className = checked ? "completed" : "";
}

