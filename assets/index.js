var tasksList = [
  { id: "1", text: "synthesize", completed: true },
  { id: "2", text: "override", completed: false },
  { id: "3", text: "index", completed: true },
  { id: "4", text: "compress", completed: false },
  { id: "5", text: "compress", completed: false },
  { id: "6", text: "override", completed: true },
  { id: "7", text: "generate", completed: true }
];
var main = document.getElementsByClassName("main")[0];
var ulToDo = document.getElementsByClassName("todo-list")[0];
var newTodo = document.getElementsByClassName("new-todo")[0];
var parentDiv = document.getElementsByClassName("todoapp")[0].firstElementChild;
var toggleAll = document.getElementsByClassName("toggle-all")[0];
var label = document.getElementsByTagName("label")[0];
var hashA = window.location.hash;

window.onload = function() {
  if (tasksList == 0) {
    main.remove(main);
  }
  renderTasks(tasksList);
  newTodo.onchange = addNewTodo;
  if (tasksList.length != 0) {
    createFooter();
    setDefaultFilreredOnload();
    ClearCompliteTask();
    chekInputToggleAll();
  }
};
