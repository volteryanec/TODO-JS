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
var parentDiv = document.getElementsByClassName("todoapp")[0].firstElementChild;
var footer = createFooter();
var toggleAll = document.getElementsByClassName("toggle-all")[0];

window.onload = function() {
  tasksList.forEach(function(task) {
    ulToDo.appendChild(createLiulToDo(task));
  });
  newTodo.onchange = addNewTodo;
  parentDiv.appendChild(footer);
  displayFoooter();
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
  countItemValue();
  displayFoooter();
  toggleAll.checked = false;
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
  countItemValue();
  hiddenButton();
  displayFoooter();
}
function changeOfTaskStatus(event) {
  li = event.target.parentElement.parentElement;
  checked = event.target.checked;
  li.className = checked ? "completed" : "";
  tasksList.forEach(function(task) {
    if (task.id == li.id) task.completed = checked;
  });
  countItemValue();
  hiddenButton();
  chekInputToggleAll();
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
function createFooter() {
  var footerElem = document.createElement("footer");
  footerElem.className = "footer";
  var spanTodoCount = document.createElement("span");
  spanTodoCount.className = "todo-count";
  var strong = document.createElement("strong");
  spanTodoCount.appendChild(strong);
  strong.insertAdjacentHTML(
    "afterEnd",
    "<span> </span><span>item</span><span> left</span>"
  );
  footerElem.appendChild(spanTodoCount);
  strong.textContent = getDefaultCountItem();
  footerElem.appendChild(createulTodoCount());

  return footerElem;
}
function countItemValue() {
  var strongValue = document.querySelector("strong");
  strongValue.textContent = getDefaultCountItem();
}
function getDefaultCountItem() {
  var count = 0;
  for (var i = 0; i < tasksList.length; i++) {
    if (tasksList[i].completed === false) {
      count++;
    }
  }
  return count;
}
function getClearActivTask() {
  var LiArr = ulToDo.getElementsByTagName("li");
  for (i = LiArr.length - 1; i >= 0; i--) {
    if (LiArr[i].className == "completed") {
      tasksList.splice(i, 1);
      LiArr[i].remove(LiArr[i]);
    }
  }
  hiddenButton();
  displayFoooter();
}
function hiddenButton() {
  buttonComplite = document.getElementsByClassName("clear-completed")[0];
  function checkCompleted(elem) {
    return elem.completed === true;
  }
  if (tasksList.some(checkCompleted) === true) buttonComplite.hidden = false;
  else {
    buttonComplite.hidden = true;
  }
}
function createulTodoCount() {
  ulTodoCount = document.createElement("ul");
  ulTodoCount.className = "filters";

  li = document.createElement("li");
  a = document.createElement("a");
  span = document.createElement("span");
  span.textContent = " ";
  a.href = "#/";
  a.className = "selected";
  a.textContent = "All";
  a.onclick = enableFilters;
  ulTodoCount.appendChild(li);
  li.appendChild(a);
  ulTodoCount.appendChild(span);

  li2 = document.createElement("li");
  ulTodoCount.appendChild(li2);
  a2 = document.createElement("a");
  a2.href = "#/active";
  a2.className = "";
  a2.textContent = "Active";
  a2.onclick = enableFilters;
  li2.appendChild(a2);
  span2 = document.createElement("span");
  span2.textContent = " ";
  ulTodoCount.appendChild(span2);

  li3 = document.createElement("li");
  ulTodoCount.appendChild(li3);
  a3 = document.createElement("a");
  a3.href = "#/completed";
  a3.className = "";
  a3.textContent = "Completed";
  a3.onclick = enableFilters;
  li3.appendChild(a3);

  buttonClearComplite = document.createElement("button");
  buttonClearComplite.className = "clear-completed";
  buttonClearComplite.textContent = "Clear completed";
  buttonClearComplite.onclick = getClearActivTask;
  ulTodoCount.appendChild(buttonClearComplite);

  return ulTodoCount;
}

function changeClassHref() {
  arrA = ulTodoCount.getElementsByTagName("a");

  for (i = 0; i < arrA.length; i++) {
    arrA[i].className = "";
    if (arrA[i].textContent == event.target.textContent)
      event.target.className = "selected";
  }
}
function enableFilters() {
  a = event.target.textContent;

  switch (a) {
    case "All":
      renderTasks(tasksList);
      break;
    case "Completed":
      renderTasks(tasksList);
      removeLiClassCompleted();
      break;
    case "Active":
      renderTasks(tasksList);
      removeLiClassEmpty();
      break;
  }
  changeClassHref();
}
function displayFoooter() {
  label = document.getElementsByTagName("label")[0];
  if (tasksList.length == 0) {
    footer.style.display = "none";
    label.style.display = "none";
  } else {
    footer.style.display = "block";
    label.style.display = "block";
  }
}
function allCheckLabel() {
  arrA = ulTodoCount.querySelectorAll("a");
  toggleAll.checked = toggleAll.checked == false ? true : false;
  tasksList.forEach(function(elem) {
    elem.completed = toggleAll.checked;
  });
  renderTasks(tasksList);

  arrA.forEach(function(a) {
    if ((a.className == "selected") & (a.text == "Completed")) {
      removeLiClassCompleted();
    }
    if ((a.text == "Active") & (a.className == "selected")) {
      removeLiClassEmpty();
    }
  });
  countItemValue();
  hiddenButton();
}
function renderTasks(tasks) {
  ulToDo.innerHTML = "";
  tasks.forEach(function(task) {
    ulToDo.appendChild(createLiulToDo(task));
  });
}
function chekInputToggleAll() {
  function checkCompleted(elem) {
    return elem.completed === true;
  }
  toggleAll.checked = tasksList.every(checkCompleted) === true ? true : false;
}
function removeLiClassCompleted() {
  ulToDo.querySelectorAll("li").forEach(function(elem) {
    if (elem.className == "") elem.remove(elem);
  });
}
function removeLiClassEmpty() {
  ulToDo.querySelectorAll("li").forEach(function(elem) {
    if (elem.className == "completed") elem.remove(elem);
  });
}
