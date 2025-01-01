import { saveNewTasksOrder } from "./taskFunctionality.js";

export function addDragAndDropHandlers(element) {
    element.addEventListener("mousedown", startDrag);
    element.addEventListener("touchstart", startDrag);
}

let isDragging = false;
let draggable;
let placeholder;
let offsetX = 0, offsetY = 0;
let touchTimeout;

function startDrag(ev) {
    isDragging = true;
    draggable = ev.currentTarget;
    // Check only for valid elements to prevent blocking other events
    if (ev.target.tagName === 'SPAN' || ev.target.tagName ===  'BUTTON' || ev.target.tagName === 'ION-ICON') return;

    if (ev.type === "touchstart") {
        /* TODO: Debug code*/
/*        createDebugLiElement("on touch start");*/
        touchTimeout = setTimeout(() => {
            startDragActions(ev);
        }, 200);
        document.addEventListener('touchend', stopDrag, {passive: false});
    } else {
        /* TODO: Debug code*/
/*        createDebugLiElement("on mouse down");*/
        startDragActions(ev);
    }
}

function startDragActions(ev) {
    if (!draggable) {
/*        createDebugLiElement("draggable is null by this point on event " + ev.type);*/
        return;
    }
    /* debug code */
    ev.preventDefault();
    /*TODO: Debug code*/
/*    createDebugLiElement("start action by; " + ev.type);*/

    draggable.classList.add('dragging');
    draggable.style.cursor = 'grabbing';

    let touch = ev.touches ? ev.touches[0] : ev;
    offsetX = touch.clientX - draggable.getBoundingClientRect().left;
    offsetY = touch.clientY - draggable.getBoundingClientRect().top - window.scrollY;

    placeholder = document.createElement('li');
    placeholder.classList.add('placeholder', 'task-container'); /* On iOS (touch devices), this is executed, therefore, start drag actions is always executed */
    placeholder.style.height = `${draggable.offsetHeight}px`;
    draggable.parentNode.insertBefore(placeholder, draggable);

    /* TODO: Debug code*/
/*    createDebugLiElement("placeholder created");*/

    let currentWidth = draggable.getBoundingClientRect().width;
    draggable.style.position = 'absolute';
    draggable.style.width = String(currentWidth) + "px";
    moveAt(touch.clientX, touch.clientY);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', stopDrag, {passive: false});
}

function onMove(ev) {

    if (!isDragging) return;
    ev.preventDefault();

    let touch = ev.touches ? ev.touches[0] : ev;
    moveAt(touch.clientX, touch.clientY);

    draggable.style.pointerEvents = 'none';

    const belowElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!belowElement) return;

    const closestItem = belowElement.closest('li:not(.dragging):not(.placeholder)');
    if (closestItem) {
        const rect = closestItem.getBoundingClientRect();
        if (touch.clientY < rect.top + rect.height / 2) {
            closestItem.parentNode.insertBefore(placeholder, closestItem);
        } else {
            closestItem.parentNode.insertBefore(placeholder, closestItem.nextSibling);
        }
    }
}

function moveAt(clientX, clientY) {
    draggable.style.left = `${clientX - offsetX}px`;
    draggable.style.top = `${clientY - offsetY}px`;
}

function stopDrag(ev) {
    if(ev.type === "touchend") {
        clearTimeout(touchTimeout); /* On iOS devices, this seems to not being handled correctly */
    }
    stopDragActions(ev);
}

function stopDragActions(ev) {
    /* If, for some reason, draggable item doesn't exist, do nothing */
    if (!draggable) return;

    /* TODO: Debug code*/
/*    createDebugLiElement(ev.type);*/

    /* Set dragging flag to false and reset pointer events */
    isDragging = false;
    draggable.style.pointerEvents = 'auto';

    /* Add the dragged element before the created placeholder element and remove the corresponding class */
    placeholder.parentNode.insertBefore(draggable, placeholder);
    draggable.classList.remove('dragging');

    /* Remove styles related to positioning for the element */
    draggable.style.cursor = 'pointer';
    draggable.style.position = '';
    draggable.style.top = '';
    draggable.style.left = '';

    /* Delete the placeholder (multiple placeholders for iOs devices) */
    const palceholders = document.querySelectorAll('.placeholder');
    placeholder.forEach(placeholder => {
        placeholder.remove();
    })

    placeholder = null;
    draggable = null;

    /* TODO: Debug code*/
/*    createDebugLiElement("placeholder removed");*/

    /* clear event listeners from the whole document */
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', stopDrag);

    /* Save the new order of the task list in local storage */
    saveNewTasksOrder();
}

/* Debugging code */
const debugEventList = document.querySelector('.event-list');

function createDebugLiElement(eventType) {
    const newTask = document.createElement('li');
    newTask.classList.add('task-container', 'change-theme', 'dark');
    newTask.textContent = eventType;

    debugEventList.appendChild(newTask);
}
/*
* When holding, touchend triggered.
* wihtout holding, toucend not triggered. Mousedown event is triggered before touchstart on iOS devices.
* */