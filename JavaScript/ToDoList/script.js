const STORAGE_KEY = "todoTasks";

function createTaskElement(taskText, isCompleted = false) {
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  const taskLabel = document.createElement("p");
  taskLabel.classList.add("task-text", "mb-0");
  taskLabel.innerText = taskText;

  if (isCompleted) {
    taskLabel.classList.add("completed");
  }

  const actionWrap = document.createElement("div");
  actionWrap.classList.add("task-actions");

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("btn", "btn-complete");
  completeBtn.innerHTML = `<i class="bi bi-check2-circle me-1"></i>Done`;
  completeBtn.onclick = () => {
    taskLabel.classList.toggle("completed");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-delete");
  deleteBtn.innerHTML = `<i class="bi bi-trash3 me-1"></i>Delete`;
  deleteBtn.onclick = () => {
    listItem.remove();
    updateTaskCount();
    saveTasks();
  };

  actionWrap.appendChild(completeBtn);
  actionWrap.appendChild(deleteBtn);

  listItem.appendChild(taskLabel);
  listItem.appendChild(actionWrap);

  return listItem;
}

function AddTask() {
  const input = document.getElementById("NewTask");
  const task = input.value.trim();

  if (!task) {
    return;
  }

  const taskList = document.getElementById("TaskList");
  taskList.appendChild(createTaskElement(task));
  input.value = "";
  updateTaskCount();
  saveTasks();
}

function updateTaskCount() {
  const totalTasks = document.getElementById("TaskList").children.length;
  document.getElementById("TaskCount").innerText = totalTasks;

  const completedTasks = document.querySelectorAll(".task-text.completed").length;
  const pendingTasks = totalTasks - completedTasks;

  document.getElementById("TotalTasks").innerText = totalTasks;
  document.getElementById("CompletedTasks").innerText = completedTasks;
  document.getElementById("PendingTasks").innerText = pendingTasks;

  const emptyState = document.getElementById("EmptyState");
  emptyState.style.display = totalTasks === 0 ? "flex" : "none";
}

function saveTasks() {
  const tasks = [];
  const allTasks = document.querySelectorAll("#TaskList .todo-item");

  allTasks.forEach((item) => {
    const label = item.querySelector(".task-text");
    tasks.push({
      text: label.innerText,
      completed: label.classList.contains("completed"),
    });
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const taskList = document.getElementById("TaskList");

  savedTasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task.text, task.completed));
  });

  updateTaskCount();
}

document.getElementById("NewTask").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    AddTask();
  }
});

loadTasks();
