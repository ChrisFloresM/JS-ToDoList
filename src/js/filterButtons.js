import {retrieveFromStorage, saveToLocalStorage} from "./localStorageManager.js";

const filterButtonAll = document.querySelector('.main__filter-button--all');
const filterButtonActive = document.querySelector('.main__filter-button--active');
const filterButtonCompleted = document.querySelector('.main__filter-button--completed');

let currentFilterObj = retrieveFromStorage("filter", {currentFilter: "all"});

setFilterButton();
addButtonsListeners();

function setFilterButton() {
    switch (currentFilterObj.currentFilter) {
        case 'all':
            filterButtonAll.classList.add("active-filter");
            filterButtonActive.classList.remove("active-filter");
            filterButtonCompleted.classList.remove("active-filter");
            break;
        case "active":
            filterButtonActive.classList.add("active-filter");
            filterButtonAll.classList.remove("active-filter");
            filterButtonCompleted.classList.remove("active-filter");
            break;
        case "completed":
            filterButtonCompleted.classList.add("active-filter");
            filterButtonAll.classList.remove("active-filter");
            filterButtonActive.classList.remove("active-filter");
            break;
        default:
            filterButtonAll.classList.remove("active-filter");
            filterButtonActive.classList.remove("active-filter");
            filterButtonCompleted.classList.remove("active-filter");
            break;
    }
}

function addButtonsListeners() {
    filterButtonAll.addEventListener('click', filterAllListener);
    filterButtonActive.addEventListener('click', filterActiveListener);
    filterButtonCompleted.addEventListener('click', filterCompletedListener);
}

function filterAllListener() {
    setUpFilter("all",'.filtered' );
}

function filterActiveListener() {
    setUpFilter("active",'.main__task' );
}

function filterCompletedListener() {
    setUpFilter("completed",'.main__task' );
}

function setUpFilter(currentFilter, targetElements) {
    currentFilterObj.currentFilter = currentFilter;
    const currentTaskList = document.querySelectorAll(targetElements);

    if (currentTaskList) {
        currentTaskList.forEach(task => {
            setFilter(task);
        });
    }

    setFilterButton();
    saveToLocalStorage("filter", JSON.stringify(currentFilterObj));
}

export function setFilter(task) {
    const inputElement = task.querySelector('.task-check').checked;

    if (currentFilterObj.currentFilter === "active") {
        if (inputElement) {
            task.classList.add('filtered');
        } else {
            task.classList.remove('filtered');
        }
    } else if (currentFilterObj.currentFilter === "completed") {
        if (!inputElement) {
            task.classList.add('filtered');
        } else {
            task.classList.remove('filtered');
        }
    } else {
        task.classList.remove('filtered');
    }

    fixRoundedElements();
}


export function fixRoundedElements() {
    const notFilteredElements = document.querySelectorAll('li:not(.filtered)');
    const optionsElement = document.querySelector('.main__options');

    if (notFilteredElements.length === 0) {
        optionsElement.style.borderTopLeftRadius = "8px";
        optionsElement.style.borderTopRightRadius = "8px";

        return;
    }

    optionsElement.style.borderTopLeftRadius = "0px";
    optionsElement.style.borderTopRightRadius = "0px";

    notFilteredElements.forEach(notFilteredElement => {
        notFilteredElement.style.borderTopLeftRadius = "0px";
        notFilteredElement.style.borderTopRightRadius = "0px";
    });

    notFilteredElements[0].style.borderTopLeftRadius = "8px";
    notFilteredElements[0].style.borderTopRightRadius = "8px";
}
