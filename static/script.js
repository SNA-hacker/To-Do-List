async function fetchTasks() {
  let response = await fetch("/tasks");
  let tasks = await response.json();

  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
            <span>${task}</span>
            <div class="task-buttons">
                <button class="edit-btn" onclick="editTask(${index}, '${task.replace(/'/g, "\\'")}')">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

    list.appendChild(li);
  });
}

async function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task.trim() === "") {
    alert("Enter a task");
    return;
  }

  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: task }),
  });

  input.value = "";
  fetchTasks();
}

async function deleteTask(index) {
  await fetch(`/tasks/${index}`, { method: "DELETE" });
  fetchTasks();
}

async function editTask(index, currentTask) {
  let newTask = prompt("Edit your task:", currentTask);

  if (newTask === null) return;
  if (newTask.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }

  await fetch(`/tasks/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: newTask }),
  });

  fetchTasks();
}

window.onload = fetchTasks;
