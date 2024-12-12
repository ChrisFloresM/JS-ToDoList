import {retrieveFromStorage, saveToLocalStorage} from "./localStorageManager.js";

/* Getting the buttons elements */
const changeThemeButton = document.querySelector(".header__button");
const themedElements = document.querySelectorAll('.change-theme');
const buttonIcon = document.querySelector(".header__button-icon");

const buttonIconSrc = new Map();
buttonIconSrc.set("light", "assets/icon-moon.svg");
buttonIconSrc.set("dark", "assets/icon-sun.svg");

/* Theme to be used as default for any user who opens the app for the first time */
let defaultThemeObj = retrieveFromStorage("theme", {userTheme: "light"});
let defaultTheme = defaultThemeObj.userTheme;
setTheme();

window.onload = function() {
    const elements = document.querySelectorAll('.change-theme.preload');
    elements.forEach(element => {
        element.classList.remove("preload");
    });
}

/* Event listener to the button */
changeThemeButton.addEventListener("click", () => {
    defaultTheme = defaultTheme === 'light' ? 'dark' : 'light';
    setTheme();
});

function setTheme() {
    const removeTheme = defaultTheme === 'light' ? 'dark' : 'light';

    themedElements.forEach(element => {
        element.classList.add(defaultTheme);
        element.classList.remove(removeTheme);
    });

    buttonIcon.src = buttonIconSrc.get(defaultTheme);

    defaultThemeObj.userTheme = defaultTheme;
    saveToLocalStorage("theme", JSON.stringify(defaultThemeObj));
}

export function getCurrentTheme() {
    return defaultTheme;
}