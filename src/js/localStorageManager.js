/* Get the localStorage information  */
export function retrieveFromStorage(key, defaultValue) {
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

/* Set a value to localStorage */
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}


