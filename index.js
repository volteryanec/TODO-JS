var tasksList = [
    { id: "1", text: "synthesize", completed: true },
    { id: "2", text: "override", completed: false },
    { id: "3", text: "index", completed: true },
    { id: "4", text: "compress", completed: false },
    { id: "5", text: "compress", completed: false },
    { id: "6", text: "override", completed: true },
    { id: "7", text: "generate", completed: true }
  ];
  
  var ulToDo = getTodoList();
  
  window.onload = function() {
    tasksList.forEach(function(task) {
      ulToDo.appendChild(createLiulToDo(task));
    });
  };
  function getTodoList() {
    return document.getElementsByClassName("todo-list")[0];
  }
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
  
    toggle.checked = statusTask;
  
    var label = document.createElement("label");
    label.innerHTML = task.text;
  
    var buttonDeleteLi = document.createElement("button");
    buttonDeleteLi.className = "destroy";
    buttonDeleteLi.id = task.id;
  
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
  