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

function changeClassLi() {
  li = event.target.parentElement.parentElement;
  li.className = li.className ? li.className + " editing" : "editing";
  li.lastElementChild.value = this.textContent;
  inputEdit = li.getElementsByClassName("edit")[0];
  inputEdit.focus();
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

function removeLiClass(classLi) {
  ulToDo.querySelectorAll("li").forEach(function(elem) {
    if (elem.className == classLi) elem.remove(elem);
  });
}
