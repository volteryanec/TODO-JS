function addNewTodo(event) {
  if (tasksList.length === 0) {
    parentDiv.insertAdjacentElement("beforeEnd", main);
    label.htmlFor = "toggle-all";
    main.insertAdjacentElement("afterBegin", label);
    main.insertAdjacentElement("afterBegin", toggleAll);
    toggleAll.checked = false;
    createFooter();
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
