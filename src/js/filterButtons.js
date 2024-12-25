import {retrieveFromStorage, saveToLocalStorage} from "./localStorageManager.js";

const mediaQuery = window.matchMedia('(max-width: 610px)');

const filterButtonAll = mediaQuery.matches ? document.querySelector('.main__filter-button--all.mobile') : document.querySelector('.main__filter-button--all:not(.mobile)');
const filterButtonActive = mediaQuery.matches ? document.querySelector('.main__filter-button--active.mobile') : document.querySelector('.main__filter-button--active:not(.mobile)');
const filterButtonCompleted = mediaQuery.matches ? document.querySelector('.main__filter-button--completed.mobile') : document.querySelector('.main__filter-button--completed:not(.mobile)');

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
            filterButtonAll.classList.remove("active-filter")
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
}

function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

