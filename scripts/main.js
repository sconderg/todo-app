/*
 **************************
 *  To-Do List Project    *
 *  Made By Amir Muhammad Abdelrhman
 *  Student Code:202320183
 *  Github: github.com/sconderg
 **************************
 */

// grab all main elements by id
const tasksContainer = document.getElementById("tasks");
const doneTasksContainer = document.getElementById("done_tasks");
const input = document.getElementById("input");
const addBtn = document.getElementById("add");

// tasks array, which firstly retieves the tasks from the local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

// function to render the tasks

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  doneTasksContainer.innerHTML = "";
  if (tasks.length > 0) {
    const TasksTitle = document.createElement("h2");
    TasksTitle.textContent = `Tasks - ${tasks.length}`;
    tasksContainer.appendChild(TasksTitle);
    tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      taskElement.innerHTML = `
            ${task}
            <span
            ><button type="button" data-testid="done" class="done" onclick="doneTask(${index})">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <polyline
                  points="216 72 104 184 48 128"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></polyline>
              </svg></button
            ><button type="button" data-testid="remove" class="delete" onclick="deleteTask(${index})">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="216"
                  y1="56"
                  x2="40"
                  y2="56"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <line
                  x1="88"
                  y1="24"
                  x2="168"
                  y2="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></line>
                <path
                  d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="16"
                ></path>
              </svg></button
          ></span>
            `;
      tasksContainer.appendChild(taskElement);
    });
  }
};

// function to add a task
const addTask = () => {
  const task = input.value;
  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
    input.value = "";
  }
};

// function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
};

// function to mark a task as done
const doneTask = (index) => {
  const doneTask = tasks.splice(index, 1);
  doneTasks.push(doneTask);
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
};

// function to render the done tasks
const renderDoneTasks = () => {
  doneTasksContainer.innerHTML = "";
  if (doneTasks.length > 0) {
    const doneTasksTitle = document.createElement("h2");
    doneTasksTitle.textContent = `Done Tasks - ${doneTasks.length}`;
    doneTasksContainer.appendChild(doneTasksTitle);
    doneTasks.forEach((task, index) => {
      const doneTaskElement = document.createElement("div");
      doneTaskElement.classList.add("task");
      doneTaskElement.classList.add("done");
      doneTaskElement.innerHTML = `
            ${task}
            <span
              ><button type="button" data-testid="undo" class="undo" onclick="undoTask(${index})">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <polyline
                    points="80 136 32 88 80 40"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></polyline>
                  <path
                    d="M80,200h88a56,56,0,0,0,56-56h0a56,56,0,0,0-56-56H32"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></path>
                </svg></button
            ></span>
            `;
      doneTasksContainer.appendChild(doneTaskElement);
    });
  }
};

// function to undo a task
const undoTask = (index) => {
  const undoneTask = doneTasks.splice(index, 1);
  tasks.push(undoneTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  render();
};

// render the tasks and done tasks
const render = () => {
  renderTasks();
  renderDoneTasks();
};

// event listeners
addBtn.addEventListener("click", addTask);
render();
