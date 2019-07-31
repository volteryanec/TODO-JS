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
var toggleAll = document.getElementsByClassName("toggle-all")[0];
var hashA = window.location.hash;

function getArr(id) {
  arrJson = localStorage.getItem(id);
  return JSON.parse(arrJson);
}
function saveTolocalStorage(id, data) {
  localStorage.setItem(id, JSON.stringify(data));
}
function changeLocalStorage(id, key, newValue) {
  var arr = getArr(id);
  arr[key] = newValue;
  saveTolocalStorage(id, arr);
}
if (getArr("todo") != undefined) tasksList = getArr("todo");

window.onload = function() {
  renderTasks(tasksList);
  newTodo.onchange = addNewTodo;
  if (tasksList.length != 0) {
    createFooter();
    setDefaultFilreredOnload();
    ClearCompliteTask();
  }
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
  if (tasksList.length == 0) {
    createFooter();
    var label = document.createElement("label");
    label.htmlFor = '"toggle-all"';
    main = document.getElementsByClassName("main")[0];
    toggleAll.insertAdjacentElement("afterEnd", label);
  }
  var newTask = {};
  newTask.id = getId(tasksList);
  newTask.text = event.target.value;
  newTask.completed = false;
  tasksList.push(newTask);
  ulToDo.appendChild(createLiulToDo(newTask));
  event.target.value = "";
  countItemValue();
  saveTolocalStorage("todo", tasksList);
  chekedOnNewTodoFilter(this);
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
  ClearCompliteTask();
  removeFooterAndLabel();
}
function changeOfTaskStatus(event) {
  li = event.target.parentElement.parentElement;
  arrA = ulTodoCount.getElementsByTagName("a");
  checked = event.target.checked;
  li.className = checked ? "completed" : "";
  for (i = 0; i < arrA.length; i++) {
    if ((arrA[i].textContent != "All") & (arrA[i].className == "selected")) {
      tasksList.forEach(function(task) {
        if (task.id == li.id) task.completed = checked;
        li.remove(li);
      });
    } else
      tasksList.forEach(function(task) {
        if (task.id == li.id) task.completed = checked;
      });
    countItemValue();
    ClearCompliteTask();
    chekInputToggleAll();
    saveTolocalStorage("todo", tasksList);
  }
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
    deleteEmptyLi();
    inputEdit = li.getElementsByClassName("edit")[0];
    inputEdit.onblur = false;
    li = event.target.parentElement;
    li.className = li2.className == "completed editing" ? "completed" : "";
    label = li.querySelector("label");
    label.textContent = this.value;
  }
  changeElemText(tasksList);
  saveTolocalStorage("todo", tasksList);
}
function inputEditBlur() {
  deleteEmptyLi();
  if (event.target.value != "") {
    li = event.target.parentElement;
    label = li.querySelector("label");
    label.textContent = this.value;
    li.className = li.className == "completed editing" ? "completed" : "";
  }
  changeElemText(tasksList);
  saveTolocalStorage("todo", tasksList);
}
function deleteCurentLI() {
  tasksList.forEach(function(elem, index) {
    if (li.id == elem.id) {
      elem.id = index;
      tasksList.splice(index, 1);
      ulToDo.removeChild(li);
    }
  });
  saveTolocalStorage("todo", tasksList);
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
  parentDiv.appendChild(footerElem);
  return parentDiv;
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
  buttonClearComplite.remove(buttonClearComplite);
  removeFooterAndLabel();
  saveTolocalStorage("todo", tasksList);
}
function createulTodoCount() {
  ulTodoCount = document.createElement("ul");
  ulTodoCount.className = "filters";

  li = document.createElement("li");
  var a = document.createElement("a");
  span = document.createElement("span");
  span.textContent = " ";
  a.href = "#/";
  a.className = setAClassname(a);
  a.textContent = "All";
  a.onclick = enableFilters;
  ulTodoCount.appendChild(li);
  li.appendChild(a);
  ulTodoCount.appendChild(span);

  li2 = document.createElement("li");
  ulTodoCount.appendChild(li2);
  var a2 = document.createElement("a");
  a2.href = "#/active";
  a2.className = setAClassname(a2);
  a2.textContent = "Active";
  a2.onclick = enableFilters;
  li2.appendChild(a2);
  span2 = document.createElement("span");
  span2.textContent = " ";
  ulTodoCount.appendChild(span2);

  li3 = document.createElement("li");
  ulTodoCount.appendChild(li3);
  var a3 = document.createElement("a");
  a3.href = "#/completed";
  a3.className = setAClassname(a3);
  a3.textContent = "Completed";
  a3.onclick = enableFilters;
  li3.appendChild(a3);

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
      removeLiClass("");
      break;
    case "Active":
      renderTasks(tasksList);
      removeLiClass("completed");
      break;
  }
  changeClassHref();
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
      removeLiClass("");
    }
    if ((a.text == "Active") & (a.className == "selected")) {
      removeLiClass("completed");
    }
  });
  countItemValue();
  ClearCompliteTask();
  saveTolocalStorage("todo", tasksList);
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
function removeLiClass(classLi) {
  ulToDo.querySelectorAll("li").forEach(function(elem) {
    if (elem.className == classLi) elem.remove(elem);
  });
}
function changeElemText(task) {
  task.forEach(function(elem) {
    if (li.id == elem.id) {
      elem.text = label.textContent;
    }
  });
}
function deleteEmptyLi() {
  if (event.target.value == "") {
    deleteCurentLI();
  }
}
function setDefaultFilreredOnload() {
  switch (hashA) {
    case "#/completed":
      renderTasks(tasksList);
      removeLiClass("");
      break;
    case "#/active":
      renderTasks(tasksList);
      removeLiClass("completed");
      break;
  }
  countItemValue();
}
function setAClassname(a) {
  if (a.hash == location.hash) {
    return (a.className = "selected");
  }
}
function chekedOnNewTodoFilter(obj) {
  liOnNewTodo =
    obj.parentElement.nextElementSibling.lastElementChild.lastElementChild;

  if (location.hash == "#/completed") liOnNewTodo.remove(liOnNewTodo);
}
function ClearCompliteTask() {
  function checkCompleted(elem) {
    buttonClearComplite = document.getElementsByClassName("clear-completed")[0];
    return elem.completed === true;
  }
  if (
    tasksList.some(checkCompleted) === true &&
    buttonClearComplite == undefined
  ) {
    buttonClearComplite = document.createElement("button");
    buttonClearComplite.className = "clear-completed";
    buttonClearComplite.textContent = "Clear completed";
    buttonClearComplite.onclick = getClearActivTask;
    ulTodoCount.appendChild(buttonClearComplite);
  }
  if (
    tasksList.some(checkCompleted) === false &&
    document.getElementsByClassName("clear-completed")[0] != undefined
  )
    buttonClearComplite.remove(buttonClearComplite);
}
function removeFooterAndLabel() {
  footer = document.getElementsByClassName("footer")[0];
  label = document.getElementsByTagName("label")[0];
  if (tasksList == 0) {
    footer.remove(footer);
    label.remove(label);
  }
}
