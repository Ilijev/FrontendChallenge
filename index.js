// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector(".switch input");

const darmModeSwitch = () => {
  document.body.classList.toggle("darkmode");
};

darkModeToggle.addEventListener("click", darmModeSwitch);
