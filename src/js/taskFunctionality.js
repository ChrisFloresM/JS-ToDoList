import {retrieveFromStorage, saveToLocalStorage} from "./localStorageManager.js";
import {getCurrentTheme} from "./themeManager.js";
import {updateTaskCount} from "./itemsCount.js";
import {setFilter} from "./filterButtons.js";

const taskList = document.querySelector('.main__task-list');
const inputTask = document.querySelector('.main__input-task');
const checkBoxInput = document.querySelector('.main__input .task-check');

let tasksObjs = [];

/* Prototype for tasks objects */
function TaskObject() {
    this.description = inputTask.value;
    this.completed = checkBoxInput.checked;
    this.id = Date.now();
}

init();

function init() {
    tasksObjs = retrieveFromStorage("taskObjects", []);

    if (tasksObjs.length > 0) {
        tasksObjs.forEach(object => {
            createTask(object);
        });
    }
}

inputTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTaskListener();
    }
});

/* Functions and listeners*/
function addTaskListener() {
    if (inputTask.value) {
        const newTaskObj = new TaskObject(inputTask.value);
        tasksObjs.push(newTaskObj);
        saveToLocalStorage("taskObjects", JSON.stringify(tasksObjs));
        createTask(newTaskObj);
        inputTask.value = '';
    }
}

function createTask(taskObj) {
    const newTask = document.createElement('li');
    const theme = getCurrentTheme(taskObj);
    newTask.classList.add('main__task', 'task-container', 'change-theme', theme);
    newTask.dataset.taskId = taskObj.id;
    newTask.innerHTML =
        `<label class="main__task-label-checkbox">
		  <input class="task-check" type="checkbox" name="check">
		  <span class="task-check-style change-theme ${theme}"></span>
		</label>
		<p class="main__task-description task-text">${taskObj.description}</p>
		<button class="main__task-delete-button" type="button">
		  <ion-icon class="close-icon" name="close-outline"></ion-icon>
		</button>`

    const taskCheckbox = newTask.querySelector('.task-check');
    taskCheckbox.checked = taskObj.completed;

    addTaskListeners(newTask);
    taskList.appendChild(newTask);
    setFilter(newTask);

    if (!taskObj.completed) {
       updateTaskCount(taskObj.completed);
    }
}

function addTaskListeners(task) {
    const deleteButton = task.querySelector('button');
    deleteButton.addEventListener('click', deleteTaskListener);

    const checkBox = task.querySelector('input');
    checkBox.addEventListener('click', checkTaskListener);
}

function checkTaskListener() {
    const parent = this.closest('.main__task');
    const taskId = parent.dataset.taskId;

    let taskToModify = tasksObjs.find(task => task.id === Number(taskId));
    taskToModify.completed = this.checked;

    saveToLocalStorage("taskObjects", JSON.stringify(tasksObjs));
    updateTaskCount(taskToModify.completed);
    setFilter(parent);
}

function deleteTaskListener(event) {
    const button = event.target;
    const parentTask = button.closest('.main__task');
    const removeElement = true;
    let taskObj;

    const taskId = parentTask.dataset.taskId;
    taskObj = tasksObjs.find(task => task.id === Number(taskId));
    tasksObjs = tasksObjs.filter(task => task.id !== Number(taskId));

    saveToLocalStorage("taskObjects", JSON.stringify(tasksObjs));

    if (!taskObj.completed) {
        updateTaskCount(removeElement);
    }

    parentTask.remove();
}

