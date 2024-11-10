
const inputTask = document.querySelector('#input-task');
const addButton = document.querySelector('#add-task-button');
const taskList = document.querySelector('#task-list');

addButton.addEventListener('click', addTask);

addDeleteListeners();

function addTask() {
    if (inputTask.value) {
        const newTask = document.createElement('li');
        newTask.classList.add('list-container__task');
        newTask.innerHTML =
            `<div class="task-container">
              <input class="list-container__check-task" type="checkbox">
              <span class="list-container__task-text task">${inputTask.value}</span>
            </div>
            <button class="list-container__task-delete delete-btn">
              <ion-icon name="trash-outline"></ion-icon>
            </button>`
        taskList.appendChild(newTask);
        const deleteButton = newTask.querySelector('button');
        deleteButton.addEventListener('click', deleteTask);
    }
}

function deleteTask(event) {
    const button = event.target;
    const parentTask = button.closest('.list-container__task');
    parentTask.remove();
}

function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.list-container__task-delete');
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deleteTask));
}
