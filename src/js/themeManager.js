/* Getting the buttons elements */
const changeThemeButton = document.querySelector(".header__button");
const themedElements = document.querySelectorAll('.change-theme');
const buttonIcon = document.querySelector(".header__button-icon");

/* Theme to be used as default for any user who opens the app for the first time */
let defaultThemeObj = retrieveFromStorage("theme", {userTheme: "light"});
let defaultTheme = defaultThemeObj.userTheme;
setTheme();

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

    defaultThemeObj.userTheme = defaultTheme;
    saveToLocalStorage("theme", JSON.stringify(defaultThemeObj));
}

/* Get the localStorage information about the theme */
function retrieveFromStorage(key, defaultValue) {
    let returnObj;
    try {
        const storedData = localStorage.getItem(key);
        returnObj = storedData ? JSON.parse(storedData) : defaultValue;
    } catch (error) {
        console.error("Error during parse of local storage items:", error);
        returnObj = defaultValue;
    }
    return returnObj;
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}