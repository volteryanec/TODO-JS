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
