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

function changeClassHref() {
  arrA = ulTodoCount.getElementsByTagName("a");

  for (i = 0; i < arrA.length; i++) {
    arrA[i].className = "";
    if (arrA[i].textContent == event.target.textContent)
      event.target.className = "selected";
  }
}

function setAClassname(a) {
  if (a.hash == location.hash) {
    return (a.className = "selected");
  }
}
