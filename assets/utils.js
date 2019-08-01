function getId(tasksList) {
  if (!tasksList.length) return "1";
  var id;
  tasksList.forEach(function(task) {
    if (task.id >= tasksList.length) id = +task.id + 1;
  });

  return String(id);
}

function chekInputToggleAll() {
  function checkCompleted(elem) {
    return elem.completed === true;
  }
  toggleAll.checked = tasksList.every(checkCompleted) === true ? true : false;
}

function chekedOnNewTodoFilter(obj) {
  liOnNewTodo =
    obj.parentElement.nextElementSibling.lastElementChild.lastElementChild;

  if (location.hash == "#/completed") liOnNewTodo.remove(liOnNewTodo);
}

function removeFooterAndLabel() {
  footer = document.getElementsByClassName("footer")[0];
  if (tasksList == 0) {
    footer.remove(footer);
    main.remove(main);
  }
}
