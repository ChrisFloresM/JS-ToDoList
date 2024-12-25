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
let startDragging = false;

function startDrag(ev) {
    isDragging = true;
    draggable = ev.currentTarget;

    if (ev.type === "touchstart") {
        startDragging = false;
        touchTimeout = setTimeout(() => {
            startDragging = true;
            startDragActions(ev);
        }, 200);
    } else {
        startDragActions(ev);
    }
}

function startDragActions(ev) {
    ev.preventDefault();

    draggable.classList.add('dragging');
    draggable.style.cursor = 'grabbing';

    let touch = ev.touches ? ev.touches[0] : ev;
    offsetX = touch.clientX - draggable.getBoundingClientRect().left;
    offsetY = touch.clientY - draggable.getBoundingClientRect().top - window.scrollY;

    placeholder = document.createElement('li');
    placeholder.classList.add('placeholder', 'task-container');
    placeholder.style.height = `${draggable.offsetHeight}px`;
    draggable.parentNode.insertBefore(placeholder, draggable);

    let currentWidth = draggable.getBoundingClientRect().width;
    draggable.style.position = 'absolute';
    draggable.style.width = String(currentWidth) + "px";
    moveAt(touch.clientX, touch.clientY);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', stopDrag);
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
    if (ev.type === "touchend") {
        clearTimeout(touchTimeout);
        if(!startDragging) return;
    }
    stopDragActions();
}

function stopDragActions() {
    if (!draggable) return;

    isDragging = false;
    draggable.style.pointerEvents = 'auto';

    placeholder.parentNode.insertBefore(draggable, placeholder);
    draggable.classList.remove('dragging');
    draggable.style.cursor = 'pointer';
    draggable.style.position = '';
    draggable.style.top = '';
    draggable.style.left = '';

    placeholder.remove();
    placeholder = null;
    draggable = null;

    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', stopDrag);

    saveNewTasksOrder();
}
