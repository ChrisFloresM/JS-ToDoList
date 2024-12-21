import { fixRoundedElements } from "./filterButtons.js";
import { saveNewTasksOrder } from "./taskFunctionality.js";

export function addDragAndDropHandlers(element) {
    element.addEventListener("mousedown", startDrag);
    element.addEventListener("touchstart", startDrag, { passive: false });
}

let isDragging = false;
let draggable;
let placeholder;
let offsetX = 0, offsetY = 0;
let touchTimeout;

function startDrag(ev) {
    if (ev.type === "touchstart") {
        touchTimeout = setTimeout(() => {
            startDragActions(ev);
        }, 1000);
    } else {
        startDragActions(ev);
    }
}

function startDragActions(ev) {
    ev.preventDefault();

    isDragging = true;
    draggable = ev.currentTarget;
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
    if (!draggable) return;

    if (ev.type === "touchend") {
        clearTimeout(touchTimeout);
    }
    stopDragActions();
}

function stopDragActions() {
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

    fixRoundedElements();
    saveNewTasksOrder();
}
