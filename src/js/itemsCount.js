const itemCountElement = document.querySelector('.left-amount');
let taskCounter = 0;

export function updateTaskCount(checkedTask) {
    if (checkedTask) {
        taskCounter = Math.max(0, taskCounter - 1);
    } else {
        taskCounter++;
    }

    itemCountElement.textContent = taskCounter;
}