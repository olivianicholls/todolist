let tasklist = {
  tasks: [],
  addTask: function(taskText) {
    this.tasks.push({
      taskText: taskText
    });
  },
  deleteTask: function(position) {
    this.tasks.splice(position, 1);
  }
};

let handlers = {
  addTask: function() {
    let addTaskTextInput = document.getElementById("addTaskTextInput");
    tasklist.addTask(addTaskTextInput.value);
    addTaskTextInput.value = "";
    view.displayTasks();
  },
  toggleAll: function() {
    let totalTasks = tasklist.tasks.length;
    let completedTasks = 0;

    for (let i = 0; i < tasklist.tasks.length; i++) {
      let tasksSelects = document.getElementsByClassName("toggleButton")[i];
      if (tasksSelects.selectedIndex !== 3) {
        tasksSelects.selectedIndex = 3;
      } else {
        tasksSelects.selectedIndex = 0;
      }
    }
  },
  deleteTask: function(position) {
    tasklist.deleteTask(position);
    view.displayTasks();
  },
  filterTasks: function(text) {
    let filters = document.getElementById("filter-buttons");
    filters.addEventListener("click", function(event) {
      let elementClicked = event.target;
      handlers.showAll();

      for (let i = 0; i < tasklist.tasks.length; i++) {
        let tasksSelects = document.getElementsByClassName("toggleButton")[i];
        let task = document.getElementsByTagName("li")[i];
        let taskOption = "";

        if (tasksSelects.selectedIndex === 0) {
          taskOption = "New";
        } else if (tasksSelects.selectedIndex === 1) {
          taskOption = "Doing";
        } else if (tasksSelects.selectedIndex === 2) {
          taskOption = "Moved";
        } else if (tasksSelects.selectedIndex === 3) {
          taskOption = "Done";
        }

        let hide = function() {
          task.style.display = "none";
        };

        if (elementClicked.textContent !== taskOption) {
          hide(task[i]);
        }
      }
    });
  },
  showAll: function() {
    for (let i = 0; i < tasklist.tasks.length; i++) {
      let tasks = document.getElementsByTagName("li");

      let show = function() {
        tasks[i].style.display = "block";
      };
      show(tasks);
    }
  },
  start: function() {
    let instructions = document.getElementById('instructions');
    let instructionsButton = document.getElementById('instructionsButton');
    let listWrapper = document.getElementById('list-wrapper');
    instructions.style.display = 'none'
    instructionsButton.style.display = 'block'
    listWrapper.style.display = 'block';
  },
  showInstructions: function() {
    let instructions = document.getElementById('instructions');
    let instructionsButton = document.getElementById('instructionsButton');
    let listWrapper = document.getElementById('list-wrapper');
    instructions.style.display = 'block'
    instructionsButton.style.display = 'none'
    listWrapper.style.display = 'none';
  }
};

let view = {
  displayTasks: function() {
    let tasksUl = document.getElementById("tasklist");
    tasksUl.innerHTML = "";

    tasklist.tasks.forEach(function(task, position) {
      let tasksLi = document.createElement("li");
      let tasksText = document.createElement("p");
      tasksLi.id = position;

      tasksText.className = "task";
      tasksText.textContent = task.taskText;
      tasksLi.setAttribute("contentEditable", true);
      tasksLi.appendChild(tasksText);
      tasksLi.appendChild(this.createDeleteButton());
      tasksLi.appendChild(this.createToggleButton());

      tasksUl.appendChild(tasksLi);
    }, this);
  },
  createDeleteButton: function() {
    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "X";
    deleteTaskButton.className = "deleteButton";
    return deleteTaskButton;
  },
  createToggleButton: function() {
    let toggleTaskList = document.createElement("select");
    let toggleCompleteOptionDone = document.createElement("option");
    let toggleCompleteOptionDoing = document.createElement("option");
    let toggleCompleteOptionNotDone = document.createElement("option");
    let toggleCompleteOptionForward = document.createElement("option");

    toggleTaskList.className = "toggleButton";
    toggleCompleteOptionDone.id = "done";
    toggleCompleteOptionDoing.id = "doing";
    toggleCompleteOptionNotDone.id = "new";
    toggleCompleteOptionForward.id = "moved";

    toggleCompleteOptionDone.textContent = "X";
    toggleCompleteOptionDoing.textContent = "\\";
    toggleCompleteOptionNotDone.textContent = "O";
    toggleCompleteOptionForward.textContent = ">";

    toggleTaskList.appendChild(toggleCompleteOptionNotDone);
    toggleTaskList.appendChild(toggleCompleteOptionDoing);
    toggleTaskList.appendChild(toggleCompleteOptionForward);
    toggleTaskList.appendChild(toggleCompleteOptionDone);

    return toggleTaskList;
  },

  setUpEventListeners: function() {
    let tasksUl = document.getElementById("tasklist");
    tasksUl.addEventListener("click", function(event) {
      let elementClicked = event.target;

      if (elementClicked.className === "deleteButton") {
        handlers.deleteTask(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
