const changeThemeButton = document.querySelector(".header__button");
const buttonIcon = document.querySelector(".header__button-icon");

changeThemeButton.addEventListener("click", (e) => {
    const darkElements = document.querySelectorAll('.dark');
    const lightElements = document.querySelectorAll('.light');

    if (darkElements.length > 0) {
        darkElements.forEach((el) => {
            el.classList.remove('dark');
            el.classList.add('light');
            buttonIcon.src = 'assets/icon-moon.svg';
        })
    }

    if (lightElements.length > 0) {
        lightElements.forEach((el) => {
            el.classList.remove('light');
            el.classList.add('dark');
            buttonIcon.src = 'assets/icon-sun.svg';
        })
    }



})