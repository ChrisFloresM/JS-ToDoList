/*

const inputTask = document.querySelector('#input-task');
const addButton = document.querySelector('#add-task-button');
const taskList = document.querySelector('#task-list');
let tasksObjs = [];

addButton.addEventListener('click', addTaskListener);
retrieveFromStorage();

/!* Prorotype for tasks objects *!/
function TaskObject() {
    this.description = inputTask.value;
    this.completed = false;
    this.id = Date.now();
}

/!* Event listeners *!/
function addTaskListener() {
    if (inputTask.value) {
        const newTaskObj = new TaskObject(inputTask.value);
        tasksObjs.push(newTaskObj);

        saveToLocalStorage();

        createTask(newTaskObj);

        inputTask.value = '';
    }
}

function checkTaskListener() {
    const parent = this.closest('.list-container__task');
    const taskId = parent.dataset.taskId;

    let taskToModify = tasksObjs.find(task => task.id === Number(taskId));
    taskToModify.completed = this.checked;
    saveToLocalStorage();

    checkTask(this);
}

function deleteTaskListener(event) {
    const button = event.target;
    const parentTask = button.closest('.list-container__task');

    const taskId = parentTask.dataset.taskId;
    tasksObjs = tasksObjs.filter(task => task.id !== Number(taskId));
    saveToLocalStorage();

    parentTask.remove();
}

/!* Auxiliar functions *!/
function createTask(taskObj) {
    const newTask = document.createElement('li');
    newTask.classList.add('list-container__task');
    newTask.dataset.taskId = taskObj.id;
    newTask.innerHTML =
        `<div class="task-container">
          <input class="list-container__check-task" type="checkbox">
          <span class="list-container__task-text task">${taskObj.description}</span>
        </div>
        <button class="list-container__task-delete delete-btn">
          <ion-icon name="trash-outline"></ion-icon>
        </button>`


    const taskCheckbox = newTask.querySelector('.list-container__check-task');
    taskCheckbox.checked = taskObj.completed;

    addListeners(newTask);
    checkTask(taskCheckbox);
    taskList.appendChild(newTask);
}

function checkTask(taskCheckbox) {
    const parentTask = taskCheckbox.closest('.list-container__task');

    if (taskCheckbox.checked) {
        parentTask.classList.add('checked');
    } else {
        parentTask.classList.remove('checked');
    }
}

function addListeners(task) {
    const deleteButton = task.querySelector('button');
    deleteButton.addEventListener('click', deleteTaskListener);

    const checkBox = task.querySelector('input');
    checkBox.addEventListener('click', checkTaskListener);
}

function saveToLocalStorage() {
    localStorage.setItem("objects", JSON.stringify(tasksObjs));
}

function retrieveFromStorage() {
    try {
        const storedData = localStorage.getItem("objects");
        tasksObjs = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error("Error al parsear datos de localStorage:", error);
        tasksObjs = [];
    }

    if (tasksObjs.length > 0) {
        tasksObjs.forEach(object => {
            createTask(object);
        });
    }
}*/